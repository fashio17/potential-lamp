/**
 * ファッション起業 7つのステップ ― セミナースライド生成スクリプト
 *
 *   node build_slides.js
 *
 * 出力: ファッション起業7つのステップ.pptx （全22枚 / 16:9 ワイド）
 */

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5 inch
pres.author = "ファッション起業セミナー";
pres.title = "ファッション起業 7つのステップ";

/* ---------- パレット（Berry & Cream） ---------- */
const BERRY = "6D2E46";
const BERRY_DK = "4E1F31";
const ROSE = "A26769";
const ROSE_LT = "D9B9BC";
const CREAM = "ECE2D0";
const CREAM_LT = "F7F2E9";
const INK = "2B2B2B";
const MUTED = "7C6A6E";
const WHITE = "FFFFFF";
const PANEL = "F6F2F1";

/* ---------- タイポグラフィ ---------- */
const HEAD = "Yu Mincho"; // 見出し（明朝でエディトリアルな印象）
const BODY = "Yu Gothic"; // 本文

const W = 13.333;
const H = 7.5;
const M = 0.75; // 左右マージン
const CW = W - M * 2; // コンテンツ幅

/* ---------- ヘルパー ---------- */

function shadow() {
  return { type: "outer", color: "8A6A70", blur: 10, offset: 2, angle: 90, opacity: 0.18 };
}

/** 白背景・コンテンツスライドの見出し */
function titleBlock(slide, title, lead) {
  slide.addText(title, {
    x: M, y: 0.42, w: CW, h: 0.72,
    fontFace: HEAD, fontSize: 32, bold: true, color: BERRY, margin: 0, valign: "middle",
  });
  if (lead) {
    slide.addText(lead, {
      x: M, y: 1.16, w: CW, h: 0.42,
      fontFace: BODY, fontSize: 14, color: MUTED, margin: 0, valign: "middle",
    });
  }
}

/** モチーフ：数字入りの円 */
function numCircle(slide, x, y, d, n, fill, txt, size) {
  slide.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: fill } });
  slide.addText(String(n), {
    x, y, w: d, h: d, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: size, bold: true, color: txt, margin: 0,
  });
}

/** カード（角丸パネル） */
function card(slide, x, y, w, h, fill) {
  slide.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.08,
    fill: { color: fill || PANEL },
    shadow: shadow(),
  });
}

/** セクション扉スライド */
function sectionSlide(n, title, lead, notes) {
  const s = pres.addSlide();
  s.background = { color: BERRY };
  numCircle(s, 1.15, 2.55, 2.0, n, CREAM, BERRY, 88);
  s.addText(`STEP ${n}`, {
    x: 3.9, y: 2.5, w: 8.4, h: 0.4,
    fontFace: BODY, fontSize: 14, bold: true, color: ROSE_LT, charSpacing: 4, margin: 0, valign: "middle",
  });
  s.addText(title, {
    x: 3.9, y: 2.95, w: 8.4, h: 1.0,
    fontFace: HEAD, fontSize: 40, bold: true, color: WHITE, margin: 0, valign: "middle",
  });
  s.addText(lead, {
    x: 3.9, y: 4.05, w: 8.4, h: 0.8,
    fontFace: BODY, fontSize: 15, color: CREAM, margin: 0, valign: "top", lineSpacing: 24,
  });
  s.addNotes(notes);
  return s;
}

/* =========================================================
   1. 表紙
   ========================================================= */
{
  const s = pres.addSlide();
  s.background = { color: BERRY };

  // モチーフ：大きな「7」
  s.addShape(pres.ShapeType.ellipse, { x: 8.55, y: 1.55, w: 4.0, h: 4.0, fill: { color: BERRY_DK } });
  s.addShape(pres.ShapeType.ellipse, {
    x: 8.55, y: 1.55, w: 4.0, h: 4.0, fill: { color: BERRY, transparency: 100 },
    line: { color: CREAM, width: 1.25 },
  });
  s.addText("7", {
    x: 8.55, y: 1.55, w: 4.0, h: 4.0, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 150, bold: true, color: CREAM, margin: 0,
  });

  s.addText("FASHION BUSINESS SEMINAR", {
    x: M, y: 1.85, w: 7.4, h: 0.35,
    fontFace: BODY, fontSize: 12, bold: true, color: ROSE_LT, charSpacing: 5, margin: 0, valign: "middle",
  });
  s.addText("ファッション起業", {
    x: M, y: 2.3, w: 7.4, h: 0.85,
    fontFace: HEAD, fontSize: 40, color: WHITE, margin: 0, valign: "middle",
  });
  s.addText("7つのステップ", {
    x: M, y: 3.1, w: 7.4, h: 1.05,
    fontFace: HEAD, fontSize: 54, bold: true, color: WHITE, margin: 0, valign: "middle",
  });
  s.addText("「好き」を続く事業に変える設計図", {
    x: M, y: 4.3, w: 7.4, h: 0.45,
    fontFace: BODY, fontSize: 18, color: CREAM, margin: 0, valign: "middle",
  });
  s.addText("60分セミナー ／ 全7ステップ", {
    x: M, y: 5.35, w: 7.4, h: 0.35,
    fontFace: BODY, fontSize: 12, color: ROSE_LT, charSpacing: 2, margin: 0, valign: "middle",
  });

  s.addNotes(
    "今日は60分。テーマはファッション起業7つのステップ。\n" +
    "冒頭の問いかけ：「いつか自分のブランドを」と思ってから何年経ちましたか。\n" +
    "足りなかったのは情熱ではなく順番。今日はその順番を7つに整理して渡す。"
  );
}

/* =========================================================
   2. 今日のゴール
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "今日のゴール", "60分後、この3つを持ち帰っていただきます");

  const goals = [
    ["地図を持つ", "ファッションビジネスの全体像を、7つのステップとして把握する"],
    ["現在地を知る", "その地図の上で、自分が今どこにいるかを特定する"],
    ["次の一歩を決める", "今日から2週間でやることを、たった1つだけ決める"],
  ];
  const cw = 3.75, gap = 0.42;
  goals.forEach((g, i) => {
    const x = M + i * (cw + gap);
    card(s, x, 1.95, cw, 2.75, PANEL);
    numCircle(s, x + 0.42, 2.32, 0.78, i + 1, BERRY, CREAM, 26);
    s.addText(g[0], {
      x: x + 0.42, y: 3.28, w: cw - 0.84, h: 0.45,
      fontFace: HEAD, fontSize: 21, bold: true, color: BERRY, margin: 0, valign: "middle",
    });
    s.addText(g[1], {
      x: x + 0.42, y: 3.78, w: cw - 0.84, h: 0.85,
      fontFace: BODY, fontSize: 13.5, color: INK, margin: 0, valign: "top", lineSpacing: 22,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 5.1, w: CW, h: 1.15, rectRadius: 0.08, fill: { color: CREAM_LT },
  });
  s.addText([
    { text: "今日のゴールではないこと　", options: { bold: true, color: BERRY } },
    { text: "7つ全部を今日中に終わらせること。一気にやろうとして固まるのが、最も多い詰まり方です。", options: { color: INK } },
  ], {
    x: M + 0.45, y: 5.1, w: CW - 0.9, h: 1.15,
    fontFace: BODY, fontSize: 14, margin: 0, valign: "middle", lineSpacing: 22,
  });

  s.addNotes(
    "ゴールは3つ：全体像を持つ／現在地を知る／次の一歩を1つ決める。\n" +
    "ゴールではないこと＝7つ全部を今日やること。期待値を先に合わせる。"
  );
}

/* =========================================================
   3. 7ステップの全体像
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "7ステップの全体像", "順番には意味があります。そして、一度きりではなく何周も回すものです");

  const steps = [
    ["コンセプト設計", "誰に・何を・なぜ"],
    ["市場と顧客の\nリサーチ", "3C ＋ ポジション"],
    ["商品企画と\nラインナップ", "1型から始める"],
    ["生産と仕入れ", "ロットとリスク"],
    ["価格設計と\n収支計画", "逆算で決める"],
    ["販売チャネル", "誰が客を連れるか"],
    ["ブランディング\nと集客", "段階別に語る"],
  ];

  const cw = 1.68, gap = 0.13;
  const total = cw * 7 + gap * 6;
  const startX = (W - total) / 2;

  steps.forEach((st, i) => {
    const x = startX + i * (cw + gap);
    card(s, x, 2.05, cw, 2.75, i % 2 === 0 ? PANEL : CREAM_LT);
    numCircle(s, x + cw / 2 - 0.32, 2.32, 0.64, i + 1, BERRY, CREAM, 22);
    s.addText(st[0], {
      x: x + 0.1, y: 3.1, w: cw - 0.2, h: 0.85,
      fontFace: BODY, fontSize: 13, bold: true, color: INK, align: "center", margin: 0, valign: "top", lineSpacing: 18,
    });
    s.addText(st[1], {
      x: x + 0.1, y: 4.1, w: cw - 0.2, h: 0.55,
      fontFace: BODY, fontSize: 10.5, color: MUTED, align: "center", margin: 0, valign: "top", lineSpacing: 15,
    });
    if (i < 6) {
      s.addShape(pres.ShapeType.triangle, {
        x: x + cw + 0.015, y: 2.57, w: 0.1, h: 0.14, rotate: 90, fill: { color: ROSE },
      });
    }
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 5.4, w: CW, h: 1.0, rectRadius: 0.08, fill: { color: BERRY },
  });
  s.addText("1周目は小さく、粗くていい。売ってみて分かったことを持って、またSTEP1へ戻る。この一周が速い人ほど、ブランドは早く形になります。", {
    x: M + 0.45, y: 5.4, w: CW - 0.9, h: 1.0,
    fontFace: BODY, fontSize: 14, color: CREAM, margin: 0, valign: "middle",
  });

  s.addNotes(
    "今日の地図。順番の意味：価格は生産方法が決まらないと計算できない。\n" +
    "7つは一度きりではなく回すもの。以降、各扉で「7つのうち何番目か」を必ず言う。"
  );
}

/* =========================================================
   4. つまずきの3パターン
   ========================================================= */
{
  const s = pres.addSlide();
  s.background = { color: CREAM };
  s.addText("よくあるつまずき、3パターン", {
    x: M, y: 0.42, w: CW, h: 0.72,
    fontFace: HEAD, fontSize: 32, bold: true, color: BERRY, margin: 0, valign: "middle",
  });
  s.addText("今日の7ステップは、この3つを避けるための順番でもあります", {
    x: M, y: 1.16, w: CW, h: 0.42,
    fontFace: BODY, fontSize: 14, color: MUTED, margin: 0, valign: "middle",
  });

  const traps = [
    ["作ってから、売り先を考える", "先にサンプルを作り込み、在庫を抱えてから売り場を探す。売り先が決まっていないと、作るべき枚数も決まりません。"],
    ["全員に好かれようとする", "「幅広い年齢層に、シンプルで上質な服」。誰の顔も浮かばない説明は、SNSでも店頭でも選ばれません。"],
    ["数字を後回しにする", "原価・売値・経費の関係を見ないまま走ると、「売れているのにお金が残らない」という一番つらい状態になります。"],
  ];
  traps.forEach((t, i) => {
    const y = 1.9 + i * 1.55;
    s.addShape(pres.ShapeType.roundRect, {
      x: M, y, w: CW, h: 1.35, rectRadius: 0.08, fill: { color: WHITE },
    });
    numCircle(s, M + 0.4, y + 0.36, 0.62, i + 1, ROSE, WHITE, 21);
    s.addText(t[0], {
      x: M + 1.25, y: y + 0.18, w: CW - 1.7, h: 0.45,
      fontFace: BODY, fontSize: 18, bold: true, color: BERRY, margin: 0, valign: "middle",
    });
    s.addText(t[1], {
      x: M + 1.25, y: y + 0.66, w: CW - 1.7, h: 0.55,
      fontFace: BODY, fontSize: 13, color: INK, margin: 0, valign: "top", lineSpacing: 19,
    });
  });

  s.addText("心当たりがあっても大丈夫。3つとも、順番で解けます。", {
    x: M, y: 6.6, w: CW, h: 0.4,
    fontFace: BODY, fontSize: 14, italic: true, color: BERRY, margin: 0, valign: "middle",
  });

  s.addNotes(
    "共感パート。自分の失敗談を30秒以内で1つ挟むと効果的。\n" +
    "時間が押しているときは、このスライドを最初に削る。"
  );
}

/* =========================================================
   5-6. STEP1 コンセプト設計
   ========================================================= */
sectionSlide(1, "コンセプト設計",
  "すべての土台。ここが言葉になっていないと、デザインを何枚描いても迷い続けます。",
  "7つのうちの1番目。すべての土台。");

{
  const s = pres.addSlide();
  titleBlock(s, "コンセプトは、3つの問いで決まる", "難しく考えない。答えるのはこの3つだけです");

  const q = [
    ["誰に", "Who", "年齢や性別で止めない。「週3で在宅勤務、急な打ち合わせにもそのまま出たい30代」。服ではなく、着る場面まで降ろす。"],
    ["何を", "What", "その人の、どんな不便を解決するのか。「楽なのにきちんと見えない」。ここが埋まると仕様が決まる。"],
    ["なぜ私が", "Why", "同じ服は世の中にある。それでもあなたから買う理由。能力自慢ではなく、お客さまが安心する材料。"],
  ];
  const cw = 3.75, gap = 0.42;
  q.forEach((item, i) => {
    const x = M + i * (cw + gap);
    card(s, x, 1.9, cw, 2.75, PANEL);
    s.addText(item[1], {
      x: x + 0.42, y: 2.12, w: cw - 0.84, h: 0.3,
      fontFace: BODY, fontSize: 11, bold: true, color: ROSE, charSpacing: 3, margin: 0, valign: "middle",
    });
    s.addText(item[0], {
      x: x + 0.42, y: 2.45, w: cw - 0.84, h: 0.55,
      fontFace: HEAD, fontSize: 26, bold: true, color: BERRY, margin: 0, valign: "middle",
    });
    s.addText(item[2], {
      x: x + 0.42, y: 3.1, w: cw - 0.84, h: 1.35,
      fontFace: BODY, fontSize: 13, color: INK, margin: 0, valign: "top", lineSpacing: 20,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 5.0, w: CW, h: 1.65, rectRadius: 0.08, fill: { color: BERRY },
  });
  s.addText("3つをつなぐと、こう言えます", {
    x: M + 0.5, y: 5.2, w: CW - 1.0, h: 0.35,
    fontFace: BODY, fontSize: 12, color: ROSE_LT, charSpacing: 2, margin: 0, valign: "middle",
  });
  s.addText("「在宅と外出が半々の30代に、洗えてシワにならないジャケットを、生産背景まで説明できる状態で届ける。」", {
    x: M + 0.5, y: 5.6, w: CW - 1.0, h: 0.85,
    fontFace: HEAD, fontSize: 20, bold: true, color: WHITE, margin: 0, valign: "middle",
  });

  s.addNotes(
    "Who／What／Why の3問。Whoは「着る場面」まで降ろすのがコツ。\n" +
    "★ここで1分の記入タイム。ワークシートのWho/What/Whyを鉛筆で埋めてもらう。\n" +
    "オンラインならチャットに1人1行で投稿してもらう。"
  );
}

/* =========================================================
   7-8. STEP2 市場と顧客のリサーチ
   ========================================================= */
sectionSlide(2, "市場と顧客のリサーチ",
  "STEP1で書いたコンセプトが、ひとりよがりになっていないかを確かめる工程です。",
  "7つのうちの2番目。コンセプトの検証。");

{
  const s = pres.addSlide();
  titleBlock(s, "3つを見て、1つの「空き」を見つける", "レポートを読むことではなく、意思決定のための行動です");

  const three = [
    ["顧客", "5人に話を聞く。聞くのは「買いますか」ではなく過去。「最近、服で失敗した買い物は？」"],
    ["競合", "同価格帯を10ブランド。価格・素材・サイズ展開・発売ペース、そして「ここが惜しい」の声。"],
    ["自社", "使える時間・資金・頼れる人。ここを無視した計画は3か月で必ず止まります。"],
  ];
  three.forEach((t, i) => {
    const y = 1.95 + i * 1.42;
    s.addShape(pres.ShapeType.roundRect, {
      x: M, y, w: 6.55, h: 1.22, rectRadius: 0.08, fill: { color: PANEL },
    });
    numCircle(s, M + 0.32, y + 0.31, 0.6, i + 1, BERRY, CREAM, 20);
    s.addText(t[0], {
      x: M + 1.08, y: y + 0.14, w: 5.2, h: 0.42,
      fontFace: HEAD, fontSize: 19, bold: true, color: BERRY, margin: 0, valign: "middle",
    });
    s.addText(t[1], {
      x: M + 1.08, y: y + 0.56, w: 5.25, h: 0.6,
      fontFace: BODY, fontSize: 12.5, color: INK, margin: 0, valign: "top", lineSpacing: 18,
    });
  });

  // ポジショニングマップ
  const mx = 7.95, my = 2.05, ms = 3.9;
  s.addText("ポジショニングマップ", {
    x: mx, y: 1.62, w: ms, h: 0.35,
    fontFace: BODY, fontSize: 13, bold: true, color: BERRY, margin: 0, valign: "middle",
  });
  s.addShape(pres.ShapeType.rect, { x: mx, y: my, w: ms, h: ms, fill: { color: PANEL } });
  s.addShape(pres.ShapeType.line, {
    x: mx, y: my + ms / 2, w: ms, h: 0, line: { color: ROSE_LT, width: 1 },
  });
  s.addShape(pres.ShapeType.line, {
    x: mx + ms / 2, y: my, w: 0, h: ms, line: { color: ROSE_LT, width: 1 },
  });
  const dots = [[0.8, 0.75], [1.3, 1.45], [2.45, 0.9], [3.05, 1.6], [0.95, 2.95], [2.05, 2.55], [3.2, 3.15]];
  dots.forEach((d) => {
    s.addShape(pres.ShapeType.ellipse, {
      x: mx + d[0] - 0.09, y: my + d[1] - 0.09, w: 0.18, h: 0.18, fill: { color: ROSE },
    });
  });
  s.addShape(pres.ShapeType.ellipse, {
    x: mx + 2.55 - 0.2, y: my + 2.15 - 0.2, w: 0.4, h: 0.4,
    fill: { color: BERRY }, line: { color: WHITE, width: 1.5 },
  });
  s.addText("空き", {
    x: mx + 2.55 + 0.28, y: my + 2.15 - 0.16, w: 0.9, h: 0.32,
    fontFace: BODY, fontSize: 11, bold: true, color: BERRY, margin: 0, valign: "middle",
  });
  s.addText("高価格", { x: mx, y: my + 0.04, w: ms, h: 0.28, fontFace: BODY, fontSize: 10, color: MUTED, align: "center", margin: 0, valign: "middle" });
  s.addText("低価格", { x: mx, y: my + ms - 0.32, w: ms, h: 0.28, fontFace: BODY, fontSize: 10, color: MUTED, align: "center", margin: 0, valign: "middle" });
  s.addText("← かっちり", { x: mx, y: my + ms + 0.06, w: ms / 2, h: 0.28, fontFace: BODY, fontSize: 10, color: MUTED, align: "left", margin: 0, valign: "middle" });
  s.addText("リラックス →", { x: mx + ms / 2, y: my + ms + 0.06, w: ms / 2, h: 0.28, fontFace: BODY, fontSize: 10, color: MUTED, align: "right", margin: 0, valign: "middle" });
  s.addText("人が集まる場所ではなく、自分のコンセプトを置ける空きを探す。", {
    x: mx, y: my + ms + 0.44, w: ms + 0.6, h: 0.5,
    fontFace: BODY, fontSize: 11.5, color: INK, margin: 0, valign: "top", lineSpacing: 16,
  });

  s.addNotes(
    "顧客ヒアリングは「買いますか」ではなく過去の行動を聞く。\n" +
    "競合10ブランドのレビューの「惜しい」がそのまま仕様になる。\n" +
    "空きがなければ軸を変えるか、STEP1に戻る。"
  );
}

/* =========================================================
   9-10. STEP3 商品企画とラインナップ設計
   ========================================================= */
sectionSlide(3, "商品企画とラインナップ設計",
  "ここでようやくデザインの話。7つのうちの3番目です。",
  "7つのうちの3番目。デザインは3番目に来る、という点を強調。");

{
  const s = pres.addSlide();
  titleBlock(s, "1型で始め、3つの役割で組む", null);

  // 大きな主張
  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 1.62, w: CW, h: 1.5, rectRadius: 0.08, fill: { color: CREAM_LT },
  });
  numCircle(s, M + 0.45, 1.92, 0.9, 1, BERRY, CREAM, 34);
  s.addText("最初は1型でいい。むしろ1型を強くおすすめします", {
    x: M + 1.62, y: 1.8, w: CW - 2.1, h: 0.5,
    fontFace: HEAD, fontSize: 23, bold: true, color: BERRY, margin: 0, valign: "middle",
  });
  s.addText("10型を1枚ずつより、1型を色違い・サイズ違いで持つほうが、在庫も撮影も説明も軽い。そして売れなかったとき、原因が分かります。", {
    x: M + 1.62, y: 2.34, w: CW - 2.1, h: 0.6,
    fontFace: BODY, fontSize: 13.5, color: INK, margin: 0, valign: "top", lineSpacing: 19,
  });

  const roles = [
    ["主力商品", "ブランドの顔。いちばん語れるもの。利益もここで取る。"],
    ["集客商品", "手に取りやすい価格で、初めての人が試せるもの。担当は「出会いの数」。"],
    ["利益商品", "買ってくれた人が2回目に買うもの。色違い、セット販売。"],
  ];
  const cw = 3.75, gap = 0.42;
  roles.forEach((r, i) => {
    const x = M + i * (cw + gap);
    card(s, x, 3.35, cw, 1.85, PANEL);
    s.addText(r[0], {
      x: x + 0.4, y: 3.52, w: cw - 0.8, h: 0.5,
      fontFace: HEAD, fontSize: 22, bold: true, color: BERRY, margin: 0, valign: "middle",
    });
    s.addText(r[1], {
      x: x + 0.4, y: 4.06, w: cw - 0.8, h: 1.0,
      fontFace: BODY, fontSize: 13, color: INK, margin: 0, valign: "top", lineSpacing: 20,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 5.55, w: CW, h: 1.0, rectRadius: 0.08, fill: { color: BERRY },
  });
  s.addText([
    { text: "サンプルは必ず自分以外に着せる。　", options: { bold: true, color: WHITE } },
    { text: "自分の体型基準のサイズは、驚くほど狭いところにしか合いません。最低3人、できれば5人。", options: { color: CREAM } },
  ], {
    x: M + 0.45, y: 5.55, w: CW - 0.9, h: 1.0,
    fontFace: BODY, fontSize: 14, margin: 0, valign: "middle",
  });

  s.addNotes(
    "1型スタートの理由＝売れなかったときに原因が分かる。\n" +
    "3つの役割は2周目以降の話。主力だけのブランドは新規を探し続けることになる。\n" +
    "サイズ確認は最低3人、できれば5人。"
  );
}

/* =========================================================
   11-12. STEP4 生産と仕入れ
   ========================================================= */
sectionSlide(4, "生産と仕入れ",
  "多くの方がいちばん不安に感じるところ。選ぶ基準はひとつだけです。",
  "7つのうちの4番目。「OEM＝正解」の思い込みを外す。");

{
  const s = pres.addSlide();
  titleBlock(s, "4つの作り方と、その分かれ道", "選ぶ基準は「売れる確信がどれくらいあるか」、それだけです");

  const head = (t) => ({ text: t, options: { bold: true, color: CREAM, fill: { color: BERRY }, fontSize: 12.5 } });
  const bodyRow = (cells, tint) =>
    cells.map((c, i) => ({
      text: c,
      options: { color: INK, fill: { color: tint }, bold: i === 0, align: i > 0 && i < 4 ? "center" : "left" },
    }));

  const rows = [
    [head("作り方"), head("ロット"), head("初期費用"), head("自由度"), head("向いている段階")],
    bodyRow(["ハンドメイド・自社縫製", "1枚〜", "小", "高", "テスト販売に最適。ただし自分の時間が原価"], WHITE),
    bodyRow(["既製品の仕入れ（セレクト）", "小〜", "中", "低", "生産の悩みなし。粗利は薄く競合も多い"], PANEL),
    bodyRow(["ODM（既存の型を使う）", "小〜中", "中", "中", "立ち上げの一歩目として現実的"], WHITE),
    bodyRow(["OEM（一から作る）", "中〜大", "大", "高", "確信が持ててから。理想の形が作れる"], PANEL),
  ];

  s.addTable(rows, {
    x: M, y: 1.85, w: CW, colW: [3.3, 1.25, 1.15, 1.0, 5.13],
    rowH: [0.42, 0.6, 0.6, 0.6, 0.6],
    fontFace: BODY, fontSize: 13, color: INK, valign: "middle",
    border: { type: "solid", color: "E4DAD6", pt: 1 },
    margin: [0.05, 0.12, 0.05, 0.12],
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 4.95, w: CW, h: 1.7, rectRadius: 0.08, fill: { color: CREAM_LT },
  });
  s.addText("工場に必ず聞く4つ", {
    x: M + 0.45, y: 5.12, w: 3.0, h: 0.4,
    fontFace: HEAD, fontSize: 18, bold: true, color: BERRY, margin: 0, valign: "middle",
  });
  const asks = ["最小ロット", "単価", "納期", "支払い条件"];
  asks.forEach((a, i) => {
    const x = 4.05 + i * 2.1;
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 5.12, w: 1.9, h: 0.5, rectRadius: 0.1, fill: { color: BERRY },
    });
    s.addText(a, {
      x, y: 5.12, w: 1.9, h: 0.5, align: "center", valign: "middle",
      fontFace: BODY, fontSize: 13, bold: true, color: WHITE, margin: 0,
    });
  });
  s.addText("特に支払い条件。「発注時に何割、納品時に何割」で必要な運転資金がまるで変わります。必ず書面で確認を。", {
    x: M + 0.45, y: 5.78, w: CW - 0.9, h: 0.6,
    fontFace: BODY, fontSize: 13, color: INK, margin: 0, valign: "middle",
  });

  s.addNotes(
    "表は行ごとに指しながら。分かれ道は「売れる確信の度合い」。\n" +
    "確信がない段階でOEM大ロットに行くと、在庫で資金が固定される。\n" +
    "一歩目はハンドメイドかODM、確信が持ててからOEM。"
  );
}

/* =========================================================
   13-14. STEP5 価格設計と収支計画
   ========================================================= */
sectionSlide(5, "価格設計と収支計画",
  "今日いちばん地味で、いちばん効くパートです。",
  "7つのうちの5番目。原価積み上げから逆算思考へ。");

{
  const s = pres.addSlide();
  titleBlock(s, "値段は、原価から決めない", "「原価3,000円だから2倍で6,000円」――これが一番危ない決め方です");

  // 逆算のフロー
  const flow = [
    ["① まず売値", "この人にとって\n妥当な価格を決める", "15,000円"],
    ["② 原価率を置く", "商材と販路から\n無理のない率を", "30%"],
    ["③ 原価が出る", "この範囲で\n作れるかを検証", "4,500円"],
  ];
  const cw = 3.75, gap = 0.42;
  flow.forEach((f, i) => {
    const x = M + i * (cw + gap);
    card(s, x, 1.85, cw, 2.2, i === 2 ? CREAM_LT : PANEL);
    s.addText(f[0], {
      x: x + 0.35, y: 2.02, w: cw - 0.7, h: 0.35,
      fontFace: BODY, fontSize: 12.5, bold: true, color: ROSE, margin: 0, valign: "middle",
    });
    s.addText(f[2], {
      x: x + 0.35, y: 2.38, w: cw - 0.7, h: 0.68,
      fontFace: HEAD, fontSize: 34, bold: true, color: BERRY, margin: 0, valign: "middle",
    });
    s.addText(f[1], {
      x: x + 0.35, y: 3.1, w: cw - 0.7, h: 0.8,
      fontFace: BODY, fontSize: 12.5, color: INK, margin: 0, valign: "top", lineSpacing: 18,
    });
  });

  // 内訳チャート
  s.addText("売値15,000円の内訳（例）", {
    x: M, y: 4.28, w: 5.0, h: 0.38,
    fontFace: BODY, fontSize: 13, bold: true, color: BERRY, margin: 0, valign: "middle",
  });
  s.addChart(pres.ChartType.doughnut, [{
    name: "内訳",
    labels: ["原価 4,500円", "販促・送料・手数料 3,500円", "手元に残る 7,000円"],
    values: [4500, 3500, 7000],
  }], {
    x: M - 0.05, y: 4.62, w: 5.5, h: 2.4,
    chartColors: [BERRY, ROSE, CREAM],
    dataBorder: { pt: 1.5, color: WHITE },
    showLegend: true, legendPos: "r", legendFontFace: BODY, legendFontSize: 11, legendColor: INK,
    showValue: false, showPercent: true, dataLabelColor: WHITE, dataLabelFontFace: BODY,
    dataLabelFontSize: 11, dataLabelFontBold: true,
    holeSize: 45,
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: 6.9, y: 4.28, w: 5.68, h: 1.32, rectRadius: 0.08, fill: { color: BERRY },
  });
  s.addText("損益分岐点", {
    x: 7.25, y: 4.42, w: 5.0, h: 0.35,
    fontFace: BODY, fontSize: 12, bold: true, color: ROSE_LT, charSpacing: 2, margin: 0, valign: "middle",
  });
  s.addText("固定費 ÷ 1枚あたりに残る額 ＝ 最低これだけ売る枚数", {
    x: 7.25, y: 4.8, w: 5.0, h: 0.7,
    fontFace: HEAD, fontSize: 17, bold: true, color: WHITE, margin: 0, valign: "middle",
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: 6.9, y: 5.75, w: 5.68, h: 1.27, rectRadius: 0.08, fill: { color: PANEL },
  });
  s.addText([
    { text: "初期費用と運転資金は分けて持つ。", options: { bold: true, color: BERRY } },
    { text: "\n生産に全部使うと、商品はあるのに広告も撮影もできない状態に。生産と同額程度は「売るための資金」として残す。", options: { color: INK } },
  ], {
    x: 7.25, y: 5.79, w: 5.0, h: 1.19,
    fontFace: BODY, fontSize: 12.5, margin: 0, valign: "middle", lineSpacing: 18,
  });

  s.addNotes(
    "★数値はすべて計算方法を示すための例。実数は自分の商材で置き換えて話す。\n" +
    "粗利＝利益ではない。1枚あたりに最終的に残る額を出す。\n" +
    "★電卓を出してもらい、自分の想定売値×原価率30%を30秒で計算してもらう。"
  );
}

/* =========================================================
   15-16. STEP6 販売チャネルの構築
   ========================================================= */
sectionSlide(6, "販売チャネルの構築",
  "「どこで売るか」は、「お客さまを誰が連れてくるか」で決まります。",
  "7つのうちの6番目。チャネルは集客負担の軸で整理する。");

{
  const s = pres.addSlide();
  titleBlock(s, "誰がお客さまを連れてくるか", "機能ではなく、集客を誰が負担するかで分けると選びやすくなります");

  const ch = [
    ["自社EC", "集客：自分", "手数料が低く、お客さまの情報も自分のもの。ただし作っただけでは誰も来ません。"],
    ["モール・プラットフォーム", "集客：場所", "初日から見てもらえる可能性。代わりに手数料と、常に並ぶ比較対象。"],
    ["ポップアップ・催事", "集客：場所＋自分", "試着の様子、手に取って戻す瞬間、迷って聞かれた質問。数字より濃い情報が得られます。"],
    ["卸・委託", "集客：取引先", "数は動くが掛け率の分だけ利益は下がる。STEP5の計算ができるまでは手を出さない。"],
  ];
  const cw = 6.1, chh = 1.8, gapx = 0.53, gapy = 0.38;
  ch.forEach((c, i) => {
    const x = M + (i % 2) * (cw + gapx);
    const y = 1.9 + Math.floor(i / 2) * (chh + gapy);
    card(s, x, y, cw, chh, i % 2 === 0 ? PANEL : CREAM_LT);
    s.addText(c[0], {
      x: x + 0.4, y: y + 0.2, w: cw - 2.3, h: 0.45,
      fontFace: HEAD, fontSize: 21, bold: true, color: BERRY, margin: 0, valign: "middle",
    });
    s.addShape(pres.ShapeType.roundRect, {
      x: x + cw - 1.85, y: y + 0.24, w: 1.45, h: 0.38, rectRadius: 0.1, fill: { color: BERRY },
    });
    s.addText(c[1], {
      x: x + cw - 1.85, y: y + 0.24, w: 1.45, h: 0.38, align: "center", valign: "middle",
      fontFace: BODY, fontSize: 10.5, bold: true, color: CREAM, margin: 0,
    });
    s.addText(c[2], {
      x: x + 0.4, y: y + 0.76, w: cw - 0.8, h: 0.88,
      fontFace: BODY, fontSize: 13, color: INK, margin: 0, valign: "top", lineSpacing: 20,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 6.15, w: CW, h: 0.85, rectRadius: 0.08, fill: { color: BERRY },
  });
  s.addText("おすすめは、自社ECを「家」として持ちながら、人がいる場所へ出ていく形。最後は自分のECとSNSに戻ってきてもらう。", {
    x: M + 0.45, y: 6.15, w: CW - 0.9, h: 0.85,
    fontFace: BODY, fontSize: 13.5, color: CREAM, margin: 0, valign: "middle",
  });

  s.addNotes(
    "自社ECは集客100%自分。モールは手数料と比較対象。\n" +
    "ポップアップは初期ブランドに特に価値あり（対面の情報）。\n" +
    "卸はSTEP5の原価構造ができるまで手を出さない。"
  );
}

/* =========================================================
   17-18. STEP7 ブランディングと集客
   ========================================================= */
sectionSlide(7, "ブランディングと集客",
  "「SNSを頑張っているのに売れない」の原因は、全員に同じ話をしていることです。",
  "7つのうちの7番目。段階別に話す内容を変える。");

{
  const s = pres.addSlide();
  titleBlock(s, "4つの段階で、話す内容を変える", "お客さまの段階が違えば、聞きたい話も違います");

  const funnel = [
    ["認知", "あなたを知らない人", "ブランドの話をしない。その人が今日役に立つ話をする。\n「洗えるジャケットの見分け方」", 11.8],
    ["興味", "気になっている人", "作り方と背景を見せる。工場でのやりとり、生地を選んだ理由、\n失敗した試作。過程は値段の理由になる", 10.4],
    ["比較", "買おうか迷っている人", "不安を消す。サイズ感、身長別の着比べ、返品交換の条件。\n情緒ではなく事実の提示", 9.0],
    ["購入後", "すでに買った人", "感謝と使い方。お手入れ、合わせ方、新作の先行案内。\nブランドの安定はほぼここで決まる", 7.6],
  ];
  funnel.forEach((f, i) => {
    const y = 1.78 + i * 1.08;
    const w = f[3];
    const x = M;
    s.addShape(pres.ShapeType.roundRect, {
      x, y, w, h: 1.0, rectRadius: 0.06,
      fill: { color: i === 3 ? BERRY : PANEL },
    });
    s.addShape(pres.ShapeType.roundRect, {
      x: x + 0.16, y: y + 0.2, w: 1.15, h: 0.6, rectRadius: 0.1,
      fill: { color: i === 3 ? CREAM : BERRY },
    });
    s.addText(f[0], {
      x: x + 0.16, y: y + 0.2, w: 1.15, h: 0.6, align: "center", valign: "middle",
      fontFace: HEAD, fontSize: 17, bold: true, color: i === 3 ? BERRY : CREAM, margin: 0,
    });
    s.addText(f[1], {
      x: x + 1.48, y: y + 0.06, w: 2.6, h: 0.34,
      fontFace: BODY, fontSize: 11.5, bold: true, color: i === 3 ? ROSE_LT : ROSE, margin: 0, valign: "middle",
    });
    s.addText(f[2], {
      x: x + 1.48, y: y + 0.4, w: w - 1.7, h: 0.54,
      fontFace: BODY, fontSize: 12, color: i === 3 ? CREAM : INK, margin: 0, valign: "top", lineSpacing: 17,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 6.28, w: CW, h: 0.8, rectRadius: 0.08, fill: { color: CREAM_LT },
  });
  s.addText([
    { text: "ブランディング＝ロゴや色の話ではありません。", options: { color: INK } },
    { text: "「誰に、どの段階で、何を言うか」が一貫していること。", options: { bold: true, color: BERRY } },
  ], {
    x: M + 0.45, y: 6.28, w: CW - 0.9, h: 0.8,
    fontFace: BODY, fontSize: 14, margin: 0, valign: "middle",
  });

  s.addNotes(
    "新規1人より、既存の2回目のほうがずっと軽い。購入後を最重視。\n" +
    "認知の段階でブランドの理念を語っても届かない。"
  );
}

/* =========================================================
   19. まとめ
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "まとめ：7つのステップ", "1行ずつ、振り返ります");

  const sum = [
    "コンセプトを、誰に・何を・なぜで決める",
    "市場と顧客を3つの視点で見て、空きを探す",
    "商品は1型から。3つの役割で組む",
    "作り方は、売れる確信の度合いで選ぶ",
    "値段は原価からではなく、逆算で決める",
    "売り場は、誰が客を連れてくるかで選ぶ",
    "集客は、段階ごとに話す内容を変える",
  ];
  sum.forEach((t, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i < 4 ? i : i - 4;
    const x = M + col * 6.63;
    const y = 1.95 + row * 1.02;
    s.addShape(pres.ShapeType.roundRect, {
      x, y, w: 6.1, h: 0.85, rectRadius: 0.06, fill: { color: i % 2 === 0 ? PANEL : CREAM_LT },
    });
    numCircle(s, x + 0.24, y + 0.18, 0.5, i + 1, BERRY, CREAM, 17);
    s.addText(t, {
      x: x + 0.9, y, w: 5.05, h: 0.85,
      fontFace: BODY, fontSize: 13.5, color: INK, margin: 0, valign: "middle",
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M + 6.63, y: 5.01, w: 6.1, h: 1.42, rectRadius: 0.08, fill: { color: BERRY },
  });
  s.addText("デザインが得意な人が勝つのではありません。\n7つを小さく速く、何周も回した人が残ります。", {
    x: M + 7.03, y: 5.01, w: 5.35, h: 1.42,
    fontFace: HEAD, fontSize: 16, bold: true, color: WHITE, margin: 0, valign: "middle", lineSpacing: 30,
  });

  s.addNotes("7つを1行ずつ読み上げて振り返る。記憶に残すパート。");
}

/* =========================================================
   20. 90日ロードマップ
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "90日ロードマップ", "明日から7つ全部は無理です。3か月の目安を置いておきます");

  const phases = [
    ["1〜30日", "調べる", "STEP 1 - 2", ["コンセプトの一文を書く", "想定顧客5人に話を聞く", "競合10ブランドを並べる", "この30日は1円も使わなくていい"]],
    ["31〜60日", "決める", "STEP 3 - 5", ["最初の1型を決める", "作り方を選び、工場に問い合わせる", "原価と1枚あたりの残りを出す", "損益分岐点を計算する"]],
    ["61〜90日", "売る", "STEP 6 - 7", ["売り場を用意する", "段階別の発信を始める", "小さくても実際に売ってみる", "反応を持ってSTEP1へ戻る"]],
  ];
  const cw = 3.7, gap = 0.36;
  phases.forEach((p, i) => {
    const x = M + i * (cw + gap);
    card(s, x, 1.85, cw, 3.4, i === 2 ? CREAM_LT : PANEL);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 1.85, w: cw, h: 0.62, rectRadius: 0.08, fill: { color: BERRY },
    });
    s.addText(p[0], {
      x: x + 0.32, y: 1.85, w: 1.7, h: 0.62,
      fontFace: BODY, fontSize: 14, bold: true, color: CREAM, margin: 0, valign: "middle",
    });
    s.addText(p[2], {
      x: x + cw - 1.85, y: 1.85, w: 1.53, h: 0.62, align: "right",
      fontFace: BODY, fontSize: 11.5, color: ROSE_LT, margin: 0, valign: "middle",
    });
    s.addText(p[1], {
      x: x + 0.32, y: 2.62, w: cw - 0.64, h: 0.55,
      fontFace: HEAD, fontSize: 26, bold: true, color: BERRY, margin: 0, valign: "middle",
    });
    s.addText(p[3].map((t, j) => ({
      text: t,
      options: { bullet: true, breakLine: j !== p[3].length - 1, paraSpaceAfter: 16 },
    })), {
      x: x + 0.32, y: 3.22, w: cw - 0.6, h: 1.95,
      fontFace: BODY, fontSize: 13, color: INK, margin: 0, valign: "top", lineSpacing: 20,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 5.6, w: CW, h: 0.95, rectRadius: 0.08, fill: { color: BERRY },
  });
  s.addText("90日目のゴールは、完璧なブランドではありません。「お客さまからの反応」が手元にあることです。", {
    x: M + 0.45, y: 5.6, w: CW - 0.9, h: 0.95,
    fontFace: BODY, fontSize: 14.5, color: CREAM, margin: 0, valign: "middle",
  });

  s.addNotes("時間が押しているときは、このスライドを2番目に削る。スライド21の宿題は絶対に削らない。");
}

/* =========================================================
   21. 明日からの3つの宿題
   ========================================================= */
{
  const s = pres.addSlide();
  s.background = { color: CREAM };
  s.addText("明日からの宿題", {
    x: M, y: 0.42, w: CW, h: 0.72,
    fontFace: HEAD, fontSize: 32, bold: true, color: BERRY, margin: 0, valign: "middle",
  });
  s.addText("3つ出します。ただし全部やらなくて結構です ―― 1つだけ選んでください", {
    x: M, y: 1.16, w: CW, h: 0.42,
    fontFace: BODY, fontSize: 15, bold: true, color: ROSE, margin: 0, valign: "middle",
  });

  const hw = [
    ["書く", "コンセプトの一文を書く", "「誰に、何を、なぜ自分が」を一文で。鉛筆で構いません。"],
    ["聞く", "5人に買い物の話を聞く", "「買いますか」ではなく「最近の失敗した買い物は？」を聞く。"],
    ["数える", "1枚あたりの残りを計算", "想定売値から、手元にいくら残るかを出す。電卓ひとつでできます。"],
  ];
  const cw = 3.75, gap = 0.42;
  hw.forEach((h, i) => {
    const x = M + i * (cw + gap);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 1.95, w: cw, h: 3.0, rectRadius: 0.08, fill: { color: WHITE }, shadow: shadow(),
    });
    numCircle(s, x + 0.42, 2.3, 0.85, i + 1, BERRY, CREAM, 30);
    s.addText(h[0], {
      x: x + 1.45, y: 2.42, w: cw - 1.85, h: 0.6,
      fontFace: HEAD, fontSize: 24, bold: true, color: ROSE, margin: 0, valign: "middle",
    });
    s.addText(h[1], {
      x: x + 0.42, y: 3.35, w: cw - 0.84, h: 0.85,
      fontFace: HEAD, fontSize: 18, bold: true, color: BERRY, margin: 0, valign: "top", lineSpacing: 26,
    });
    s.addText(h[2], {
      x: x + 0.42, y: 4.15, w: cw - 0.84, h: 0.7,
      fontFace: BODY, fontSize: 12.5, color: INK, margin: 0, valign: "top", lineSpacing: 18,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 5.3, w: CW, h: 1.55, rectRadius: 0.08, fill: { color: BERRY },
  });
  s.addText("選んだら、「いつやるか」まで決める", {
    x: M + 0.5, y: 5.48, w: CW - 1.0, h: 0.5,
    fontFace: HEAD, fontSize: 22, bold: true, color: WHITE, margin: 0, valign: "middle",
  });
  s.addText("「今週中」ではなく「木曜の夜」のように、曜日と時間帯で。今日の60分が情報で終わるか、ブランドの起点になるかは、この1行で決まります。", {
    x: M + 0.5, y: 6.02, w: CW - 1.0, h: 0.65,
    fontFace: BODY, fontSize: 13.5, color: CREAM, margin: 0, valign: "middle",
  });

  s.addNotes(
    "★ここは絶対に急がない。10秒の沈黙を作ってでも選ばせる。\n" +
    "オンラインならチャットに番号を投稿してもらう。"
  );
}

/* =========================================================
   22. クロージング
   ========================================================= */
{
  const s = pres.addSlide();
  s.background = { color: BERRY };

  s.addShape(pres.ShapeType.ellipse, {
    x: 9.35, y: 2.05, w: 3.3, h: 3.3, fill: { color: BERRY, transparency: 100 },
    line: { color: ROSE, width: 1.25 },
  });
  s.addText("7", {
    x: 9.35, y: 2.05, w: 3.3, h: 3.3, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 120, bold: true, color: CREAM, margin: 0,
  });

  s.addText("今日の話は、才能ではなく順番の話でした", {
    x: M, y: 2.3, w: 8.2, h: 0.55,
    fontFace: BODY, fontSize: 16, color: ROSE_LT, margin: 0, valign: "middle",
  });
  s.addText("小さく、速く、\n何周も回した人が残ります。", {
    x: M, y: 2.95, w: 8.2, h: 1.7,
    fontFace: HEAD, fontSize: 38, bold: true, color: WHITE, margin: 0, valign: "middle", lineSpacing: 52,
  });
  s.addText("1周目は粗くていい。むしろ粗いほうがいい。早く回ったぶんだけ、お客さまの声が早く届きます。", {
    x: M, y: 4.75, w: 8.2, h: 0.6,
    fontFace: BODY, fontSize: 14, color: CREAM, margin: 0, valign: "middle",
  });
  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 5.6, w: 3.2, h: 0.7, rectRadius: 0.12, fill: { color: CREAM },
  });
  s.addText("質疑応答", {
    x: M, y: 5.6, w: 3.2, h: 0.7, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 20, bold: true, color: BERRY, margin: 0,
  });

  s.addNotes(
    "質疑が出ない場合は、台本 付録Aの想定質問を自分で読み上げて呼び水にする。\n" +
    "（資金／法人化／デザイン未経験／フォロワー数／在庫）"
  );
}

pres.writeFile({ fileName: "ファッション起業7つのステップ.pptx" }).then((f) => {
  console.log("created:", f);
});
