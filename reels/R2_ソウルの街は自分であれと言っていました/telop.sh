#!/bin/bash
set -e
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
FT=/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc
D=$SP/txR2; mkdir -p $D $SP/out
OUT=$SP/out/R2_ソウルの街は自分であれと言っていました.mp4

printf 'ソウルの街は\n「自分であれ」と\n言っていました'      > $D/1.txt
printf '店の看板にも\n売り場のパネルにも'                  > $D/2.txt
printf '「あなたであれ、自信を持って」'                    > $D/3.txt
printf '「他人の目から自由に、着たい服を」'                 > $D/4.txt
printf '服を売る言葉が\nそうなっていました'                 > $D/5.txt
printf '日本の売り場で\n同じ言葉を見た覚えがありません'      > $D/6.txt
printf '言われるのは\n「失敗しない選び方」のほうです'        > $D/7.txt
printf 'どちらが正しいかでは\nありません'                   > $D/8.txt
printf 'その社会が怖がっているものが\n売り場に出ます'         > $D/9.txt
printf 'あなたが服を選ぶとき\n怖いのは何ですか'              > $D/10.txt

ST="fontfile=$FT:fontcolor=white:box=1:boxcolor=black@0.58:boxborderw=26:shadowcolor=black@0.5:shadowx=2:shadowy=2:line_spacing=18:x=(w-tw)/2"
d () { echo "drawtext=${ST}:textfile=$D/$1.txt:fontsize=$4:y=(h-th)/2:enable='between(t,$2,$3)'"; }

CH="$(d 1   0.10  2.00 58),\
$(d 2   2.17  4.07 60),\
$(d 3   4.24  6.14 60),\
$(d 4   6.31  8.21 52),\
$(d 5   8.38 10.28 60),\
$(d 6  10.45 12.35 54),\
$(d 7  12.52 14.42 52),\
$(d 8  14.59 16.49 62),\
$(d 9  16.66 18.56 54),\
$(d 10 18.73 20.63 62)"

ffmpeg -y -v error -i $SP/baseR2.mp4 -f lavfi -i anullsrc=r=44100:cl=stereo \
 -filter_complex "[0:v]eq=contrast=1.06:saturation=1.08:brightness=0.006,unsharp=5:5:0.4,${CH}[v]" \
 -map "[v]" -map 1:a -shortest -c:v libx264 -preset slow -crf 23 -maxrate 7M -bufsize 14M \
 -pix_fmt yuv420p -profile:v high -level 4.1 -c:a aac -b:a 128k -movflags +faststart "$OUT"
ls -la "$OUT"
