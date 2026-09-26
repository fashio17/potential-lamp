#!/bin/bash
set -e
# R17 テロップ。8枚・96字・原則1行・fontsize68・上下左右中央（17万形式）
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
FT=/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc
D=$SP/txR17; rm -rf $D; mkdir -p $D $SP/out
OUT="$SP/out/R17_色を足すのがこわかった.mp4"

printf '色を足すのが、\nこわかったんです' > $D/1.txt   # 表紙だけ2行
printf 'パリでもニューヨークでも'        > $D/2.txt
printf '街は思ったより静かな色でした'    > $D/3.txt
printf '黒、生成り、グレー'              > $D/4.txt
printf '効かせているのは一つだけ'        > $D/5.txt
printf 'バッグか、靴か、スカーフ'        > $D/6.txt
printf '一点なら、はずしても'            > $D/7.txt
printf 'はずれるのは一点だけです'        > $D/8.txt

ST="fontfile=$FT:fontcolor=white:box=1:boxcolor=black@0.58:boxborderw=26:shadowcolor=black@0.5:shadowx=2:shadowy=2:line_spacing=18:x=(w-tw)/2"
# $4 に数値を渡すと、その分だけテロップを下にずらします（顔にかかるときに使う）
# 【2026/9/18・ご本人】「顔にかかるテロップは少しずらしてね」
#   目安：+170 で、顔の下・胸のあたりに落ちます。切り出しを変えるより副作用がありません
d () { echo "drawtext=${ST}:textfile=$D/$1.txt:fontsize=68:y=(h-th)/2+${4:-0}:enable='between(t,$2,$3)'"; }

CH="$(d 1  0.10  2.00),\
$(d 2  2.17  4.07),\
$(d 3  4.24  6.14),\
$(d 4  6.31  8.21 190),\
$(d 5  8.38 10.28),\
$(d 6 10.45 12.35),\
$(d 7 12.52 14.42 120),\
$(d 8 14.59 16.55)"

ffmpeg -y -v error -i $SP/baseR17.mp4 -f lavfi -i anullsrc=r=44100:cl=stereo \
 -filter_complex "[0:v]eq=contrast=1.06:saturation=1.08:brightness=0.006,unsharp=5:5:0.4,${CH}[v]" \
 -map "[v]" -map 1:a -shortest -c:v libx264 -preset slow -crf 23 -maxrate 8M -bufsize 16M \
 -pix_fmt yuv420p -profile:v high -level 4.1 -c:a aac -b:a 128k -movflags +faststart "$OUT"

echo "=== 完成 ==="; ls -la "$OUT"
echo -n "総文字数 "; cat $D/*.txt | tr -d '\n' | LC_ALL=C.UTF-8 wc -m
