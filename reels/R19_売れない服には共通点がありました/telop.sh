#!/bin/bash
set -e
# R19 テロップ。12枚・135字・原則1行・fontsize68・上下左右中央（17万形式）
# ※総量の目安は90〜110字だが、**本編が20.7秒に伸びたので116字。**
#   密度は5.4字/秒で、8枚16.7秒（97字＝5.8字/秒）とほぼ同じ。
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
FT=/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc
D=$SP/txR19; rm -rf $D; mkdir -p $D $SP/out
OUT="$SP/out/R19_売れない服には共通点がありました.mp4"

printf '売れない服には、\n共通点がありました' > $D/1.txt   # 表紙だけ2行
printf '商社で仕入れをしていました'          > $D/2.txt
printf '毎シーズン何百着も見ます'            > $D/3.txt
printf '売れる服は違いました'                > $D/4.txt
printf 'デザインではありません'              > $D/5.txt
printf '誰に着てほしいかが'                  > $D/6.txt
printf '決まっているかどうかでした'          > $D/7.txt
printf '誰にでも似合う服は'                  > $D/8.txt    # 2026/9/19に追加
# ※8枚目は +190 下げています。並木のカットで顔が中央に来て、帯の右端が顔にかかったため
printf '誰の服でもありません'                > $D/9.txt    # 2026/9/19に追加
printf '服だけの話ではありません'            > $D/10.txt
# ↓ 2026/9/19（2度目のご指摘）「服だけの話ではありませんで切れたら、なんの話か分かりません」
#   着地がなかったので、見ている人の商品に着地させ、最後は問いかけで終える
printf 'あなたの講座や商品は'                > $D/11.txt
printf '誰に向けていますか'                  > $D/12.txt

ST="fontfile=$FT:fontcolor=white:box=1:boxcolor=black@0.58:boxborderw=26:shadowcolor=black@0.5:shadowx=2:shadowy=2:line_spacing=18:x=(w-tw)/2"
# $4 に数値を渡すと、その分だけ下にずらす（顔にかかるとき用・2026/9/18の決めごと）
# 負の数を渡すと上にずらせるよう、括弧でくくっている
d () { echo "drawtext=${ST}:textfile=$D/$1.txt:fontsize=68:y=(h-th)/2+(${4:-0}):enable='between(t,$2,$3)'"; }

CH="$(d 1   0.10  2.00 -300),\
$(d 2   2.17  4.07),\
$(d 3   4.24  6.14),\
$(d 4   6.31  8.21),\
$(d 5   8.38 10.28),\
$(d 6  10.45 12.35),\
$(d 7  12.52 14.42),\
$(d 8  14.59 16.49 190),\
$(d 9  16.66 18.56),\
$(d 10 18.73 20.63),\
$(d 11 20.80 22.70),\
$(d 12 22.87 25.10)"

ffmpeg -y -v error -i $SP/baseR19.mp4 -f lavfi -i anullsrc=r=44100:cl=stereo \
 -filter_complex "[0:v]eq=contrast=1.06:saturation=1.08:brightness=0.006,unsharp=5:5:0.4,${CH}[v]" \
 -map "[v]" -map 1:a -shortest -c:v libx264 -preset slow -crf 23 -maxrate 8M -bufsize 16M \
 -pix_fmt yuv420p -profile:v high -level 4.1 -c:a aac -b:a 128k -movflags +faststart "$OUT"

echo "=== 完成 ==="; ls -la "$OUT"
echo -n "総文字数 "; cat $D/*.txt | tr -d '\n' | LC_ALL=C.UTF-8 wc -m
