#!/bin/bash
set -e
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
FT=/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc
D=$SP/txR1; mkdir -p $D $SP/out
OUT=$SP/out/R1_パリの街は普通でした.mp4

printf 'パリの街は\n思っていたより普通でした'          > $D/1.txt
printf '行く前は\nおしゃれな人だらけだと\n思っていました' > $D/2.txt
printf '奇抜な人は\nほとんどいません'                  > $D/3.txt
printf '流行も、追っていません'                       > $D/4.txt
printf '服そのものは\n驚くほどオーソドックスでした'      > $D/5.txt
printf 'それでも、素敵なんです'                       > $D/6.txt
printf '小物で\n一点だけ効かせている'                  > $D/7.txt
printf '全部を決めるのではなく\nひとつだけ決めている'     > $D/8.txt
printf 'あなたの一点は\nどこですか'                    > $D/9.txt

ST="fontfile=$FT:fontcolor=white:box=1:boxcolor=black@0.58:boxborderw=26:shadowcolor=black@0.5:shadowx=2:shadowy=2:line_spacing=18:x=(w-tw)/2"
d  () { echo "drawtext=${ST}:textfile=$D/$1.txt:fontsize=$4:y=(h-th)/2:enable='between(t,$2,$3)'"; }
dy () { echo "drawtext=${ST}:textfile=$D/$1.txt:fontsize=$4:y=(h-th)/2+$5:enable='between(t,$2,$3)'"; }

CH="$(d 1 0.10 2.00 58),\
$(d  2  2.17  4.07 54),\
$(d 3 4.24 6.14 64),\
$(d 4 6.31 8.21 62),\
$(d 5 8.38 10.28 52),\
$(d  6 10.45 12.35 64),\
$(d 7 12.52 14.42 62),\
$(d 8 14.59 16.49 56),\
$(d 9 16.66 18.56 66)"

ffmpeg -y -v error -i $SP/baseR1.mp4 -f lavfi -i anullsrc=r=44100:cl=stereo \
 -filter_complex "[0:v]eq=contrast=1.06:saturation=1.08:brightness=0.006,unsharp=5:5:0.4,${CH}[v]" \
 -map "[v]" -map 1:a -shortest -c:v libx264 -preset slow -crf 23 -maxrate 8M -bufsize 16M \
 -pix_fmt yuv420p -profile:v high -level 4.1 -c:a aac -b:a 128k -movflags +faststart "$OUT"

ls -la "$OUT"; ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT"
