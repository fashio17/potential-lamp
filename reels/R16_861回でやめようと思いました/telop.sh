#!/bin/bash
set -e
# R16 テロップ。8枚・111字・原則1行・fontsize68・上下左右中央（17万形式）
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
FT=/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc
D=$SP/txR16; rm -rf $D; mkdir -p $D $SP/out
OUT="$SP/out/R16_861回でやめようと思いました.mp4"

printf '1本目が861回で、\nもうやめようと思いました' > $D/1.txt   # 表紙だけ2行
printf '最初の4秒で半分が消えました'                > $D/2.txt
printf '中身の問題だと思っていました'                > $D/3.txt
printf 'まず入口の一行を直しました'                  > $D/4.txt
printf '「普通でした」をやめて'                      > $D/5.txt
printf '「しまい込みました」にした'                  > $D/6.txt
printf '次の1本は2万4990回'                          > $D/7.txt
printf '人は自分の話しか見ません'                    > $D/8.txt

ST="fontfile=$FT:fontcolor=white:box=1:boxcolor=black@0.58:boxborderw=26:shadowcolor=black@0.5:shadowx=2:shadowy=2:line_spacing=18:x=(w-tw)/2"
d () { echo "drawtext=${ST}:textfile=$D/$1.txt:fontsize=68:y=(h-th)/2:enable='between(t,$2,$3)'"; }

CH="$(d 1  0.10  2.00),\
$(d 2  2.17  4.07),\
$(d 3  4.24  6.14),\
$(d 4  6.31  8.21),\
$(d 5  8.38 10.28),\
$(d 6 10.45 12.35),\
$(d 7 12.52 14.42),\
$(d 8 14.59 16.55)"

ffmpeg -y -v error -i $SP/baseR16.mp4 -f lavfi -i anullsrc=r=44100:cl=stereo \
 -filter_complex "[0:v]eq=contrast=1.06:saturation=1.08:brightness=0.006,unsharp=5:5:0.4,${CH}[v]" \
 -map "[v]" -map 1:a -shortest -c:v libx264 -preset slow -crf 23 -maxrate 8M -bufsize 16M \
 -pix_fmt yuv420p -profile:v high -level 4.1 -c:a aac -b:a 128k -movflags +faststart "$OUT"

echo "=== 完成 ==="; ls -la "$OUT"
echo -n "総文字数 "; cat $D/*.txt | tr -d '\n' | LC_ALL=C.UTF-8 wc -m
