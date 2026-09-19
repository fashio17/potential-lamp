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

# 【2026/9/19 組み直し】ご指摘「服だけの切り替えで風景も何もない。もう少しメリハリを」
#   場所を入れ替えるだけでは変化が足りなかったので、**画の大きさ**を振るようにした。
#   引き（遠く小さく）→ 中 → 寄り（小物）を交互に置いている。
#   ※本当は服やラックのBロールが要る。いただいた完成リールの中にある雑誌と街の画が
#     ちょうど合うが、テロップが焼かれていて使えない。**元の動画をいただければ差し替える。**

# 1 表紙：全身・遠目。顔が見える位置
cutc "$TATE"  2.00 1.28 "1080:1920:0:0"  $SP/segR19/k1.mp4
# 2 いちばん引き。並木の奥に小さく立っている
cutc "$NAMI" 16.60 1.28 "1080:1920:0:0"  $SP/segR19/k2.mp4
# 3 全身・建物の前
#   （はじめ手とバッグの寄りを入れたが、ブレていて「何を見せたいか」が出なかった。
#     ここは本当は「服がたくさん並んでいる画」が要る。Bロール待ち）
cutc "$TATE"  6.00 1.28 "1080:1920:0:0"  $SP/segR19/k3.mp4
# 4 全身・並木
cutc "$NAMI"  9.00 1.28 "1080:1920:0:0"  $SP/segR19/k4.mp4
# 5 寄り：緑のポシェット。**この1枚だけを寄りにして、リズムの山にしている**
cutc "$TATE" 17.90 1.28 "1080:1920:0:0"  $SP/segR19/k5.mp4
# 6 全身・並木（別の位置）
cutc "$NAMI" 12.60 1.28 "1080:1920:0:0"  $SP/segR19/k6.mp4
# 7 中景・歩いて近づく
cutc "$TATE" 13.60 1.28 "1080:1920:0:0"  $SP/segR19/k7.mp4
# 8 締め：近づいて止まる
cutc "$NAMI" 19.80 1.28 "1080:1920:0:0"  $SP/segR19/k8.mp4

cd $SP/segR19
: > list.txt; for i in $(seq 1 8); do echo "file 'k$i.mp4'" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy $SP/baseR19.mp4
echo -n "base の長さ "; ffprobe -v error -show_entries format=duration -of csv=p=0 $SP/baseR19.mp4
