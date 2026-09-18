#!/bin/bash
set -e
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
FT=/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc
D=$SP/txCU; mkdir -p $D $SP/out
OUT=$SP/out/21_日本の夏に黒が多い理由.mp4

printf '日本の夏に黒が多いのは\n暑さのせいではありません'  > $D/1.txt
printf 'ニューヨークでも、パリでも\n夏の黒は少なかった'     > $D/2.txt
printf 'ニューヨークの夏は\n東京と同じくらい暑いです'       > $D/3.txt
printf '違うのは、色を選ぶときに\n答えている問いです'       > $D/4.txt
printf '向こうでは\n「自分がどう過ごすか」'                > $D/5.txt
printf '日本では\n「まわりからどう見えるか」'              > $D/6.txt
printf '日本で黒は\n失礼にならない色です'                 > $D/7.txt
printf 'だから、暑くても選ばれます'                      > $D/8.txt
printf '好みの問題ではなく\n文化の違いです'                > $D/9.txt
printf '韓国の売り場は、白が中心でした'                   > $D/10.txt
printf '同じアジアでも、違います'                        > $D/11.txt
printf '今日の服の色は\n誰のために選びましたか'            > $D/12.txt

ST="fontfile=$FT:fontcolor=white:box=1:boxcolor=black@0.58:boxborderw=26:shadowcolor=black@0.5:shadowx=2:shadowy=2:line_spacing=18:x=(w-tw)/2"
d () { echo "drawtext=${ST}:textfile=$D/$1.txt:fontsize=$4:y=(h-th)/2:enable='between(t,$2,$3)'"; }

CH="$(d 1   0.10  2.00 58),\
$(d 2   2.17  4.07 56),\
$(d 3   4.24  6.14 58),\
$(d 4   6.31  8.21 58),\
$(d 5   8.38 10.28 60),\
$(d 6  10.45 12.35 58),\
$(d 7  12.52 14.42 64),\
$(d 8  14.59 16.49 62),\
$(d 9  16.66 18.56 66),\
$(d 10 18.73 20.63 56),\
$(d 11 20.80 22.70 66),\
$(d 12 22.87 24.77 62)"

ffmpeg -y -v error -i $SP/baseCU.mp4 -f lavfi -i anullsrc=r=44100:cl=stereo \
 -filter_complex "[0:v]eq=contrast=1.06:saturation=1.08:brightness=0.006,unsharp=5:5:0.4,${CH}[v]" \
 -map "[v]" -map 1:a -shortest -c:v libx264 -preset slow -crf 23 -maxrate 7M -bufsize 14M \
 -pix_fmt yuv420p -profile:v high -level 4.1 -c:a aac -b:a 128k -movflags +faststart "$OUT"

echo "=== 完成 ==="; ls -la "$OUT"
ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT"
