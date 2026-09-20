#!/bin/bash
set -e
# R20「資格があるのに、仕事になりませんでした」 2026/9/21
# 【この回のねらい】R19の続き。同じ起業層に、もう一段近づく。
#   R19「誰に着てほしいかが決まっているかどうか」→ R20「それはあなたの資格の話でもある」
# 【長さ】8枚16.6秒。R19（12枚25.2秒）から戻した。
#   R19の実測で「26秒にしても平均再生時間は11秒のまま、完走率は64%→42%」と分かったため。
M="/home/user/potential-lamp/reels/素材/丸の内"
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
mkdir -p $SP/segR20

KURO="$M/04_通り_全身_黒セットアップ_白い帽子.jpg"      # 1335x2000。通行人は遠く小さい。全域使える
MIZU="$M/05_水玉の柱_全身_黒_白い帽子.jpg"              # 1335x2000。右奥に人が1人。小さいので可
CAFE="$M/02_カフェ_黄色いテーブル_青アートシャツ.jpg"    # 1080x1620。**右の x>860 に通行人。必ず切る**
# ※ 03（青シャツの通り）は使いません。左右とも通行人の顔がはっきり写っているため

# 写真をゆっくり寄せる（2.07秒で5%）。$1=写真 $2=crop $3=出力
pk () { NN=$(python3 -c "print(int(2.07*30))")
  ffmpeg -y -v error -loop 1 -t 2.07 -i "$1" \
   -vf "crop=$2,scale=1620:2880,fps=30,zoompan=z='1.00+0.05*on/$NN':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,setsar=1" \
   -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$3"; }

# 1 表紙：全身・遠目。黒のセットアップがいちばん遠目で分かる
pk "$KURO" "1125:2000:105:0"   $SP/segR20/k1.mp4
# 2 全身・水玉の柱の前
pk "$MIZU" "1125:2000:105:0"   $SP/segR20/k2.mp4
# 3 カフェ。**x>860 は切る**（右奥の通行人を外す）
pk "$CAFE" "860:1529:0:45"     $SP/segR20/k3.mp4
# 4 中景・黒
pk "$KURO" "820:1458:260:260"  $SP/segR20/k4.mp4
# 5 寄り・帽子に手
pk "$MIZU" "760:1351:300:240"  $SP/segR20/k5.mp4
# 6 カフェの寄り
pk "$CAFE" "620:1102:120:330"  $SP/segR20/k6.mp4
# 7 水玉・腰から下。**5枚目と同じ写真なので、顔を外して切り方を変える**
pk "$MIZU" "810:1440:300:560"  $SP/segR20/k7.mp4
# 8 締め・黒の全身（1枚目と同じ写真だが、切り方を変えて引きに戻す）
pk "$KURO" "1000:1778:180:180" $SP/segR20/k8.mp4

cd $SP/segR20
: > list.txt; for i in $(seq 1 8); do echo "file 'k$i.mp4'" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy $SP/baseR20.mp4
echo -n "base の長さ "; ffprobe -v error -show_entries format=duration -of csv=p=0 $SP/baseR20.mp4
