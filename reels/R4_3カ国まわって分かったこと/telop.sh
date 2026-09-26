#!/bin/bash
set -e
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
FT=/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc
D=$SP/txR4; mkdir -p $D $SP/out
OUT=$SP/out/R4_3カ国まわって分かったこと.mp4

printf '3カ国まわって分かったのは\nどこも普通だった\nということです' > $D/1.txt
printf 'ソウルも、パリも\nニューヨークも'                      > $D/2.txt
printf '毎日フル装備の人は\nいませんでした'                    > $D/3.txt
printf 'では、なぜ素敵に見えるのか'                           > $D/4.txt
printf '自分で決めているからです'                            > $D/5.txt
printf '「似合う」が\n分からなくなるのは'                     > $D/6.txt
printf '決める基準を\n自分の外側に置いたときです'              > $D/7.txt
printf '雑誌でも、診断でもなく'                              > $D/8.txt
printf '私が、わたしの\nスタイリストになる'                    > $D/9.txt
printf '今日の服は\n誰が決めましたか'                         > $D/10.txt

ST="fontfile=$FT:fontcolor=white:box=1:boxcolor=black@0.58:boxborderw=26:shadowcolor=black@0.5:shadowx=2:shadowy=2:line_spacing=18:x=(w-tw)/2"
d  () { echo "drawtext=${ST}:textfile=$D/$1.txt:fontsize=$4:y=(h-th)/2:enable='between(t,$2,$3)'"; }
dy () { echo "drawtext=${ST}:textfile=$D/$1.txt:fontsize=$4:y=(h-th)/2+$5:enable='between(t,$2,$3)'"; }

CH="$(d 1 0.10 2.00 52),\
$(d  2   2.17  4.07 62),\
$(d 3 4.24 6.14 60),\
$(d 4 6.31 8.21 62),\
$(d 5 8.38 10.28 64),\
$(d 6 10.45 12.35 62),\
$(d  7  12.52 14.42 54),\
$(d  8  14.59 16.49 64),\
$(d 9 16.66 18.56 62),\
$(d 10 18.73 20.63 64)"

ffmpeg -y -v error -i $SP/baseR4.mp4 -f lavfi -i anullsrc=r=44100:cl=stereo \
 -filter_complex "[0:v]eq=contrast=1.06:saturation=1.08:brightness=0.006,unsharp=5:5:0.4,${CH}[v]" \
 -map "[v]" -map 1:a -shortest -c:v libx264 -preset slow -crf 23 -maxrate 7M -bufsize 14M \
 -pix_fmt yuv420p -profile:v high -level 4.1 -c:a aac -b:a 128k -movflags +faststart "$OUT"
ls -la "$OUT"
