# リール制作の手順書

インスタのリールをffmpegで組むための、環境・設定・決めごとを全部ここに置いています。
**作業環境（クラウドのコンテナ）は放置すると作り直されて中身が消えるので、
新しいセッションはまずこのファイルを読んでください。** ゼロからやり直さずに済みます。

消えるもの：アップロードされた動画・写真、作業ファイル、インストールしたソフト。
残るもの：このリポジトリ、会話履歴、Artifact、お渡し済みの完成品。

---

## 1. 環境をつくり直す

コンテナが新しくなっていると `ffmpeg` も日本語フォントも入っていません。最初にこれを実行します。

```bash
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq ffmpeg fonts-noto-cjk
```

フォントの場所（インストール後にここにできます）

| 用途 | パス |
|---|---|
| リールのテロップ（ゴシック太） | `/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc` |
| 本文用ゴシック | `/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc` |
| 大学アカウント用カルーセル（明朝） | `/usr/share/fonts/opentype/noto/NotoSerifCJK-Bold.ttc` |

動画は毎回ご本人に再送していただく必要があります（リポジトリには置きません。容量が大きすぎるため）。

---

## 2. 仕様

| 項目 | 値 |
|---|---|
| 解像度 | 1080 × 1920 |
| フレームレート | 30fps |
| 長さ | 20〜25秒（テロップ9〜12枚） |
| コーデック | H.264 high@4.1 / yuv420p / +faststart |
| 音声 | 無音（`anullsrc` でAACトラックを1本入れる。無音声だと弾かれることがある） |
| **アップロード上限** | **30MB** |

30MBの目安：1080p/30fpsで約1.1MB/秒。**25秒で約21MB**。`-crf 23 -maxrate 8M` なら25秒まで安全、
それ以上長いときは `-crf 24 -maxrate 7M` に落とします。

カルーセルは 1080 × 1350。

---

## 3. 作り方

1本につきスクリプトを2つ作ります。分けておくと、テロップの直しだけを何度でもやり直せます。

- `build.sh` … 元動画から各カットを切り出して、つなげて `base*.mp4` を作る
- `telop.sh` … `base*.mp4` にテロップを焼いて書き出す

### build.sh の中身

```bash
# 動画から1カット切り出す
#  $1=元動画 $2=開始秒 $3=長さ $4=スロー倍率 $5=出力
mvx () { ffmpeg -y -v error -i "$1" -an \
  -vf "trim=start=$2:duration=$3,setpts=PTS-STARTPTS,scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setpts=$4*PTS,fps=30,setsar=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$5"; }

# 静止画から1カット作る（ゆっくり寄る／引く）
#  $1=画像 $2=長さ $3=出力 $4=開始ズーム $5=終了ズーム
pk () { NN=$(python3 -c "print(int($2*30))")
  ffmpeg -y -v error -loop 1 -t "$2" -i "$1" \
   -vf "scale=1620:2880:force_original_aspect_ratio=increase,crop=1620:2880,fps=30,zoompan=z='$4+($5-$4)*on/$NN':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,setsar=1" \
   -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$3"; }

# 1枚の写真から別々の場所を切り出したいとき
#  $2 に crop の指定を入れる 例 "iw*0.30:ih*0.71:iw*0.02:ih*0.20"
pkc () { NN=$(python3 -c "print(int(2.30*30))")
  ffmpeg -y -v error -loop 1 -t 2.30 -i "$1" \
   -vf "crop=$2,scale=1620:2880,fps=30,zoompan=z='$4+($5-$4)*on/$NN':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,setsar=1" \
   -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$3"; }
```

つなげる（`concat` demuxer。再エンコードしないので速い）

```bash
cd $SP/segXX
: > list.txt; for i in $(seq 1 12); do echo "file 'k$i.mp4'" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy $SP/baseXX.mp4
```

**カットの秒数の決め方**：テロップ1枚あたり約2.07秒。元動画1.28秒を `setpts=1.6016*PTS` で
引き伸ばすとちょうど2.07秒になります。12カットで24.8秒。

### telop.sh の中身

日本語はシェルのエスケープで壊れるので、**必ず `textfile=` で外部ファイルから読ませます**。
`text=` に直接書いてはいけません。

```bash
printf 'この暑いのに\nなぜ黒を着るのですか' > $D/1.txt

ST="fontfile=$FT:fontcolor=white:box=1:boxcolor=black@0.58:boxborderw=26:shadowcolor=black@0.5:shadowx=2:shadowy=2:line_spacing=18:x=(w-tw)/2"

# 中央（標準）
d  () { echo "drawtext=${ST}:textfile=$D/$1.txt:fontsize=$4:y=(h-th)/2:enable='between(t,$2,$3)'"; }
# 顔にかかるカット用に下げる  $5=下げ幅px
dy () { echo "drawtext=${ST}:textfile=$D/$1.txt:fontsize=$4:y=(h-th)/2+$5:enable='between(t,$2,$3)'"; }
```

最後の書き出し

```bash
ffmpeg -y -v error -i $SP/baseXX.mp4 -f lavfi -i anullsrc=r=44100:cl=stereo \
 -filter_complex "[0:v]eq=contrast=1.06:saturation=1.08:brightness=0.006,unsharp=5:5:0.4,${CH}[v]" \
 -map "[v]" -map 1:a -shortest -c:v libx264 -preset slow -crf 23 -maxrate 8M -bufsize 16M \
 -pix_fmt yuv420p -profile:v high -level 4.1 -c:a aac -b:a 128k -movflags +faststart "$OUT"
```

---

## 4. 作業中の確認

**元動画の中身を目で見ないままカットを割り当てないこと。** ファイル名では判断できません。
過去に2回、別の場面を取り違えて作り直しています。

```bash
# 元動画の中身を一覧で見る
ffmpeg -y -v error -i 元.mov -vf "fps=1,scale=270:-1,tile=5x3" -frames:v 1 確認.jpg

# 縦に切ったときどう見えるか＋テロップ帯が顔にかからないか
ffmpeg -y -v error -ss 5.0 -i 元.mov -vframes 1 \
 -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,drawbox=x=0:y=(1920-260)/2:w=1080:h=260:color=red@0.4:t=fill,scale=250:444" 確認2.jpg

# 完成後、全テロップを一覧で確認（カット長2.07秒の場合）
ffmpeg -y -v error -i 完成.mp4 -vf "fps=1/2.07,scale=250:444,tile=6x2" -frames:v 1 最終確認.jpg
```

同じ動画が二重にアップロードされることがあります。作業前に確認します。

```bash
md5sum /root/.claude/uploads/*/*.mov | sort
```

---

## 5. 決めごと（ご本人の指示。変更があるまで守ります）

**内容**

- **スタイリストではありません。** 着こなしの助言はしない。
  「どう着るか」ではなく「なぜその社会はそう着るのか」を扱う。
  差別化は**ファッション心理学と比較文化**。
- **表紙は問いか言い切り。** 「行ってきました」「訪ねました」という報告型は伸びません
  （尾州2,107／ソウル2,122）。読み手の予想を打ち消す形が伸びます
  （旅行にパンツを〜やめました 172,000／なぜ黒を着るのですか 86,569）。
- 型は **観察 → 反証つぶし → 仮説 → 事例 → 問い**。最後は読み手に返す。
- 優劣の話にしない。「日本は遅れている」と読まれる書き方は荒れます。
- 体型を否定しない。「太さを隠す」ではなく「細く見える」（色の性質の話にする）。
- 人種でまとめない。
- 海外のことは**ご本人の観察として**書く（「見かけませんでした」「見た売り場は」）。
  一般論として断定しない。
- **事実を作らない。** ご本人の観察・経歴・数字を推測で埋めない。
  分からなければ確認する。

**見た目**

- **テロップは中央揃え**（`x=(w-tw)/2`）。顔にかかるときだけ `dy` で下げる。
- **ご本人の顔はOK。他の人の顔は絶対に出さない。** 店内のポスター、教室、
  ショーウィンドウの人物も含みます。過去に4回混入して直しています。
- 店名・ブランド名は写さない。
- **前に使った動画は使わない。** 同じような画も避ける。
- 全身が家の前で写っているカットは使わない。
- 締めのカットで顔を大きくしすぎない（半身くらい）。

**キャプション**

- **ハッシュタグは2個。** 基本は `#ファッション心理学` ＋ その回の主題（`#比較文化` など）。
- 「教えてくださってありがとうございました」のような締めは入れない。
- 押し売りをしない。

---

## 6. 数字（2026年8月30日時点・検証済み）

リール・キャプション・LINE・勉強会、**すべてこの一組で統一します**。食い違うと信用に関わります。

| | |
|---|---|
| 17本 | 7/22 — 8/29 |
| 合計 660,069回 | 「66万回」 |
| 10万回超え | 3本 |
| 最高 172,000 | 「旅行にパンツを持っていくの、やめました」8/3 |
| 最低 2,122 | 「6月に、ソウルを訪ねました」8/25 |
| 86,569 | 「この暑いのに、なぜ黒を着るのですか」8/29投稿 |

黒を扱った2本がどちらも上位（108,000／86,569）。
**当たったテーマは時間をおいて何度でも使えます。**

グリッド画面から拾った「42.6万」「2.6万」は使わないでください。上の一覧が正です。

---

## 7. 関連する場所

- 9月のリール設計（カレンダー・シナリオ10本・素材リスト）
  https://claude.ai/code/artifact/3aeb81cf-90d9-4cf2-a42a-65478a94b68e
- 海外リサーチ×AIリール勉強会（LINE6通・ストーリー・個別相談への動線）
  https://claude.ai/code/artifact/31bf47fc-7401-4880-9c4c-a1e0d2820822
- 事業と経歴の前提 → リポジトリ直下の `CLAUDE.md`
- 素材の対応表 → `reels/素材台帳.md`
