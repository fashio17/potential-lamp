#!/bin/bash
set -e
# R19「売れない服には、共通点がありました」 2026/9/19
# 【この回のねらい】客層の入れ替え。
#   これまでのリールは「服に悩む人」を呼んでいて、講座を買う人ではなかった（9/17の発見）。
#   この回は **ファッション起業したい人・している人** に向けて作っている。
#   題材は商社時代の話。**リールで一度も使っていない、いちばん強い材料。**
J="/home/user/potential-lamp/reels/素材/日本_屋外"
F="/home/user/potential-lamp/reels/素材/服の画"
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
mkdir -p $SP/segR19

TATE="$J/IMG_3007_建物の前に立つ_黒Tグレーパンツ.mov"   # 19.9秒・1080x1920。白い建物・ベンチ・コンクリート
NAMI="$J/IMG_3006_並木の道を歩く_黒Tグレーパンツ.mov"   # 21.6秒・1080x1920。並木・緑・逆光ぎみ
WIN="$F/IMG_1890_ショーウィンドウ_服のラック.mov"        # 4.97秒・1920x1080。ガラスの向こうに服がずらり
TAG="$F/タグとチェックのシャツ_ブランド名あり_条件つき.jpg"     # 1932x2576。**右側の生地だけを切る**
GASHU="$F/ファッション画集の見開き_Croquis_Elegants.jpg"        # 1932x2576。1940年代のファッションプレート

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

# 【2026/9/19 二度目の組み直し】ご指摘「服だけの切り替えで風景も何もない。Bロールでメリハリを」
#   一度目は画の大きさを振るだけで、服そのものの画がなかった。
#   いただいた新しい素材で、**真ん中の3枚（3・4・5）を服の画に入れ替えた。**
#   構成：前半＝わたし → 中盤＝商社で見てきた服 → 後半＝わたしに戻って結論。
#   ここで一度わたしが画面から消えるので、8枚目に戻ってきたときに結論が立つ。

# 1 表紙：全身・遠目。顔が見える位置
cutc "$TATE"  2.00 1.28 "1080:1920:0:0"  $SP/segR19/k1.mp4
# 2 いちばん引き。並木の奥に小さく立っている
cutc "$NAMI" 16.60 1.28 "1080:1920:0:0"  $SP/segR19/k2.mp4
# 3 ★ショーウィンドウ。服がずらりと並ぶ ＝「毎シーズン何百着も見ます」
#   **左側だけを切る。**右には店の掲示（Disabled assistance…）と看板の文字が入るため。
#   使うのは 0.20〜1.48秒まで。2.6秒以降はガラスに店名が映り込む
cutc "$WIN"   0.20 1.28 "608:1080:140:0" $SP/segR19/k3.mp4
# 4 ★生地の寄り ＝「売れる服は違いました」
#   **右の生地だけを切る。**左のタグは RALPH LAUREN が読めるので必ず外す。
#   下半分は手ブレでぼけていたので、上（y=0から）を使う（9/19に3か所を見比べて決定）
pk   "$TAG"   "772:1372:1160:0"          $SP/segR19/k4.mp4
# 5 ★ファッション画集の見開き ＝「デザインではありません」
#   デザイン画を映しながら「デザインではない」と言う。描かれた人物なので顔の問題もない
pk   "$GASHU" "936:1664:497:250"         $SP/segR19/k5.mp4
# 6 全身・並木。ここでわたしに戻る
cutc "$NAMI" 12.60 1.28 "1080:1920:0:0"  $SP/segR19/k6.mp4
# 7 中景・歩いて近づく
cutc "$TATE" 13.60 1.28 "1080:1920:0:0"  $SP/segR19/k7.mp4
# 8 締め：近づいて止まる
cutc "$NAMI" 19.80 1.28 "1080:1920:0:0"  $SP/segR19/k8.mp4

cd $SP/segR19
: > list.txt; for i in $(seq 1 8); do echo "file 'k$i.mp4'" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy $SP/baseR19.mp4
echo -n "base の長さ "; ffprobe -v error -show_entries format=duration -of csv=p=0 $SP/baseR19.mp4
