#!/bin/bash
set -e
P="/home/user/potential-lamp/reels/素材/パリ"
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
mkdir -p $SP/segR9 $SP/imgR9

# 写真はEXIFの回転がffmpegに効かないので、先にPILで起こしておく（4284×5712になる）
python3 - <<'PY'
from PIL import Image, ImageOps
P="/home/user/potential-lamp/reels/素材/パリ"
D="/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad/imgR9"
src="古物店_年配の女性の装い_顔は要トリミング.jpg"
ImageOps.exif_transpose(Image.open(f"{P}/{src}")).convert("RGB").save(f"{D}/kobutsu.jpg", quality=95)
PY

A=$SP/imgR9/kobutsu.jpg   # 古物店。**y<2000 に二人の顔が写るので、必ず y>=2000 で切る**

# 写真から1カット（2.07秒）。ゆっくり寄る／引く
#  $1=画像 $2=crop $3=出力 $4=開始ズーム $5=終了ズーム
pkc () { NN=$(python3 -c "print(int(2.07*30))")
  ffmpeg -y -v error -loop 1 -t 2.07 -i "$1" \
   -vf "crop=$2,scale=1620:2880,fps=30,zoompan=z='$4+($5-$4)*on/$NN':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,setsar=1" \
   -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$3"; }

# 動画から1カット（1.28秒を1.6016倍に伸ばして2.07秒）
cut () { ffmpeg -y -v error -i "$1" -an \
  -vf "trim=start=$2:duration=1.28,setpts=PTS-STARTPTS,crop=$3,scale=1080:1920,setpts=1.6016*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$4"; }

pkc $A "1000:1778:1000:3900" $SP/segR9/k1.mp4  1.00 1.07   # 赤いパンプスの寄り（表紙）
# 店内。**y=2000 付近にブランドの下げ札（GIVENCHY）が写るので y>=2600 で切る**
pkc $A "700:1244:150:2600"   $SP/segR9/k2.mp4  1.07 1.00   # 古物店の店内・紫のコート
# **y=2000 だとあごが入る。2180 まで下げること**
pkc $A "1250:2222:1150:2180" $SP/segR9/k3.mp4  1.00 1.06   # ヒョウ柄のスカーフとオリーブの上着
pkc $A "1150:2044:1150:3100" $SP/segR9/k4.mp4  1.06 1.00   # 花柄のスカート
pkc $A "1550:2755:900:2400"  $SP/segR9/k5.mp4  1.00 1.05   # 首から下の全身
cut "$P/IMG_0931_ショーウィンドウ_赤いドレス.mov" 0.35 "1080:1920:0:0" $SP/segR9/k6.mp4
pkc $A "1200:2133:950:3700"  $SP/segR9/k7.mp4  1.05 1.00   # 赤いパンプスの引き
# IMG_0874（百貨店の吹き抜け）は、どの秒を切ってもぶれているか天井だけなので使わない
pkc $A "900:1600:2050:2350"  $SP/segR9/k8.mp4  1.00 1.06   # 店の布地とヒョウ柄の裾
# IMG_0931 の t=2.6 付近はガラスに人影が映るので使わない
pkc $A "620:1102:2120:2900" $SP/segR9/k9.mp4  1.06 1.00   # かごと布地に伸びる手
pkc $A "1400:2489:2450:2200" $SP/segR9/k10.mp4 1.05 1.00   # 本人・古物店（締め）

cd $SP/segR9
: > list.txt; for i in $(seq 1 10); do echo "file 'k$i.mp4'" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy $SP/baseR9.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 $SP/baseR9.mp4
