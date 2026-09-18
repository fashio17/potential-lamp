#!/bin/bash
set -e
# R17「色を足すのが、こわかったんです」 2026/9/18
# 主題：色は全部変えるものではなく、一点だけ効かせるもの。パリの「一点突破」。
# 【素材】すべて未使用。台帳が古く「R1で使用」となっていた IMG_0283 と IMG_1083 は、
#   R1のbuild.shに入っておらず、実際には一度も公開リールに出ていません（9/18に確認）。
P="/home/user/potential-lamp/reels/素材/パリ"
N="/home/user/potential-lamp/reels/素材/ニューヨーク"
NB="/home/user/potential-lamp/reels/素材/ニューヨーク・ボストン"
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
mkdir -p $SP/segR17 $SP/imgR17

ME="$P/IMG_0283_商業施設の廊下を歩く.mov"        # 6.66秒・2160x3840。黒シャツ＋グレー＋白い靴。人なし
TACHI="$P/IMG_1083_通りに立つ.jpg"               # 1320x1988。パリの通り。黒の装い＋白いバッグ＋白い靴
SHIRO="$NB/IMG_1853_本人_白Tとベージュパンツ_街は要確認.mov"  # 1.39秒。短いので静止画にする
IRO="$NB/IMG_1884_雑貨店_色と柄_街は要確認.mov"  # 8.3秒・1080x1920。色と柄。人なし
TEN="$N/IMG_2016_店内_KITHの看板あり.mov"        # 4.47秒。t>=4.0 で看板が画面から外れる
GAI="$N/IMG_1372_五番街_ホテル名あり.mov"        # 9.13秒・2160x3840。t<5 ならホテル名は出ない

# 動画から1カット（出力はどれも約2.07秒）
cutc () { R=$(python3 -c "print(2.07/$3)")
  ffmpeg -y -v error -i "$1" -an \
   -vf "trim=start=$2:duration=$3,setpts=PTS-STARTPTS,crop=$4,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
   -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$5"; }

# 1コマ抜いてゆっくり寄る（素材が短い・看板を避けたいとき用）
still () { ffmpeg -y -v error -ss "$2" -i "$1" -vframes 1 $SP/imgR17/t.png
  NN=$(python3 -c "print(int(2.07*30))")
  ffmpeg -y -v error -loop 1 -t 2.07 -i $SP/imgR17/t.png \
   -vf "crop=$3,scale=1620:2880,fps=30,zoompan=z='1.00+0.05*on/$NN':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,setsar=1" \
   -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$4"; }

# 写真から1カット
pk () { NN=$(python3 -c "print(int(2.07*30))")
  ffmpeg -y -v error -loop 1 -t 2.07 -i "$1" \
   -vf "crop=$2,scale=1620:2880,fps=30,zoompan=z='1.00+0.05*on/$NN':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,setsar=1" \
   -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$3"; }

# 1 表紙：遠目の全身。黒シャツ＋グレーパンツ＋白い靴＝無彩色に白が一点。主題そのもの
cutc  "$ME"    0.60 1.28 "2160:3840:0:0"      $SP/segR17/k1.mp4
# 2 五番街。t<5 なので THE PENINSULA の文字は出ない
cutc  "$GAI"   0.20 1.28 "2160:3840:0:0"      $SP/segR17/k2.mp4
# 3 店内。t=4.2 で KITH の看板が画面から外れる。1コマ抜いて使う
still "$TEN"   4.20 "1080:1920:0:0"           $SP/segR17/k3.mp4
# 4 本人・白Tとベージュ。1.39秒しかないので1コマ抜く。上を落として顔をテロップ帯より上へ
still "$SHIRO" 0.50 "1730:3075:215:120"       $SP/segR17/k4.mp4
# 5 色柄のラック。ここが「色」の代表画
cutc  "$IRO"   5.20 1.28 "1080:1920:0:0"      $SP/segR17/k5.mp4
# 6 雑貨の棚。かごバッグ・柄物
cutc  "$IRO"   0.80 1.28 "1080:1920:0:0"      $SP/segR17/k6.mp4
# 7 パリの通りに立つ。黒の装いに白いバッグと白い靴＝一点。
#   1320x1988。上を210px落として寄せると、顔が中央のテロップ帯より上に来る
#   （150pxでは顔に文字がかかりました。9/18に実測して直しています）
#   さらに、右上に「HOTEL MONDIAL」の看板が読めるので、幅を880に絞って外しています
pk    "$TACHI" "880:1564:0:380"                $SP/segR17/k7.mp4
# 8 締め。歩いて近づいてくる
cutc  "$ME"    4.30 1.28 "2160:3840:0:0"      $SP/segR17/k8.mp4

cd $SP/segR17
: > list.txt; for i in $(seq 1 8); do echo "file 'k$i.mp4'" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy $SP/baseR17.mp4
echo -n "base の長さ "; ffprobe -v error -show_entries format=duration -of csv=p=0 $SP/baseR17.mp4
