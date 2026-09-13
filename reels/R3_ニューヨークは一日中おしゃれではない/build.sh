#!/bin/bash
set -e
# 2026/9/13 作り直し。旧版は1カット目が「他人の足元」だったため、
# 9/5の決めごと（表紙は遠目でご本人のスタイルが分かる全身）に合わせて差し替えた。
REPO="/home/user/potential-lamp/reels/素材/ニューヨーク・ボストン"
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
mkdir -p $SP/segR3
ME="$REPO/IMG_1403_ルーフトップ_本人_昼の装い.mov"   # プールサイドで立つ。白シャツ＋グレーのワイドパンツ＋スニーカー
FT="$REPO/IMG_1386_歩道_他人の足元_顔なし.mov"       # t=0〜2.6 がスニーカーのはっきり見えるところ
SH="$REPO/IMG_1301_金銀のバレエシューズ陳列.mov"
BX="$REPO/IMG_1436_靴屋の売り場.mov"                 # t>2.5 でSKECHERSの表記。t<2 だけ
IN="$REPO/IMG_1378_店内エスカレーターとマネキン.mov" # 下側に商品カード（モデルの顔）。上部だけ
R=1.6016; L=1.28

# 素材は 2160x3840（9:16）なので、そのまま1080x1920に落ちる。切り取らない＝遠目のまま
cut () { ffmpeg -y -v error -i "$1" -an \
  -vf "trim=start=$2:duration=$L,setpts=PTS-STARTPTS,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$3"; }

NT="$REPO/IMG_2027_夜の店先_横位置.mov"               # 1920x1080の横位置。中央を縦に切る

cut "$ME" 0.30 $SP/segR3/k1.mp4     # 表紙：本人・全身・遠目
cut "$FT" 2.60 $SP/segR3/k2.mp4     # ニューヨークの歩道（車・街）
cut "$FT" 0.15 $SP/segR3/k3.mp4     # 他人の足元。**ここだけスニーカーがはっきり見える**
cut "$BX" 0.30 $SP/segR3/k4.mp4     # 靴屋の売り場（引き）
# 夜の店先。横位置なので中央を縦に切る。少し甘くなるが、夜の画がここにしかない
ffmpeg -y -v error -i "$NT" -an \
  -vf "trim=start=1.20:duration=$L,setpts=PTS-STARTPTS,crop=608:1080:656:0,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p $SP/segR3/k5.mp4
cut "$SH" 0.30 $SP/segR3/k6.mp4     # 金銀の靴
# 店内。下側の商品カードを外して上部だけ
ffmpeg -y -v error -i "$IN" -an \
  -vf "trim=start=0.60:duration=$L,setpts=PTS-STARTPTS,crop=1620:2880:270:0,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p $SP/segR3/k7.mp4
cut "$ME" 4.00 $SP/segR3/k8.mp4     # 本人（締め）

cd $SP/segR3
: > list.txt; for i in $(seq 1 8); do echo "file 'k$i.mp4'" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy $SP/baseR3.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 $SP/baseR3.mp4
