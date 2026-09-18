#!/bin/bash
set -e
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
FT=/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc
D=$SP/txR9; rm -rf $D; mkdir -p $D $SP/out
OUT=$SP/out/R9_もう歳だからとしまい込みました.mp4

printf 'もう歳だから、と\nしまい込みました' > $D/1.txt
printf 'パリの古物店で会った方'          > $D/2.txt
printf 'ヒョウ柄に花柄、赤い靴'          > $D/3.txt
printf '派手には見えません'              > $D/4.txt
printf '年相応、という言葉'              > $D/5.txt
printf '年齢で範囲を決める言葉'          > $D/6.txt
printf '決めているのは自分ではない'      > $D/7.txt
printf '基準は、着たいかどうか'          > $D/8.txt
printf '似合うは、あとから'              > $D/9.txt
printf 'あなたの一着は、何色でしたか'    > $D/10.txt

ST="fontfile=$FT:fontcolor=white:box=1:boxcolor=black@0.58:boxborderw=26:shadowcolor=black@0.5:shadowx=2:shadowy=2:line_spacing=18:x=(w-tw)/2"
d () { echo "drawtext=${ST}:textfile=$D/$1.txt:fontsize=68:y=(h-th)/2:enable='between(t,$2,$3)'"; }
CH="$(d 1 0.10 1.97),$(d 2 2.17 4.04),$(d 3 4.24 6.11),$(d 4 6.31 8.18),$(d 5 8.38 10.25),\
$(d 6 10.45 12.32),$(d 7 12.52 14.39),$(d 8 14.59 16.46),$(d 9 16.66 18.53),$(d 10 18.73 20.60)"

ffmpeg -y -v error -i $SP/baseR9.mp4 -f lavfi -i anullsrc=r=44100:cl=stereo \
 -filter_complex "[0:v]eq=contrast=1.06:saturation=1.08:brightness=0.006,unsharp=5:5:0.4,${CH}[v]" \
 -map "[v]" -map 1:a -shortest -c:v libx264 -preset slow -crf 23 -maxrate 8M -bufsize 16M \
 -pix_fmt yuv420p -profile:v high -level 4.1 -c:a aac -b:a 128k -movflags +faststart "$OUT"
echo "=== 完成 ==="; ls -la "$OUT"; cat $D/*.txt | tr -d '\n' | LC_ALL=C.UTF-8 wc -m
