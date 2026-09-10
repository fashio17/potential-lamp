#!/bin/bash
set -e
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
FT=/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc
D=$SP/txR10; rm -rf $D; mkdir -p $D $SP/out
OUT=$SP/out/R10_旅行先で自分の服が気になりました.mp4

printf '旅行先で、自分の服が\n急に気になりました' > $D/1.txt
printf 'ボストンの通りです'          > $D/2.txt
printf '歩く人を見ていました'        > $D/3.txt
printf '気負った人がいません'        > $D/4.txt
printf '思い思いの格好でした'        > $D/5.txt
printf '誰もまわりを見ていない'      > $D/6.txt
printf '気にしていたのは私だけ'      > $D/7.txt
printf '見られていると思うのは'      > $D/8.txt
printf '自分がそう思うときです'      > $D/9.txt
printf 'あなたは今日、誰を見ますか'  > $D/10.txt

ST="fontfile=$FT:fontcolor=white:box=1:boxcolor=black@0.58:boxborderw=26:shadowcolor=black@0.5:shadowx=2:shadowy=2:line_spacing=18:x=(w-tw)/2"
d () { echo "drawtext=${ST}:textfile=$D/$1.txt:fontsize=68:y=(h-th)/2:enable='between(t,$2,$3)'"; }
CH="$(d 1 0.10 2.00),$(d 2 2.20 4.10),$(d 3 4.30 6.20),$(d 4 6.40 8.30),$(d 5 8.50 10.40),\
$(d 6 10.60 12.47),$(d 7 12.67 14.53),$(d 8 14.73 16.63),$(d 9 16.83 18.70),$(d 10 18.90 20.60)"

ffmpeg -y -v error -i $SP/baseR10.mp4 -f lavfi -i anullsrc=r=44100:cl=stereo \
 -filter_complex "[0:v]eq=contrast=1.06:saturation=1.08:brightness=0.006,unsharp=5:5:0.4,${CH}[v]" \
 -map "[v]" -map 1:a -shortest -c:v libx264 -preset slow -crf 23 -maxrate 8M -bufsize 16M \
 -pix_fmt yuv420p -profile:v high -level 4.1 -c:a aac -b:a 128k -movflags +faststart "$OUT"
echo "=== 完成 ==="; ls -la "$OUT"; cat $D/*.txt | tr -d '\n' | LC_ALL=C.UTF-8 wc -m
