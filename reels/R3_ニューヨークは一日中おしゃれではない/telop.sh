#!/bin/bash
set -e
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
FT=/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc
D=$SP/txR3; mkdir -p $D $SP/out
OUT=$SP/out/R3_ニューヨークは一日中おしゃれではない.mp4

printf 'ニューヨークの人は\n一日中おしゃれでは\nありませんでした' > $D/1.txt
printf '昼は、スニーカーです'                        > $D/2.txt
printf '街を歩く人の足元は\nほとんどスニーカーでした'   > $D/3.txt
printf 'でも、夜は変わります'                        > $D/4.txt
printf '靴だけ、履き替える'                          > $D/5.txt
printf '時間帯で\n切り替えているのです'                > $D/6.txt
printf 'ずっと気合いを\n入れてはいません'              > $D/7.txt
printf '毎日きちんとしなければ、と\n思っていませんか'    > $D/8.txt
printf '切り替える場所を\nひとつ決めるだけです'         > $D/9.txt
printf '今日、切り替えるのは\nどこにしますか'           > $D/10.txt

ST="fontfile=$FT:fontcolor=white:box=1:boxcolor=black@0.58:boxborderw=26:shadowcolor=black@0.5:shadowx=2:shadowy=2:line_spacing=18:x=(w-tw)/2"
d  () { echo "drawtext=${ST}:textfile=$D/$1.txt:fontsize=$4:y=(h-th)/2:enable='between(t,$2,$3)'"; }
dy () { echo "drawtext=${ST}:textfile=$D/$1.txt:fontsize=$4:y=(h-th)/2+$5:enable='between(t,$2,$3)'"; }

CH="$(dy 1   0.10  2.00 56 380),\
$(d  2   2.17  4.07 66),\
$(d  3   4.24  6.14 56),\
$(dy 4   6.31  8.21 66 450),\
$(dy 5   8.38 10.28 70 450),\
$(d  6  10.45 12.35 64),\
$(d  7  12.52 14.42 64),\
$(d  8  14.59 16.49 54),\
$(dy 9  16.66 18.56 60 380),\
$(dy 10 18.73 20.63 62 380)"

ffmpeg -y -v error -i $SP/baseR3.mp4 -f lavfi -i anullsrc=r=44100:cl=stereo \
 -filter_complex "[0:v]eq=contrast=1.06:saturation=1.08:brightness=0.006,unsharp=5:5:0.4,${CH}[v]" \
 -map "[v]" -map 1:a -shortest -c:v libx264 -preset slow -crf 23 -maxrate 7M -bufsize 14M \
 -pix_fmt yuv420p -profile:v high -level 4.1 -c:a aac -b:a 128k -movflags +faststart "$OUT"
ls -la "$OUT"
