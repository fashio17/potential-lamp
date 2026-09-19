#!/bin/bash
set -e
# R18 テロップ。8枚・94字・原則1行・fontsize68・上下左右中央（17万形式）
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
FT=/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc
D=$SP/txR18; rm -rf $D; mkdir -p $D $SP/out
OUT="$SP/out/R18_よそゆきを持っていきませんでした.mp4"

printf 'よそゆきを、\n持っていきませんでした' > $D/1.txt   # 表紙だけ2行
printf 'パリも、ニューヨークも'            > $D/2.txt
printf '朝はパンを買って'                  > $D/3.txt
printf '地下鉄で出かけます'                > $D/4.txt
printf '特別な日がないからです'            > $D/5.txt
printf '全部が、ふつうの一日でした'        > $D/6.txt
printf 'よそゆきを持っていくと'            > $D/7.txt
printf '服が予定を決めてしまいます'        > $D/8.txt

ST="fontfile=$FT:fontcolor=white:box=1:boxcolor=black@0.58:boxborderw=26:shadowcolor=black@0.5:shadowx=2:shadowy=2:line_spacing=18:x=(w-tw)/2"
# $4 に数値を渡すと、その分だけ下にずらす（顔にかかるとき用・2026/9/18の決めごと）
d () { echo "drawtext=${ST}:textfile=$D/$1.txt:fontsize=68:y=(h-th)/2+${4:-0}:enable='between(t,$2,$3)'"; }

CH="$(d 1  0.10  2.00),\
$(d 2  2.17  4.07),\
$(d 3  4.24  6.14),\
$(d 4  6.31  8.21 160),\
$(d 5  8.38 10.28),\
$(d 6 10.45 12.35),\
$(d 7 12.52 14.42),\
$(d 8 14.59 16.50 200)"

ffmpeg -y -v error -i $SP/baseR18.mp4 -f lavfi -i anullsrc=r=44100:cl=stereo \
 -filter_complex "[0:v]eq=contrast=1.06:saturation=1.08:brightness=0.006,unsharp=5:5:0.4,${CH}[v]" \
 -map "[v]" -map 1:a -shortest -c:v libx264 -preset slow -crf 23 -maxrate 8M -bufsize 16M \
 -pix_fmt yuv420p -profile:v high -level 4.1 -c:a aac -b:a 128k -movflags +faststart "$OUT"

echo "=== 完成 ==="; ls -la "$OUT"
echo -n "総文字数 "; cat $D/*.txt | tr -d '\n' | LC_ALL=C.UTF-8 wc -m
