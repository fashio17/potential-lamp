#!/bin/bash
set -e
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
FT=/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc
D=$SP/txR9; mkdir -p $D $SP/out
OUT=$SP/out/R9_もう歳だからとしまい込んだ服.mp4

printf '「もう歳だから」と言って\nしまい込んだ服はありませんか'  > $D/1.txt
printf 'パリの古物店で\nお見かけした方がいます'                > $D/2.txt
printf 'ヒョウ柄のスカーフに\n花柄のスカート、赤いパンプス'      > $D/3.txt
printf '派手だとは\n見えませんでした'                         > $D/4.txt
printf '日本には\n年相応という言葉があります'                  > $D/5.txt
printf '年齢を基準にして\n装いの範囲を決める言葉です'            > $D/6.txt
printf 'でも範囲を決めているのは\n自分ではありません'            > $D/7.txt
printf 'あの方が基準にしていたのは\n着たいかどうかだけです'       > $D/8.txt
printf '似合うかどうかは\nあとから決まります'                   > $D/9.txt
printf 'あなたがしまい込んだ一着は\nどんな色でしたか'            > $D/10.txt

ST="fontfile=$FT:fontcolor=white:box=1:boxcolor=black@0.58:boxborderw=26:shadowcolor=black@0.5:shadowx=2:shadowy=2:line_spacing=18:x=(w-tw)/2"
d () { echo "drawtext=${ST}:textfile=$D/$1.txt:fontsize=$4:y=(h-th)/2:enable='between(t,$2,$3)'"; }

CH="$(d 1   0.10  1.97 60),\
$(d 2   2.17  4.03 62),\
$(d 3   4.23  6.10 58),\
$(d 4   6.30  8.17 66),\
$(d 5   8.37 10.23 62),\
$(d 6  10.43 12.30 60),\
$(d 7  12.50 14.37 60),\
$(d 8  14.57 16.43 60),\
$(d 9  16.63 18.50 62),\
$(d 10 18.70 20.57 60)"

ffmpeg -y -v error -i $SP/baseR9.mp4 -f lavfi -i anullsrc=r=44100:cl=stereo \
 -filter_complex "[0:v]eq=contrast=1.06:saturation=1.08:brightness=0.006,unsharp=5:5:0.4,${CH}[v]" \
 -map "[v]" -map 1:a -shortest -c:v libx264 -preset slow -crf 23 -maxrate 8M -bufsize 16M \
 -pix_fmt yuv420p -profile:v high -level 4.1 -c:a aac -b:a 128k -movflags +faststart "$OUT"

echo "=== 完成 ==="; ls -la "$OUT"; ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT"
