#!/bin/bash
set -e
REPO=/home/user/potential-lamp/reels/素材/ソウル
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
mkdir -p $SP/segR2 $SP/img2
# JPEGはEXIFの回転をffmpegが見ないので、先にPILで正位置に直す（4284×5712）
python3 - <<'PY'
from PIL import Image, ImageOps
R='/home/user/potential-lamp/reels/素材/ソウル'
D='/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad/img2'
for src,out in [('売り場のラック_やわらかい色.jpg','A.jpg'),('店の前に立つ_看板あり.jpg','B.jpg')]:
    ImageOps.exif_transpose(Image.open(f'{R}/{src}')).convert('RGB').save(f'{D}/{out}',quality=95)
PY
A=$SP/img2/A.jpg   # ソウルの売り場のラック（やわらかい色）
B=$SP/img2/B.jpg   # 本人・店の前（看板は切り落とす）

pkc () { NN=$(python3 -c "print(int(2.07*30))")
  ffmpeg -y -v error -loop 1 -t 2.07 -i "$1" \
   -vf "crop=$2,scale=1620:2880,fps=30,zoompan=z='$4+($5-$4)*on/$NN':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,setsar=1" \
   -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$3"; }

pkc $A "1800:3200:2300:600"  $SP/segR2/k1.mp4  1.00 1.06   # 白と水色のシャツ（表紙）
pkc $A "1600:2844:2900:400"  $SP/segR2/k2.mp4  1.06 1.00   # 水色のシャツ寄り
pkc $A "1800:3200:2100:800"  $SP/segR2/k3.mp4  1.00 1.06   # 白いシャツとこげ茶
pkc $A "1700:3022:1400:1000" $SP/segR2/k4.mp4  1.06 1.00   # こげ茶のスカート
pkc $A "1500:2667:2784:150"  $SP/segR2/k5.mp4  1.00 1.07   # 水色・白・デニム
pkc $A "2410:4284:0:1428"    $SP/segR2/k6.mp4  1.00 1.05   # かごバッグとこげ茶（引き）
pkc $A "1500:2667:250:1100"  $SP/segR2/k7.mp4  1.07 1.00   # かごバッグ寄り
pkc $B "1900:3378:2100:2200" $SP/segR2/k8.mp4  1.00 1.05   # 本人（引き）
pkc $B "1600:2844:2186:2560" $SP/segR2/k9.mp4  1.00 1.05   # 本人
pkc $B "1300:2311:2350:2700" $SP/segR2/k10.mp4 1.05 1.00   # 本人（締め）

cd $SP/segR2
: > list.txt; for i in $(seq 1 10); do echo "file 'k$i.mp4'" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy $SP/baseR2.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 $SP/baseR2.mp4
