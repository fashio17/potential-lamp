#!/bin/bash
set -e
SRC=/root/.claude/uploads/1a5c0839-14a8-5840-9db3-563ce87c0be0
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
mkdir -p $SP/segR1
CR=$SRC/42ee3d91-IMG_0859.mov   # 横断歩道を渡る（黒ワンピ＋白バッグ）
ST=$SRC/c1a4daf8-IMG_0837.mov   # パリの通りを歩く（黒トップス＋黒パンツ）
CO=$SRC/3fdee139-IMG_0283.mov   # 商業施設の廊下（黒シャツ＋グレーパンツ）
DM=$SRC/2696df7f-IMG_0841.mov   # ドーム（上部だけ）
SF=$SRC/94a05b32-IMG_1081.mov   # 店先（看板を外す）
R=1.6016; L=1.28

full () { ffmpeg -y -v error -i "$1" -an \
  -vf "trim=start=$2:duration=$L,setpts=PTS-STARTPTS,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$3"; }
# 中央テロップが顔にかからないよう、切り出しを下げて被写体を上に寄せる
low () { ffmpeg -y -v error -i "$1" -an \
  -vf "trim=start=$2:duration=$L,setpts=PTS-STARTPTS,crop=1215:2160:472:$3,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$4"; }
dome () { ffmpeg -y -v error -i "$DM" -an \
  -vf "trim=start=$1:duration=$L,setpts=PTS-STARTPTS,crop=844:1500:1316:0,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$2"; }
shop () { ffmpeg -y -v error -i "$SF" -an \
  -vf "trim=start=$1:duration=$L,setpts=PTS-STARTPTS,crop=1080:1920:640:1400,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$2"; }
bag () { ffmpeg -y -v error -i "$ST" -an \
  -vf "trim=start=$1:duration=$L,setpts=PTS-STARTPTS,crop=675:1200:690:1900,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$2"; }

low  $CR 2.80 1400 $SP/segR1/k1.mp4    # 横断歩道（表紙）
dome     4.30      $SP/segR1/k2.mp4    # ドーム
full $ST 0.30      $SP/segR1/k3.mp4    # パリの通り
shop     0.30      $SP/segR1/k4.mp4    # 店先
full $CO 1.00      $SP/segR1/k5.mp4    # 廊下（別の装い）
dome     5.65      $SP/segR1/k6.mp4    # ドーム
bag      7.10      $SP/segR1/k7.mp4    # 白いバッグの寄り
full $CO 3.00      $SP/segR1/k8.mp4    # 廊下
low  $CR 4.15 1400 $SP/segR1/k9.mp4    # 横断歩道（締め）

cd $SP/segR1
: > list.txt; for i in $(seq 1 9); do echo "file 'k$i.mp4'" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy $SP/baseR1.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 $SP/baseR1.mp4
