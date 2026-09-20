#!/bin/bash
set -e
# R19「売れない服には、共通点がありました」 2026/9/19（三度目の組み直し）
# 【この回のねらい】客層の入れ替え。
#   これまでのリールは「服に悩む人」を呼んでいて、講座を買う人ではなかった（9/17の発見）。
#   この回は **ファッション起業したい人・している人** に向けて作っている。
#   題材は商社時代の話。**リールで一度も使っていない、いちばん強い材料。**
J="/home/user/potential-lamp/reels/素材/日本_屋外"
F="/home/user/potential-lamp/reels/素材/服の画"
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
mkdir -p $SP/segR19

TATE="$J/IMG_3007_建物の前に立つ_黒Tグレーパンツ.mov"   # 19.9秒。**t≧15 は手が画面いっぱいに出るので使わない**
NAMI="$J/IMG_3006_並木の道を歩く_黒Tグレーパンツ.mov"   # 21.6秒。**t≧20 は寄りすぎ＋指が入るので使わない**
WIN="$F/IMG_1890_ショーウィンドウ_服のラック.mov"        # 4.97秒・1920x1080
GASHU="$F/ファッション画集の見開き_Croquis_Elegants.jpg"  # 1932x2576

# $1=元動画 $2=開始 $3=長さ $4=crop $5=出力（出力はどれも約2.07秒）
cutc () { R=$(python3 -c "print(2.07/$3)")
  ffmpeg -y -v error -i "$1" -an \
   -vf "trim=start=$2:duration=$3,setpts=PTS-STARTPTS,crop=$4,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
   -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$5"; }

# 写真をゆっくり寄せる（2.07秒で5%）。$1=写真 $2=crop $3=出力
pk () { NN=$(python3 -c "print(int(2.07*30))")
  ffmpeg -y -v error -loop 1 -t 2.07 -i "$1" \
   -vf "crop=$2,scale=1620:2880,fps=30,zoompan=z='1.00+0.05*on/$NN':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,setsar=1" \
   -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$3"; }

# 【2026/9/19 三度目の組み直し】ご指摘3点への対応
#   ①「もう少し長くできませんか」 → **8枚16.7秒 から 10枚20.7秒へ。**
#      足したのは「誰にでも似合う服は／誰の服でもありません」。
#      キャプションの中でいちばん強い2行で、**起業層にはここが刺さる。**
#   ②「赤いチェックの服の動画はおかしい」 → **タグの写真を全部外した。**
#      手ブレでぼけていて、何の画か伝わらないままだった。ショーウィンドウの別の場所に交換。
#   ③「前に歩いて指が出てくる最後の方もおかしい」 → **締めを NAMI 19.80 から 17.60 に変更。**
#      19.80 からだと 21.08 まで進み、胸から上の寄り＋手が画面を横切っていた。
#      **TATEは t≧15、NAMIは t≧20 を使わないことにした（上の注記）。**

# 1 表紙：全身・遠目。顔が見える位置
cutc "$TATE"  2.00 1.28 "1080:1920:0:0"  $SP/segR19/k1.mp4
# 2 引き。並木の奥に立っている
cutc "$NAMI" 15.00 1.28 "1080:1920:0:0"  $SP/segR19/k2.mp4
# 3 ★ショーウィンドウ。服がずらりと並ぶ ＝「毎シーズン何百着も見ます」
#   **左側だけ。**右には店の掲示。t≧2.6 はガラスに店名（BLUE & CREAM）が映り込む
cutc "$WIN"   0.20 1.28 "608:1080:140:0" $SP/segR19/k3.mp4
# 4 ★同じ窓の別の場所。ハンガーの列 ＝「売れる服は違いました」
#   **使えるのは t=3.78〜4.35 の0.55秒だけ。**3.7以前は左上に「& CREAM」の端が残り、
#   4.5以降は右下に「AUTHENTIC NEW YORK CITY」が出る。x=960 まで右にずらすと看板が外れる。
#   0.55秒を約3.8倍に伸ばして使う（ゆっくり流れる画になる）。9/19に上端を1コマずつ実測
cutc "$WIN"   3.80 0.55 "608:1080:960:0" $SP/segR19/k4.mp4
# 5 ★ファッション画集の見開き ＝「デザインではありません」
#   デザイン画を映しながら「デザインではない」と言う。描かれた人物なので顔の問題もない
pk   "$GASHU" "936:1664:497:250"         $SP/segR19/k5.mp4
# 6 全身・並木。ここでわたしに戻る
cutc "$NAMI"  9.00 1.28 "1080:1920:0:0"  $SP/segR19/k6.mp4
# 7 中景・建物の前
cutc "$TATE"  6.00 1.28 "1080:1920:0:0"  $SP/segR19/k7.mp4
# 8 全身・並木（別の位置）
cutc "$NAMI" 12.60 1.28 "1080:1920:0:0"  $SP/segR19/k8.mp4
# 9 引き・建物の前
cutc "$TATE" 12.00 1.28 "1080:1920:0:0"  $SP/segR19/k9.mp4
# 10 締め：歩いて近づき、中景で止まる。**指は入らない**
cutc "$NAMI" 17.60 1.28 "1080:1920:0:0"  $SP/segR19/k10.mp4

cd $SP/segR19
: > list.txt; for i in $(seq 1 10); do echo "file 'k$i.mp4'" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy $SP/baseR19.mp4
echo -n "base の長さ "; ffprobe -v error -show_entries format=duration -of csv=p=0 $SP/baseR19.mp4
