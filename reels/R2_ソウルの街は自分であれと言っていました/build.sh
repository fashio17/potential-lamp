#!/bin/bash
set -e
P="/home/user/potential-lamp/reels/素材/パリ"
S="/home/user/potential-lamp/reels/素材/ソウル"
N="/home/user/potential-lamp/reels/素材/ニューヨーク・ボストン"
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
mkdir -p $SP/segR2 $SP/imgR2

python3 - <<'PY'
from PIL import Image, ImageOps
S="/home/user/potential-lamp/reels/素材/ソウル"
D="/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad/imgR2"
for src,out in (("売り場のラック_やわらかい色.jpg","rack.jpg"),("店の前に立つ_看板あり.jpg","stand.jpg")):
    ImageOps.exif_transpose(Image.open(f"{S}/{src}")).convert("RGB").save(f"{D}/{out}", quality=95)
PY

R=$SP/imgR2/rack.jpg   # ソウルの売り場。4284×5712。場所ごとに別の被写体が取れる
T=$SP/imgR2/stand.jpg  # ソウルの店の前に立つ。**下部に店の看板**があるので x>2100 に寄せる

pkc () { NN=$(python3 -c "print(int(2.07*30))")
  ffmpeg -y -v error -loop 1 -t 2.07 -i "$1" \
   -vf "crop=$2,scale=1620:2880,fps=30,zoompan=z='$4+($5-$4)*on/$NN':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,setsar=1" \
   -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$3"; }
cut () { ffmpeg -y -v error -i "$1" -an \
  -vf "trim=start=$2:duration=1.28,setpts=PTS-STARTPTS,crop=$3,scale=1080:1920,setpts=1.6016*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$4"; }

# 【2026/9/5 やり直し】寄りすぎて何が映っているか分からない、というご指摘。
# ・表紙は「遠目でスタイルが分かる」ご本人の全身にする（17.8万回の表紙と同じ形）
# ・売り場は、ラック全体が見える引きにする。布のアップにしない
# 店の看板（Shoon）は写真の左下 x<2340 に出るので、x>=2300 で切る
pkc $T "1800:3200:2300:2100" $SP/segR2/k1.mp4 1.00 1.04   # 本人・全身（表紙）
pkc $R "3213:5712:1000:0"    $SP/segR2/k2.mp4 1.00 1.05   # 売り場のラック全体
cut "$P/IMG_7292_店内_他人の顔あり.mov" 0.30 "1620:2880:270:0" $SP/segR2/k3.mp4   # パリの店内・シャンデリア
# SÉZANE の看板は t<1.5 に出る。t=2.2 なら外れる
cut "$P/IMG_1081_店先_看板あり.mov"     2.20 "2160:3840:0:0"  $SP/segR2/k4.mp4   # パリの店先
# 下部に通行人と店の看板が入るので、上（赤煉瓦と非常階段）だけを使う
cut "$N/IMG_2032_街並み_下部に他人の顔あり.mov" 0.30 "540:960:270:0" $SP/segR2/k5.mp4  # ニューヨークの街
pkc $R "2600:4622:400:600"   $SP/segR2/k6.mp4 1.05 1.00   # ラック・かごとこげ茶のパンツ
pkc $R "2600:4622:1650:900"  $SP/segR2/k7.mp4 1.00 1.05   # ラック・白と水色のシャツ
cut "$P/IMG_0839_街の外観_下に歩行者多数.mov" 0.90 "2160:3840:0:0" $SP/segR2/k8.mp4  # パリの百貨店の外観
cut "$P/IMG_7292_店内_他人の顔あり.mov" 2.10 "1620:2880:270:0" $SP/segR2/k9.mp4   # パリの店内（締め）

cd $SP/segR2
: > list.txt; for i in $(seq 1 9); do echo "file 'k$i.mp4'" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy $SP/baseR2.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 $SP/baseR2.mp4
