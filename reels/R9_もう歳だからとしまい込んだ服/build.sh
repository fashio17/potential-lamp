#!/bin/bash
set -e
P="/home/user/potential-lamp/reels/素材/パリ"
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
mkdir -p $SP/segR9 $SP/imgR9

python3 - <<'PY'
from PIL import Image, ImageOps
P="/home/user/potential-lamp/reels/素材/パリ"
D="/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad/imgR9"
src="古物店_年配の女性の装い_顔は要トリミング.jpg"
ImageOps.exif_transpose(Image.open(f"{P}/{src}")).convert("RGB").save(f"{D}/kobutsu.jpg", quality=95)
PY

A=$SP/imgR9/kobutsu.jpg   # 古物店。顔は出してよい（2026/9/4）
# **左側の x<1300・y=1000〜2200 に GIVENCHY の下げ札と帽子箱の店名が出る。そこは使わない**
ST="$P/IMG_0858_大通りを歩く_オスマン様式の街並み.mov"
W1="$P/IMG_0941_ショーウィンドウ_ブランド看板あり.mov"   # CHANEL は t>2 に出る。t=1.0 で左寄りに切る
W2="$P/IMG_0930_店頭_ブランド看板あり.mov"               # KENZO は t>1.5 に出る。t=0.5 で右寄りに切る
WD="$P/IMG_0931_ショーウィンドウ_赤いドレス.mov"
VS="$P/IMG_1045_ヴェルサイユ庭園.mov"
DM="$P/IMG_0842_ドームの下_上半身.mov"

pkc () { NN=$(python3 -c "print(int(2.07*30))")
  ffmpeg -y -v error -loop 1 -t 2.07 -i "$1" \
   -vf "crop=$2,scale=1620:2880,fps=30,zoompan=z='$4+($5-$4)*on/$NN':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,setsar=1" \
   -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$3"; }
cut () { ffmpeg -y -v error -i "$1" -an \
  -vf "trim=start=$2:duration=1.28,setpts=PTS-STARTPTS,crop=$3,scale=1080:1920,setpts=1.6016*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$4"; }

# 表紙はご本人を小さく。パリの大通りの全景に、黒のワンピースで立つ
cut "$ST" 1.90 "2160:3840:0:0"    $SP/segR9/k1.mp4
pkc $A "3200:5689:550:20"    $SP/segR9/k2.mp4  1.00 1.04   # 古物店の二人
pkc $A "2587:4600:460:1000"  $SP/segR9/k3.mp4  1.04 1.00   # 女性の全身
pkc $A "1250:2222:1150:2180" $SP/segR9/k4.mp4  1.00 1.05   # 女性の上半身（y=2000 だとあごが入る）
cut "$W1" 1.00 "1400:2489:150:300" $SP/segR9/k5.mp4        # 紙の花と蝶の飾り
# カメラが速いので、1コマ抜いて静止画として動かす
ffmpeg -y -v error -ss 1.10 -i "$WD" -vframes 1 $SP/imgR9/dress.png
pkc $SP/imgR9/dress.png "1200:2133:500:1400" $SP/segR9/k6.mp4 1.00 1.05  # 赤い刺繍のドレス
# W2 も VS も、1.28秒のあいだにカメラが流れて狙った絵が外れる。1コマ抜いて動かす
ffmpeg -y -v error -ss 0.50 -i "$W2" -vframes 1 $SP/imgR9/flower.png
pkc $SP/imgR9/flower.png "1400:2489:700:400" $SP/segR9/k7.mp4 1.00 1.05  # 大きな花の飾り
ffmpeg -y -v error -ss 4.00 -i "$VS" -vframes 1 $SP/imgR9/versailles.png
pkc $SP/imgR9/versailles.png "2160:3840:0:0" $SP/segR9/k8.mp4 1.00 1.04  # ヴェルサイユ（本人・小さく）
cut "$DM" 2.80 "1620:2880:270:800" $SP/segR9/k9.mp4        # ドームの下
pkc $A "2200:3911:1400:900"  $SP/segR9/k10.mp4 1.04 1.00   # 古物店の二人（締め）

cd $SP/segR9
: > list.txt; for i in $(seq 1 10); do echo "file 'k$i.mp4'" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy $SP/baseR9.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 $SP/baseR9.mp4
