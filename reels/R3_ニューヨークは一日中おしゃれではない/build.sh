#!/bin/bash
set -e
SRC=/root/.claude/uploads/1a5c0839-14a8-5840-9db3-563ce87c0be0
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
mkdir -p $SP/segR3
ME=$SRC/75f594b7-IMG_1403.mov   # ルーフトップ・本人・白シャツ＋スニーカー
FT=$SRC/b50a4091-IMG_1386.mov   # 歩道・他人の足元（顔なし）
SH=$SRC/d062e672-IMG_1301.mov   # 金銀のバレエシューズ
BX=$SRC/36f51a62-IMG_1436.mov   # 靴屋の売り場（t<5 まで。以降は看板が入る）
IN=$SRC/4c22e303-IMG_1378.mov   # 店内・エスカレーターとマネキン
R=1.6016; L=1.28

cut () { ffmpeg -y -v error -i "$1" -an \
  -vf "trim=start=$2:duration=$L,setpts=PTS-STARTPTS,scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$3"; }

cut $ME 0.30 $SP/segR3/k1.mp4    # 本人・昼（表紙）
cut $FT 0.30 $SP/segR3/k2.mp4    # 他人の足元
cut $FT 1.70 $SP/segR3/k3.mp4    # 他人の足元
cut $SH 0.30 $SP/segR3/k4.mp4    # 金銀の靴
cut $SH 3.60 $SP/segR3/k5.mp4    # 金銀の靴・寄り
cut $BX 0.30 $SP/segR3/k6.mp4    # 靴屋の売り場
cut $IN 0.60 $SP/segR3/k7.mp4    # 店内
# 店内。下側に商品カード（モデルの顔）が入るので上部だけを使う
ffmpeg -y -v error -i "$IN" -an \
  -vf "trim=start=5.40:duration=$L,setpts=PTS-STARTPTS,crop=1620:2880:270:0,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p $SP/segR3/k8.mp4
cut $ME 4.00 $SP/segR3/k9.mp4    # 本人
cut $ME 6.30 $SP/segR3/k10.mp4   # 本人（締め）

cd $SP/segR3
: > list.txt; for i in $(seq 1 10); do echo "file 'k$i.mp4'" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy $SP/baseR3.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 $SP/baseR3.mp4
