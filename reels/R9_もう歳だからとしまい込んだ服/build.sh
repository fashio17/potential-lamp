#!/bin/bash
set -e
P="/home/user/potential-lamp/reels/素材/パリ"
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
mkdir -p $SP/segR9 $SP/imgR9

# 写真はEXIFの回転がffmpegに効かないので、先にPILで起こす（4284×5712になる）
python3 - <<'PY'
from PIL import Image, ImageOps
P="/home/user/potential-lamp/reels/素材/パリ"
D="/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad/imgR9"
for src,out in (("古物店_年配の女性の装い_顔は要トリミング.jpg","kobutsu.jpg"),("地下鉄の車内_本人_花柄ワンピ.jpg","metro.jpg")):
    ImageOps.exif_transpose(Image.open(f"{P}/{src}")).convert("RGB").save(f"{D}/{out}", quality=95)
PY

A=$SP/imgR9/kobutsu.jpg
B=$SP/imgR9/metro.jpg   # 古物店。**顔を出してよい**ことになったので全体が使える（2026/9/4 ご本人の指示）
# 動画はいずれも回転メタデータ付き。デコード後は 2160×3840 なので crop は縦位置で書く
DM="$P/IMG_0842_ドームの下_上半身.mov"
ST="$P/IMG_0858_大通りを歩く_オスマン様式の街並み.mov"
WD="$P/IMG_0931_ショーウィンドウ_赤いドレス.mov"

# 写真から1カット（2.07秒）
#  $1=画像 $2=crop $3=出力 $4=開始ズーム $5=終了ズーム
pkc () { NN=$(python3 -c "print(int(2.07*30))")
  ffmpeg -y -v error -loop 1 -t 2.07 -i "$1" \
   -vf "crop=$2,scale=1620:2880,fps=30,zoompan=z='$4+($5-$4)*on/$NN':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,setsar=1" \
   -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$3"; }

# 動画から1カット（1.28秒を1.6016倍に伸ばして2.07秒）
cut () { ffmpeg -y -v error -i "$1" -an \
  -vf "trim=start=$2:duration=1.28,setpts=PTS-STARTPTS,crop=$3,scale=1080:1920,setpts=1.6016*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$4"; }

pkc $A "3200:5689:550:20"    $SP/segR9/k1.mp4  1.00 1.05   # 二人の全身（表紙）
pkc $A "1100:1955:1250:900"  $SP/segR9/k2.mp4  1.00 1.05   # 女性の上半身・ヒョウ柄のスカーフ
pkc $A "1150:2044:1180:3450" $SP/segR9/k3.mp4  1.05 1.00   # 花柄のスカートと赤いパンプス
pkc $A "2587:4600:460:1000"  $SP/segR9/k4.mp4  1.00 1.04   # 女性の全身
pkc $B "2400:4267:900:1000"  $SP/segR9/k5.mp4  1.00 1.05   # 地下鉄・本人（顔がテロップ帯に入らない位置）
# ショーウィンドウ。カメラが速く流れて 1.28 秒のあいだにドレスが画面から外れるので、
# t=1.10 の1コマを抜き出して静止画として使う
ffmpeg -y -v error -ss 1.10 -i "$WD" -vframes 1 $SP/imgR9/dress.png
pkc $SP/imgR9/dress.png "1200:2133:500:1400" $SP/segR9/k6.mp4 1.00 1.05
# 本人。テロップ帯が顔にかからないよう、切り出しを下げて上に寄せる
cut "$ST" 1.90 "1620:2880:270:700"  $SP/segR9/k7.mp4        # 大通りを歩く
# 古物店の右側。**左側は y=1000〜2200 にブランドの下げ札と帽子箱の表記が出る**ので使わない
pkc $A "850:1511:3400:600"   $SP/segR9/k8.mp4  1.05 1.00   # 店内・額縁
cut "$DM" 2.80 "1620:2880:270:800"  $SP/segR9/k9.mp4        # ドームの下
pkc $A "2200:3911:1400:900"  $SP/segR9/k10.mp4 1.04 1.00   # 二人の上半身（締め）

cd $SP/segR9
: > list.txt; for i in $(seq 1 10); do echo "file 'k$i.mp4'" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy $SP/baseR9.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 $SP/baseR9.mp4
