#!/bin/bash
set -e
SRC=/root/.claude/uploads/1a5c0839-14a8-5840-9db3-563ce87c0be0
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
mkdir -p $SP/segR4
V1=$SRC/4590da3f-IMG_1045.mov    # ヴェルサイユ庭園
V2=$SRC/ffd373d4-IMG_1079.mov    # ヴェルサイユ鉢植え
SF=$SRC/94a05b32-IMG_1081.mov    # パリの店先（看板を外す）
ST=$SRC/c1a4daf8-IMG_0837.mov    # パリの通り
DM=$SRC/2696df7f-IMG_0841.mov    # ドーム（上部だけ）
R=1.6016; L=1.28

full () { ffmpeg -y -v error -i "$1" -an \
  -vf "trim=start=$2:duration=$L,setpts=PTS-STARTPTS,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$3"; }
# 本人が写るカットは、テロップが顔にかからないよう下側を切る
low () { ffmpeg -y -v error -i "$1" -an \
  -vf "trim=start=$2:duration=$L,setpts=PTS-STARTPTS,crop=1215:2160:472:$3,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$4"; }
shop () { ffmpeg -y -v error -i "$SF" -an \
  -vf "trim=start=$1:duration=$L,setpts=PTS-STARTPTS,crop=1080:1920:640:1400,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$2"; }
dome () { ffmpeg -y -v error -i "$DM" -an \
  -vf "trim=start=$1:duration=$L,setpts=PTS-STARTPTS,crop=844:1500:1316:0,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$2"; }

low  $V1 0.40 900  $SP/segR4/k1.mp4    # 宮殿の前（表紙）★本人
shop     0.30      $SP/segR4/k2.mp4    # パリの店先
full $V1 5.50      $SP/segR4/k3.mp4    # 庭のみ
dome     4.30      $SP/segR4/k4.mp4    # ドーム
full $V2 4.45      $SP/segR4/k5.mp4    # 庭のみ
full $ST 6.40      $SP/segR4/k6.mp4    # パリの通り ★本人
full $V1 7.00      $SP/segR4/k7.mp4    # 庭のみ
dome     5.65      $SP/segR4/k8.mp4    # ドーム
low  $V1 2.60 900  $SP/segR4/k9.mp4    # ★本人
low  $V2 1.70 1300 $SP/segR4/k10.mp4   # ★本人（締め）

cd $SP/segR4
: > list.txt; for i in $(seq 1 10); do echo "file 'k$i.mp4'" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy $SP/baseR4.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 $SP/baseR4.mp4
