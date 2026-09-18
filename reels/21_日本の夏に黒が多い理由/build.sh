#!/bin/bash
set -e
SRC=/root/.claude/uploads/1a5c0839-14a8-5840-9db3-563ce87c0be0
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
mkdir -p $SP/segCU
W=$SRC/61c1483f-IMG_2494.mov     # 白ワンピース・全身
B=$SRC/646ebeeb-IMG_2495.mov     # 黒シャツ＋白ロングスカート
F=$SRC/ace93257-IMG_2496.mov     # 足元

mvx () { ffmpeg -y -v error -i "$1" -an \
  -vf "trim=start=$2:duration=$3,setpts=PTS-STARTPTS,scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setpts=$4*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$5"; }

R=1.6016; L=1.28
mvx $B  0.30 $L $R $SP/segCU/k1.mp4    # 黒・全身（表紙）
mvx $B  1.90 $L $R $SP/segCU/k2.mp4    # 黒
mvx $B  3.20 $L $R $SP/segCU/k3.mp4    # 黒
mvx $B  7.30 $L $R $SP/segCU/k4.mp4    # 黒・後ろ姿
mvx $W  3.40 $L $R $SP/segCU/k5.mp4    # 白・全身（向こう側）
mvx $B  4.60 $L $R $SP/segCU/k6.mp4    # 黒
mvx $B  5.90 $L $R $SP/segCU/k7.mp4    # 黒
mvx $B  9.60 $L $R $SP/segCU/k8.mp4    # 黒
mvx $F  0.60 $L $R $SP/segCU/k9.mp4    # 足元
mvx $W  8.52 $L $R $SP/segCU/k10.mp4   # 白（韓国の話へ）
mvx $W  9.80 $L $R $SP/segCU/k11.mp4   # 白
mvx $W  1.58 $L $R $SP/segCU/k12.mp4   # 白・寄り（締め）

cd $SP/segCU
: > list.txt; for i in $(seq 1 12); do echo "file 'k$i.mp4'" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy $SP/baseCU.mp4
T=0; for i in $(seq 1 12); do
  Dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $SP/segCU/k$i.mp4)
  NX=$(python3 -c "print(round($T+$Dur,2))"); printf "k%-3s %6.2f - %6.2f\n" $i $T $NX; T=$NX; done
echo "=== 合計 ==="; ffprobe -v error -show_entries format=duration -of csv=p=0 $SP/baseCU.mp4
