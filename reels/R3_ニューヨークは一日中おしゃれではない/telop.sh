#!/bin/bash
set -e
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
FT=/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc
D=$SP/txR3; mkdir -p $D $SP/out
OUT=$SP/out/R3_朝から夜まで同じ服で.mp4

printf '朝から夜まで\n同じ服で過ごしていませんか'      > $D/1.txt
printf 'ニューヨークの昼は\nほとんどスニーカーでした'   > $D/2.txt
printf '拍子抜けするくらい\n普通でした'               > $D/3.txt
printf 'でも、夜は変わります'                        > $D/4.txt
printf '靴だけ、履き替える'                          > $D/5.txt
printf '時間帯で\n切り替えているのです'                > $D/6.txt
printf 'ずっと気合いを\n入れてはいません'              > $D/7.txt
printf '入れる時間と\n入れない時間がある'              > $D/8.txt
printf '切り替える場所を\nひとつ決めるだけです'         > $D/9.txt
printf '今日、切り替えるのは\nどこにしますか'           > $D/10.txt

ST="fontfile=$FT:fontcolor=white:box=1:boxcolor=black@0.58:boxborderw=26:shadowcolor=black@0.5:shadowx=2:shadowy=2:line_spacing=18:x=(w-tw)/2"
d () { echo "drawtext=${ST}:textfile=$D/$1.txt:fontsize=$4:y=(h-th)/2:enable='between(t,$2,$3)'"; }

CH="$(d 1   0.10  2.00 58),\
$(d 2   2.17  4.07 54),\
$(d 3   4.24  6.14 58),\
$(d 4   6.31  8.21 62),\
$(d 5   8.38 10.28 64),\
$(d 6  10.45 12.35 60),\
$(d 7  12.52 14.42 60),\
$(d 8  14.59 16.49 60),\
$(d 9  16.66 18.56 58),\
$(d 10 18.73 20.63 58)"

ffmpeg -y -v error -i $SP/baseR3.mp4 -f lavfi -i anullsrc=r=44100:cl=stereo \
 -filter_complex "[0:v]eq=contrast=1.06:saturation=1.08:brightness=0.006,unsharp=5:5:0.4,${CH}[v]" \
 -map "[v]" -map 1:a -shortest -c:v libx264 -preset slow -crf 23 -maxrate 8M -bufsize 16M \
 -pix_fmt yuv420p -profile:v high -level 4.1 -c:a aac -b:a 128k -movflags +faststart "$OUT"

echo "=== 完成 ==="; ls -la "$OUT"; ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT"
