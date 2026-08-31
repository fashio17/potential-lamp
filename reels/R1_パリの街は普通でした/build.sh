#!/bin/bash
set -e
SRC=/root/.claude/uploads/1a5c0839-14a8-5840-9db3-563ce87c0be0
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
mkdir -p $SP/segR1
# どちらも回転メタデータ付きの縦位置。デコード後は 2160×3840
A=$SRC/c1a4daf8-IMG_0837.mov     # パリの通りを歩く（8.5秒）
B=$SRC/2696df7f-IMG_0841.mov     # ギャラリー・ラファイエットのドーム（7.0秒）
P=$SRC/d0273f5f-image.jpg        # パリの通りに立つ（写真 1320×1988）

R=1.6016; L=1.28

# 通り：縦位置なのでそのまま縮めるだけ
st () { ffmpeg -y -v error -i "$A" -an \
  -vf "trim=start=$1:duration=$L,setpts=PTS-STARTPTS,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$2"; }

# ドーム：上部だけ。下の階のブランド看板（MOYNAT・GUERLAIN等）を外す
dm () { ffmpeg -y -v error -i "$B" -an \
  -vf "trim=start=$1:duration=$L,setpts=PTS-STARTPTS,crop=844:1500:1316:0,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$2"; }

# 白いバッグの寄り
bg () { ffmpeg -y -v error -i "$A" -an \
  -vf "trim=start=$1:duration=$L,setpts=PTS-STARTPTS,crop=675:1200:690:1650,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$2"; }

NN=$(python3 -c "print(int(2.07*30))")
ffmpeg -y -v error -loop 1 -t 2.07 -i "$P" \
 -vf "scale=1620:2880:force_original_aspect_ratio=increase,crop=1620:2880,fps=30,zoompan=z='1.00+0.07*on/$NN':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,setsar=1" \
 -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p $SP/segR1/k5.mp4

st 0.30       $SP/segR1/k1.mp4    # 通り（表紙）
dm 4.30       $SP/segR1/k2.mp4    # ドーム（行く前の思い込み）
st 1.70       $SP/segR1/k3.mp4
st 3.00       $SP/segR1/k4.mp4
dm 5.65       $SP/segR1/k6.mp4    # ドーム
bg 7.10       $SP/segR1/k7.mp4    # 白いバッグ＝一点
st 4.30       $SP/segR1/k8.mp4
st 5.60       $SP/segR1/k9.mp4

cd $SP/segR1
: > list.txt; for i in $(seq 1 9); do echo "file 'k$i.mp4'" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy $SP/baseR1.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 $SP/baseR1.mp4
