#!/bin/bash
set -e
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
FT=/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc
D=$SP/txR8; mkdir -p $D $SP/out
OUT=$SP/out/R8_黒い服が好きなのではなく.mp4

printf '黒い服が好きなのではなく\n失敗したくないだけかもしれません'   > $D/1.txt
printf 'クローゼットを開けると\n黒が並んでいます'                   > $D/2.txt
printf '白も水色も\n持っているのに'                                > $D/3.txt
printf '手が伸びるのは\nいつも黒でした'                            > $D/4.txt
printf '「黒は無難だから」\nとよく言われます'                       > $D/5.txt
printf 'でも売り場には\nこんなに色があります'                       > $D/6.txt
printf '無難というのは\n誰の目から見た言葉でしょう'                  > $D/7.txt
printf '黒を選ぶ理由が\n自分の外側にあるとき'                       > $D/8.txt
printf '服は「なりたい自分」ではなく\n「まちがえない自分」になります'  > $D/9.txt
printf 'あなたの黒は\nどちらですか'                                > $D/10.txt

ST="fontfile=$FT:fontcolor=white:box=1:boxcolor=black@0.58:boxborderw=26:shadowcolor=black@0.5:shadowx=2:shadowy=2:line_spacing=18:x=(w-tw)/2"
d () { echo "drawtext=${ST}:textfile=$D/$1.txt:fontsize=$4:y=(h-th)/2:enable='between(t,$2,$3)'"; }

CH="$(d 1   0.10  2.00 56),\
$(d 2   2.20  4.10 62),\
$(d 3   4.30  6.20 66),\
$(d 4   6.40  8.30 66),\
$(d 5   8.50 10.40 64),\
$(d 6  10.60 12.47 62),\
$(d 7  12.67 14.53 58),\
$(d 8  14.73 16.63 62),\
$(d 9  16.83 18.70 56),\
$(d 10 18.90 20.80 66)"

ffmpeg -y -v error -i $SP/baseR8.mp4 -f lavfi -i anullsrc=r=44100:cl=stereo \
 -filter_complex "[0:v]eq=contrast=1.06:saturation=1.08:brightness=0.010,unsharp=5:5:0.4,${CH}[v]" \
 -map "[v]" -map 1:a -shortest -c:v libx264 -preset slow -crf 23 -maxrate 8M -bufsize 16M \
 -pix_fmt yuv420p -profile:v high -level 4.1 -c:a aac -b:a 128k -movflags +faststart "$OUT"

echo "=== 完成 ==="; ls -la "$OUT"; ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT"
