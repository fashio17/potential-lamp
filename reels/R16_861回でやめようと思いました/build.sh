#!/bin/bash
set -e
# R16「1本目が861回で、もうやめようと思いました」 2026/9/15
# 主題：自分の失敗を出す回。861回→24,990回。
# 【素材について】ここで使う IMG_2519 / IMG_2518 / IMG_2010 / IMG_0287 は
#   素材台帳で「R8で使用」となっていますが、**R8は2026/9/8に保留になり投稿していません。**
#   公開済みのリールには一度も出ていないので、使い回しにはあたりません。
# 【画の配分】海外6カット／クローゼット2カット。
#   R8が保留になった理由（「クローゼットばかりで海外の風景がない」9/8のご指摘）を踏まえています。
P="/home/user/potential-lamp/reels/素材/パリ"
S="/home/user/potential-lamp/reels/素材/ソウル"
N="/home/user/potential-lamp/reels/素材/ニューヨーク・ボストン"
H="/home/user/potential-lamp/reels/素材/自宅_白い壁"
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
mkdir -p $SP/segR16 $SP/imgR16

ME="$S/IMG_0287_商業施設を歩く_黒シャツ.mov"   # 8.5秒・2160x3840
VS="$P/IMG_1079_ヴェルサイユ鉢植え.mov"        # 6.5秒・回転-90なので実質2160x3840
SN="$P/IMG_7072_セーヌ川の夕景_短い.mov"       # 1.23秒しかない → 静止画にしてズーム
IR="$N/IMG_2010_売り場のラック_色もの.mov"     # 1.9秒・1080x1920
KU="$H/IMG_2519_クローゼット_濃い色.mov"       # 6.3秒。t<3.4 は柄物のブランケットが入る
SR="$H/IMG_2518_クローゼット_白と水色.mov"     # 3.9秒。全域使える

# 動画から1カット（出力はどれも約2.07秒）
#  $1=元動画 $2=開始 $3=元の長さ $4=crop $5=出力
cutc () { R=$(python3 -c "print(2.07/$3)")
  ffmpeg -y -v error -i "$1" -an \
   -vf "trim=start=$2:duration=$3,setpts=PTS-STARTPTS,crop=$4,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
   -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$5"; }

# 1コマ抜いてゆっくり寄る（素材が短いとき用）
#  $1=元動画 $2=抜く秒 $3=crop $4=出力
still () { ffmpeg -y -v error -ss "$2" -i "$1" -vframes 1 $SP/imgR16/t.png
  NN=$(python3 -c "print(int(2.07*30))")
  ffmpeg -y -v error -loop 1 -t 2.07 -i $SP/imgR16/t.png \
   -vf "crop=$3,scale=1620:2880,fps=30,zoompan=z='1.00+0.05*on/$NN':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,setsar=1" \
   -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$4"; }

# 1 表紙：ソウルの商業施設。遠目の全身。t=8.30 はご本人の体が右手の店の
#   ポスター（登山の人物）と ALPINE の表記をちょうど隠してくれる位置。
still "$ME" 8.30 "2160:3840:0:0"              $SP/segR16/k1.mp4
# 2 ヴェルサイユ。本人・全身。人は写っていない。
#   上を765px落として寄せると、顔が中央のテロップ帯より上に来る（全画面だと顔に文字がかかる）
cutc  "$VS" 1.60 1.28 "1730:3075:430:765"     $SP/segR16/k2.mp4
# 3 ヴェルサイユの引き。宮殿と庭だけ。人なし
cutc  "$VS" 5.00 1.28 "2160:3840:0:0"         $SP/segR16/k3.mp4
# 4 セーヌ川の夕景。1.23秒しかないので1コマ抜いて寄る
still "$SN" 0.50 "2160:3840:0:0"              $SP/segR16/k4.mp4
# 5 ニューヨークの売り場。色のあるラック。人なし・読める文字なし
cutc  "$IR" 0.05 0.90 "1080:1920:0:0"         $SP/segR16/k5.mp4
# 6 クローゼット・濃い色（「しまい込みました」に対応）
cutc  "$KU" 4.35 0.75 "1080:1920:0:0"         $SP/segR16/k6.mp4
# 7 クローゼット・白と水色
cutc  "$SR" 0.40 1.15 "1080:1920:0:0"         $SP/segR16/k7.mp4
# 8 締め。ソウル。左側に他の方が歩いているので x>=810 だけを切る
cutc  "$ME" 5.10 1.28 "1350:2400:810:1000"    $SP/segR16/k8.mp4

cd $SP/segR16
: > list.txt; for i in $(seq 1 8); do echo "file 'k$i.mp4'" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy $SP/baseR16.mp4
echo -n "base の長さ "; ffprobe -v error -show_entries format=duration -of csv=p=0 $SP/baseR16.mp4
