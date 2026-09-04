#!/bin/bash
# 17.8万回のリールを実測して、その形にそろえたテロップ。
#  ・1枚は原則1行、1行は14字まで（17.8万回は8枚・83字・4.5字/秒）
#  ・フォントは68px固定（短い行はそのまま短く出す）
#  ・縦位置は画面の62%（中央ではなく、少し下）
#  ・横は中央ぞろえ（ここは17.8万回も同じだった）
set -e
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
FT=/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc
D=$SP/txR2b; mkdir -p $D $SP/out
OUT=$SP/out/R2_服を選ぶのが怖い_17万形式.mp4

printf '服を選ぶのが、こわい'          > $D/1.txt
printf '日本の売り場で見た言葉です'      > $D/2.txt
printf '「失敗しない選び方」'          > $D/3.txt
printf 'ソウルは、違いました'          > $D/4.txt
printf '「あなたであれ」'              > $D/5.txt
printf '「自信を持って」'              > $D/6.txt
printf '売り場の言葉が、そうでした'      > $D/7.txt
printf 'こわいものが、売り場に出ます'    > $D/8.txt
printf '日本でこわいのは、失敗です'      > $D/9.txt
printf 'あなたは、何がこわいですか'      > $D/10.txt

ST="fontfile=$FT:fontcolor=white:box=1:boxcolor=black@0.58:boxborderw=26:shadowcolor=black@0.5:shadowx=2:shadowy=2:line_spacing=18:x=(w-tw)/2"
d () { echo "drawtext=${ST}:textfile=$D/$1.txt:fontsize=68:y=h*0.62-th/2:enable='between(t,$2,$3)'"; }

CH="$(d 1   0.10  2.00),\
$(d 2   2.17  4.07),\
$(d 3   4.24  6.14),\
$(d 4   6.31  8.21),\
$(d 5   8.38 10.28),\
$(d 6  10.45 12.35),\
$(d 7  12.52 14.42),\
$(d 8  14.59 16.49),\
$(d 9  16.66 18.56),\
$(d 10 18.73 20.63)"

ffmpeg -y -v error -i $SP/baseR2.mp4 -f lavfi -i anullsrc=r=44100:cl=stereo \
 -filter_complex "[0:v]eq=contrast=1.06:saturation=1.08:brightness=0.006,unsharp=5:5:0.4,${CH}[v]" \
 -map "[v]" -map 1:a -shortest -c:v libx264 -preset slow -crf 23 -maxrate 8M -bufsize 16M \
 -pix_fmt yuv420p -profile:v high -level 4.1 -c:a aac -b:a 128k -movflags +faststart "$OUT"
echo "=== 完成 ==="; ls -la "$OUT"
