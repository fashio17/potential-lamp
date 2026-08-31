#!/bin/bash
set -e
SRC=/root/.claude/uploads/1a5c0839-14a8-5840-9db3-563ce87c0be0
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
mkdir -p $SP/segR1
CR=$SRC/42ee3d91-IMG_0859.mov   # 横断歩道を渡る（黒ワンピ＋白バッグ）
ST=$SRC/c1a4daf8-IMG_0837.mov   # パリの通りを歩く
DM=$SRC/2696df7f-IMG_0841.mov   # ドーム（上部だけ）
RK=$SRC/c1a18c04-image.jpg      # パリの店のラック（人なし）4284×5712
SH=$SRC/693b589d-IMG_7154.mov   # 街の店先・マネキンと服（顔の識別できる人なし）
PS=$SRC/911a086e-IMG_0944.mov   # パリの通り・国旗と花（t=0.6〜1.9が安全）
R=1.6016; L=1.28

full () { ffmpeg -y -v error -i "$1" -an \
  -vf "trim=start=$2:duration=$L,setpts=PTS-STARTPTS,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$3"; }
low () { ffmpeg -y -v error -i "$1" -an \
  -vf "trim=start=$2:duration=$L,setpts=PTS-STARTPTS,crop=1215:2160:472:$3,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$4"; }
dome () { ffmpeg -y -v error -i "$DM" -an \
  -vf "trim=start=$1:duration=$L,setpts=PTS-STARTPTS,crop=844:1500:1316:0,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$2"; }
bag () { ffmpeg -y -v error -i "$ST" -an \
  -vf "trim=start=$1:duration=$L,setpts=PTS-STARTPTS,crop=675:1200:690:1900,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$2"; }
# ラックの写真から1カット（ゆっくり寄る／引く）
rack () { NN=$(python3 -c "print(int(2.07*30))")
  ffmpeg -y -v error -loop 1 -t 2.07 -i "$RK" \
   -vf "crop=$1,scale=1620:2880,fps=30,zoompan=z='$3+($4-$3)*on/$NN':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,setsar=1" \
   -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$2"; }

low  $CR 2.80 1400 $SP/segR1/k1.mp4                       # 横断歩道（表紙）★本人
dome     4.30      $SP/segR1/k2.mp4                       # ドーム
full $SH 1.20      $SP/segR1/k3.mp4                       # 街の店先・マネキン
rack "3213:5712:0:0"      $SP/segR1/k4.mp4  1.00 1.05     # ラック全体
rack "2000:3556:200:1200" $SP/segR1/k5.mp4  1.05 1.00     # ラック寄り
full $PS 0.70      $SP/segR1/k6.mp4                       # パリの通り・国旗と花
bag      7.10      $SP/segR1/k7.mp4                       # 白いバッグの寄り
full $SH 2.60      $SP/segR1/k8.mp4                       # 街の店先
low  $CR 4.15 1400 $SP/segR1/k9.mp4                       # 横断歩道（締め）★本人

cd $SP/segR1
: > list.txt; for i in $(seq 1 9); do echo "file 'k$i.mp4'" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy $SP/baseR1.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 $SP/baseR1.mp4
