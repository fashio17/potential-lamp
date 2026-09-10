#!/bin/bash
set -e
N="/home/user/potential-lamp/reels/素材/ニューヨーク・ボストン"
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
mkdir -p $SP/segR10 $SP/imgR10

python3 - <<'PY'
from PIL import Image, ImageOps
N="/home/user/potential-lamp/reels/素材/ニューヨーク・ボストン"
D="/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad/imgR10"
ImageOps.exif_transpose(Image.open(f"{N}/チャイナタウンの街並み_赤いスカート.jpg")).convert("RGB").save(f"{D}/china.jpg",quality=95)
PY

ST="$N/IMG_1729_歩行者天国_街ゆく人の装い.mov"   # 6.9秒。**t<1.5 と t>4.2 は子どもの顔が近い。1.6〜4.1 だけ使う**
QM="$N/IMG_1726_クインシーマーケットの建物.mov"  # 上部に QUINCY MARKET の文字。y>=1300 で切る
CP="$N/IMG_1707_大学のキャンパスを見渡す.mov"
YS="$N/IMG_2027_夜の店先_横位置.mov"             # **1920×1080の横位置。**中央を縦に切る
CH=$SP/imgR10/china.jpg                          # 1285×2320（小さめ）

pkc () { NN=$(python3 -c "print(int(2.07*30))")
  ffmpeg -y -v error -loop 1 -t 2.07 -i "$1" \
   -vf "crop=$2,scale=1620:2880,fps=30,zoompan=z='$4+($5-$4)*on/$NN':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,setsar=1" \
   -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$3"; }
cut () { ffmpeg -y -v error -i "$1" -an \
  -vf "trim=start=$2:duration=1.28,setpts=PTS-STARTPTS,crop=$3,scale=1080:1920,setpts=1.6016*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$4"; }

cut "$ST" 2.40 "2160:3840:0:0"       $SP/segR10/k1.mp4   # 本人が歩いてくる（表紙）
# **y=1300 だと t>4 で QUINCY MARKET の文字が出る。1500 まで下げること**
cut "$QM" 0.60 "1316:2340:420:1500"  $SP/segR10/k2.mp4   # 柱と星条旗
# 右上に LET'S BOUNCE の看板が入るので x<1000 に収める
pkc $CH "1000:1778:0:400"   $SP/segR10/k3.mp4  1.00 1.04 # チャイナタウンの通り（歩く人）
cut "$YS" 0.50 "608:1080:660:0"      $SP/segR10/k4.mp4   # 店先を歩く人
cut "$YS" 2.20 "608:1080:660:0"      $SP/segR10/k5.mp4   # 同・別の場所
cut "$ST" 1.60 "2160:3840:0:0"       $SP/segR10/k6.mp4   # 通りと街ゆく人
cut "$CP" 1.00 "2160:3840:0:0"       $SP/segR10/k7.mp4   # キャンパスと青空
# 空だけのカットを2つ続けると、R9と同じ「じわじわ落ち」になる。人のいる画にする
cut "$YS" 3.90 "608:1080:660:0"      $SP/segR10/k8.mp4   # 店先・別の場所
cut "$QM" 3.50 "1316:2340:420:1500"  $SP/segR10/k9.mp4   # 柱と星条旗・別
# 右上に LET'S BOUNCE の看板が入るので x<1000 に収める
pkc $CH "700:1244:300:1050" $SP/segR10/k10.mp4 1.04 1.00 # チャイナタウン・寄り（締め）

cd $SP/segR10
: > list.txt; for i in $(seq 1 10); do echo "file 'k$i.mp4'" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy $SP/baseR10.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 $SP/baseR10.mp4
