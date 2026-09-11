#!/bin/bash
set -e
B="/home/user/potential-lamp/reels/素材/ボストン"
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
mkdir -p $SP/segR10

# 【2026/9/11 作り直し】前の版はニューヨークの素材（チャイナタウン・IMG_2027）を
# 5カット使いながら「ボストンの通りです」と言っていた。**全部ボストンに入れ替えた。**
ST="$B/IMG_1729_歩行者天国_街ゆく人の装い.mov"   # **t<1.5 と t>4.2 は子どもの顔が近い。1.6〜4.1 だけ**
QM="$B/IMG_1726_クインシーマーケットの建物.mov"  # 上部に QUINCY MARKET の文字。y>=1500 で切る
CP="$B/IMG_1707_大学のキャンパスを見渡す.mov"
CR="$B/IMG_1773_人の後ろ姿_群衆.mov"             # 8.1秒。後ろ姿ばかりで顔が写らない。使いやすい
NB="$B/IMG_1774_ニューベリー通りの店.mov"        # 8.1秒。**t=3.0〜4.5 に ATHLETA の看板**。そこは使わない
XR="$B/IMG_1775_交差点と街並み.mov"              # 3.5秒

cut () { ffmpeg -y -v error -i "$1" -an \
  -vf "trim=start=$2:duration=1.28,setpts=PTS-STARTPTS,crop=$3,scale=1080:1920,setpts=1.6016*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$4"; }

cut "$ST" 2.40 "2160:3840:0:0"       $SP/segR10/k1.mp4   # 本人が歩いてくる（表紙）
cut "$QM" 0.60 "1316:2340:420:1500"  $SP/segR10/k2.mp4   # 柱と星条旗
cut "$CR" 1.00 "2160:3840:0:0"       $SP/segR10/k3.mp4   # 人の後ろ姿
cut "$CR" 4.00 "2160:3840:0:0"       $SP/segR10/k4.mp4   # 人の後ろ姿・別
cut "$CR" 6.50 "2160:3840:0:0"       $SP/segR10/k5.mp4   # 人の後ろ姿・寄り
cut "$ST" 1.60 "2160:3840:0:0"       $SP/segR10/k6.mp4   # 歩行者天国
cut "$NB" 1.00 "2160:3840:0:0"       $SP/segR10/k7.mp4   # ニューベリー通りの店
cut "$CP" 1.00 "2160:3840:0:0"       $SP/segR10/k8.mp4   # キャンパスと青空
cut "$NB" 6.00 "2160:3840:0:0"       $SP/segR10/k9.mp4   # 通りの店・別
cut "$XR" 1.20 "2160:3840:0:0"       $SP/segR10/k10.mp4  # 交差点を渡る人（締め）

cd $SP/segR10
: > list.txt; for i in $(seq 1 10); do echo "file 'k$i.mp4'" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy $SP/baseR10.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 $SP/baseR10.mp4
