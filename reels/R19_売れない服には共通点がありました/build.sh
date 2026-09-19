#!/bin/bash
set -e
# R19「売れない服には、共通点がありました」 2026/9/19
# 【この回のねらい】客層の入れ替え。
#   これまでのリールは「服に悩む人」を呼んでいて、講座を買う人ではなかった（9/17の発見）。
#   この回は **ファッション起業したい人・している人** に向けて作っている。
#   題材は商社時代の話。**リールで一度も使っていない、いちばん強い材料。**
J="/home/user/potential-lamp/reels/素材/日本_屋外"
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
mkdir -p $SP/segR19

TATE="$J/IMG_3007_建物の前に立つ_黒Tグレーパンツ.mov"   # 19.9秒・1080x1920。白い建物・ベンチ・コンクリート
NAMI="$J/IMG_3006_並木の道を歩く_黒Tグレーパンツ.mov"   # 21.6秒・1080x1920。並木・緑・逆光ぎみ

# $1=元動画 $2=開始 $3=長さ $4=crop $5=出力（出力はどれも約2.07秒）
cutc () { R=$(python3 -c "print(2.07/$3)")
  ffmpeg -y -v error -i "$1" -an \
   -vf "trim=start=$2:duration=$3,setpts=PTS-STARTPTS,crop=$4,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
   -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$5"; }

# 2つの場所を1カットおきに入れ替えて、同じ服でも画が変わって見えるようにしている
# 1 表紙：建物の前・全身・遠目
cutc "$TATE"  2.00 1.28 "1080:1920:0:0"  $SP/segR19/k1.mp4
# 2 並木の下・全身
cutc "$NAMI"  5.00 1.28 "1080:1920:0:0"  $SP/segR19/k2.mp4
# 3 建物の前・歩く
cutc "$TATE"  7.00 1.28 "1080:1920:0:0"  $SP/segR19/k3.mp4
# 4 並木・全身
cutc "$NAMI"  9.00 1.28 "1080:1920:0:0"  $SP/segR19/k4.mp4
# 5 建物の前・全身
cutc "$TATE" 11.00 1.28 "1080:1920:0:0"  $SP/segR19/k5.mp4
# 6 並木・全身
cutc "$NAMI" 13.00 1.28 "1080:1920:0:0"  $SP/segR19/k6.mp4
# 7 建物の前・中景。はじめ16.3秒のバッグの寄りを使ったが、近すぎて
#   何の画か分からなかったので差し替えた（9/19に実測）
cutc "$TATE" 13.60 1.28 "1080:1920:0:0"  $SP/segR19/k7.mp4
# 8 締め・並木
cutc "$NAMI" 19.00 1.28 "1080:1920:0:0"  $SP/segR19/k8.mp4

cd $SP/segR19
: > list.txt; for i in $(seq 1 8); do echo "file 'k$i.mp4'" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy $SP/baseR19.mp4
echo -n "base の長さ "; ffprobe -v error -show_entries format=duration -of csv=p=0 $SP/baseR19.mp4
