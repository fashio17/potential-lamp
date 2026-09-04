#!/bin/bash
set -e
H="/home/user/potential-lamp/reels/素材/自宅_白い壁"
S="/home/user/potential-lamp/reels/素材/ソウル"
N="/home/user/potential-lamp/reels/素材/ニューヨーク・ボストン"
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
mkdir -p $SP/segR8

KURO="$H/IMG_2519_クローゼット_濃い色.mov"      # 6.3秒。t<3.4 は柄物のブランケットが入るので使わない
SHIRO="$H/IMG_2518_クローゼット_白と水色.mov"   # 3.9秒。全域が使える
ME="$S/IMG_0287_商業施設を歩く_黒シャツ.mov"    # 8.5秒・2160x3840
IRO="$N/IMG_2010_売り場のラック_色もの.mov"     # 1.9秒。人なし・ブランド名なし

# 元素材が短いので、カットごとに元の長さと引き伸ばし率を変える（出力はどれも約2.07秒）
#  $1=元動画 $2=開始 $3=元の長さ $4=crop $5=出力
cutc () { R=$(python3 -c "print(2.07/$3)")
  ffmpeg -y -v error -i "$1" -an \
   -vf "trim=start=$2:duration=$3,setpts=PTS-STARTPTS,crop=$4,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
   -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$5"; }

# 表紙は「黒の壁」に見えるいちばん暗いところ（実測で平均輝度が最小の窓）
cutc "$KURO"  5.50 0.75 "860:1529:100:100"     $SP/segR8/k1.mp4   # 黒の寄り（表紙）
cutc "$KURO"  3.45 0.75 "1080:1920:0:0"        $SP/segR8/k2.mp4   # クローゼットの引き
cutc "$SHIRO" 0.20 1.15 "1080:1920:0:0"        $SP/segR8/k3.mp4   # 白・水色・生成り
cutc "$KURO"  4.35 0.75 "864:1536:150:250"     $SP/segR8/k4.mp4   # 黒
# 本人・黒シャツ。左側に他の方が歩いているので x>=810 だけを切る
cutc "$ME"    5.10 1.28 "1350:2400:810:1000"   $SP/segR8/k5.mp4   # 上半身の寄り
cutc "$IRO"   0.05 0.90 "1080:1920:0:0"        $SP/segR8/k6.mp4   # 色のある売り場
cutc "$IRO"   1.00 0.90 "864:1536:150:250"     $SP/segR8/k7.mp4   # 同・寄り
cutc "$SHIRO" 2.40 1.15 "864:1536:180:300"     $SP/segR8/k8.mp4   # 白と水色の寄り
cutc "$SHIRO" 1.45 0.90 "756:1344:200:400"     $SP/segR8/k9.mp4   # 白と水色
# 締め。右手の店にポスター（登山の人物）と ALPINE の表記が出るので x を 1860 までに収める
cutc "$ME"    7.15 1.28 "1160:2062:700:1500"   $SP/segR8/k10.mp4  # 歩く（締め）

cd $SP/segR8
: > list.txt; for i in $(seq 1 10); do echo "file 'k$i.mp4'" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy $SP/baseR8.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 $SP/baseR8.mp4
