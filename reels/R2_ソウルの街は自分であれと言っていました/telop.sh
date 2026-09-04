#!/bin/bash
set -e
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
FT=/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc
D=$SP/txR2; mkdir -p $D $SP/out
OUT=$SP/out/R2_服を選ぶのが怖いのは.mp4

printf '服を選ぶのが怖いのは\nあなたのせいではありません'   > $D/1.txt
printf '日本の売り場で\nよく見る言葉があります'            > $D/2.txt
printf '「失敗しない選び方」'                            > $D/3.txt
printf 'ソウルの売り場は\n違いました'                     > $D/4.txt
printf '「あなたであれ、自信を持って」'                    > $D/5.txt
printf '「他人の目から自由に\n着たい服を」'                > $D/6.txt
printf '服を売る言葉が\nそうなっていました'                > $D/7.txt
printf 'その社会が怖がっているものが\n売り場に出ます'        > $D/8.txt
printf '日本で怖いのは\n失敗することなのだと思います'        > $D/9.txt
printf 'あなたが服を選ぶとき\n怖いのは何ですか'             > $D/10.txt

ST="fontfile=$FT:fontcolor=white:box=1:boxcolor=black@0.58:boxborderw=26:shadowcolor=black@0.5:shadowx=2:shadowy=2:line_spacing=18:x=(w-tw)/2"
d () { echo "drawtext=${ST}:textfile=$D/$1.txt:fontsize=$4:y=(h-th)/2:enable='between(t,$2,$3)'"; }

CH="$(d 1   0.10  2.00 56),\
$(d 2   2.17  4.07 56),\
$(d 3   4.24  6.14 64),\
$(d 4   6.31  8.21 60),\
$(d 5   8.38 10.28 52),\
$(d 6  10.45 12.35 50),\
$(d 7  12.52 14.42 56),\
$(d 8  14.59 16.49 50),\
$(d 9  16.66 18.56 50),\
$(d 10 18.73 20.63 56)"

ffmpeg -y -v error -i $SP/baseR2.mp4 -f lavfi -i anullsrc=r=44100:cl=stereo \
 -filter_complex "[0:v]eq=contrast=1.06:saturation=1.08:brightness=0.006,unsharp=5:5:0.4,${CH}[v]" \
 -map "[v]" -map 1:a -shortest -c:v libx264 -preset slow -crf 23 -maxrate 8M -bufsize 16M \
 -pix_fmt yuv420p -profile:v high -level 4.1 -c:a aac -b:a 128k -movflags +faststart "$OUT"

echo "=== 完成 ==="; ls -la "$OUT"; ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT"
