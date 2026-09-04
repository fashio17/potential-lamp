#!/bin/bash
set -e
REPO="/home/user/potential-lamp/reels/素材/ニューヨーク・ボストン"
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
mkdir -p $SP/segR3
ME="$REPO/IMG_1403_ルーフトップ_本人_昼の装い.mov"
FT="$REPO/IMG_1386_歩道_他人の足元_顔なし.mov"
SH="$REPO/IMG_1301_金銀のバレエシューズ陳列.mov"
BX="$REPO/IMG_1436_靴屋の売り場.mov"      # t<2 まで。以降はブランド表記が入る
IN="$REPO/IMG_1378_店内エスカレーターとマネキン.mov"
R=1.6016; L=1.28

cut () { ffmpeg -y -v error -i "$1" -an \
  -vf "trim=start=$2:duration=$L,setpts=PTS-STARTPTS,scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$3"; }

# 本人のカットは、中央のテロップが顔にかからないよう下側を切る
mecut () { ffmpeg -y -v error -i "$ME" -an \
  -vf "trim=start=$1:duration=$L,setpts=PTS-STARTPTS,crop=1215:2160:300:$2,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$3"; }

# 1カット目は足元。最初の1秒で「服の話」だと分かるようにする
cut "$FT" 0.30 $SP/segR3/k1.mp4     # 他人の足元・スニーカー（表紙）
cut "$FT" 1.70 $SP/segR3/k2.mp4     # 他人の足元
mecut 0.30 1500 $SP/segR3/k3.mp4    # 本人・昼の装い
cut "$SH" 0.30 $SP/segR3/k4.mp4     # 金銀の靴
cut "$SH" 3.60 $SP/segR3/k5.mp4     # 金銀の靴・寄り
cut "$BX" 0.30 $SP/segR3/k6.mp4     # 靴屋の売り場
cut "$IN" 0.60 $SP/segR3/k7.mp4     # 店内
# 店内。下側に商品カード（モデルの顔）が入るので上部だけを使う
ffmpeg -y -v error -i "$IN" -an \
  -vf "trim=start=5.40:duration=$L,setpts=PTS-STARTPTS,crop=1620:2880:270:0,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p $SP/segR3/k8.mp4
mecut 4.00 1500 $SP/segR3/k9.mp4    # 本人
mecut 6.30 1700 $SP/segR3/k10.mp4   # 本人（締め）

cd $SP/segR3
: > list.txt; for i in $(seq 1 10); do echo "file 'k$i.mp4'" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy $SP/baseR3.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 $SP/baseR3.mp4
