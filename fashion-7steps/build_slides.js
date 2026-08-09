/**
 * ファッション起業 7つのステップ ― 受講生向け教材スライド 生成スクリプト
 *
 *   node build_slides.js
 *
 * 出力: ファッション起業7つのステップ.pptx （全22枚 / 16:9 ワイド）
 */

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5 inch
pres.author = "Fashion Entrepreneurship Academia";
pres.title = "ファッション起業 7つのステップ";

/* ---------- パレット（上品・知的／くすみピンク × グレージュ） ---------- */
const PLUM = "3E2F38";
const PLUM_DK = "2A1F26";
const ROSE = "C08F97";
const ROSE_DK = "A8737C";
const ROSE_LT = "E3C9CD";
const GREIGE = "EAE3DD";
const GREIGE_LT = "F7F3F0";
const INK = "33292E";
const MUTED = "7C6E73";
const WHITE = "FFFFFF";

const HEAD = "Yu Mincho"; // 見出し（明朝：知性・品格）
const BODY = "Yu Gothic"; // 本文

const W = 13.333;
const M = 0.75;
const CW = W - M * 2;
const KICKER = "Fashion  ×  Psychology  ×  AI";

/* ---------- ヘルパー ---------- */

const shadow = () => ({ type: "outer", color: "9A8890", blur: 10, offset: 2, angle: 90, opacity: 0.16 });

/** コンテンツスライドの見出し（STEPチップつき） */
function titleBlock(s, title, lead, step) {
  if (step) {
    s.addShape(pres.ShapeType.roundRect, {
      x: M, y: 0.32, w: 1.12, h: 0.34, rectRadius: 0.08, fill: { color: ROSE },
    });
    s.addText(`STEP ${step}`, {
      x: M, y: 0.32, w: 1.12, h: 0.34, align: "center", valign: "middle",
      fontFace: BODY, fontSize: 11, bold: true, color: WHITE, margin: 0,
    });
  }
  s.addText(KICKER, {
    x: W - M - 4.2, y: 0.32, w: 4.2, h: 0.34, align: "right", valign: "middle",
    fontFace: BODY, fontSize: 9.5, color: MUTED, charSpacing: 2, margin: 0,
  });
  s.addText(title, {
    x: M, y: 0.78, w: CW, h: 0.72,
    fontFace: HEAD, fontSize: 30, bold: true, color: PLUM, margin: 0, valign: "middle",
  });
  if (lead) {
    s.addText(lead, {
      x: M, y: 1.5, w: CW, h: 0.4,
      fontFace: BODY, fontSize: 13.5, color: MUTED, margin: 0, valign: "middle",
    });
  }
}

/** モチーフ：数字入りの円 */
function numCircle(s, x, y, d, n, fill, txt, size) {
  s.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: fill } });
  s.addText(String(n), {
    x, y, w: d, h: d, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: size, bold: true, color: txt, margin: 0,
  });
}

function card(s, x, y, w, h, fill) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.07, fill: { color: fill || GREIGE_LT }, shadow: shadow(),
  });
}

/** 下部の強調バンド */
function band(s, y, h, text, opts) {
  const o = opts || {};
  s.addShape(pres.ShapeType.roundRect, {
    x: M, y, w: CW, h, rectRadius: 0.07, fill: { color: o.fill || PLUM },
  });
  s.addText(text, {
    x: M + 0.45, y, w: CW - 0.9, h,
    fontFace: BODY, fontSize: o.size || 13.5, color: o.color || GREIGE,
    margin: 0, valign: "middle", lineSpacing: o.lineSpacing || 22,
  });
}

/* =========================================================
   1. 表紙
   ========================================================= */
{
  const s = pres.addSlide();
  s.background = { color: PLUM };

  s.addShape(pres.ShapeType.ellipse, { x: 8.75, y: 1.7, w: 3.7, h: 3.7, fill: { color: PLUM_DK } });
  s.addShape(pres.ShapeType.ellipse, {
    x: 8.75, y: 1.7, w: 3.7, h: 3.7, fill: { color: PLUM, transparency: 100 },
    line: { color: ROSE, width: 1.25 },
  });
  s.addText("7", {
    x: 8.75, y: 1.7, w: 3.7, h: 3.7, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 140, bold: true, color: ROSE_LT, margin: 0,
  });

  s.addText(KICKER, {
    x: M, y: 1.9, w: 7.4, h: 0.34,
    fontFace: BODY, fontSize: 11, color: ROSE_LT, charSpacing: 4, margin: 0, valign: "middle",
  });
  s.addText("ファッション起業", {
    x: M, y: 2.34, w: 7.4, h: 0.8,
    fontFace: HEAD, fontSize: 36, color: WHITE, margin: 0, valign: "middle",
  });
  s.addText("7つのステップ", {
    x: M, y: 3.08, w: 7.4, h: 1.05,
    fontFace: HEAD, fontSize: 52, bold: true, color: WHITE, margin: 0, valign: "middle",
  });
  s.addText("感性と専門性を、選ばれる仕組みに変える", {
    x: M, y: 4.28, w: 7.4, h: 0.45,
    fontFace: BODY, fontSize: 17, color: GREIGE, margin: 0, valign: "middle",
  });
  s.addText("6ヶ月実践講座　全体像の回　／　講義90分 ＋ ワークショップ60分", {
    x: M, y: 5.3, w: 7.4, h: 0.35,
    fontFace: BODY, fontSize: 11.5, color: ROSE_LT, charSpacing: 1, margin: 0, valign: "middle",
  });

  s.addNotes(
    "今日は6ヶ月の全体像を渡す回。\n" +
    "以降の毎回の講義で「これは7つのうち何番目か」と紐づけて説明することを宣言する。"
  );
}

/* =========================================================
   2. この6ヶ月で仕上げる状態
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "この6ヶ月で仕上げる状態", "目指すのは「たくさん学んだ状態」ではありません");

  const goals = [
    ["価値が、言葉になっている", "「なんとなく素敵」ではなく、誰の何をどう変えられるかを言い切れる。"],
    ["価値が、商品になっている", "入口・本命・継続の3層。サービスならメニュー、物販なら商品構成。"],
    ["申込みまで、線になっている", "発信を見た人が次にどこへ行き、何を見て決めるのかがつながっている。"],
  ];
  const cw = 3.75, gap = 0.42;
  goals.forEach((g, i) => {
    const x = M + i * (cw + gap);
    card(s, x, 2.05, cw, 2.85, GREIGE_LT);
    numCircle(s, x + 0.4, 2.4, 0.78, i + 1, PLUM, ROSE_LT, 26);
    s.addText(g[0], {
      x: x + 0.4, y: 3.34, w: cw - 0.8, h: 0.75,
      fontFace: HEAD, fontSize: 19, bold: true, color: PLUM, margin: 0, valign: "top", lineSpacing: 26,
    });
    s.addText(g[1], {
      x: x + 0.4, y: 4.08, w: cw - 0.8, h: 0.75,
      fontFace: BODY, fontSize: 12.5, color: INK, margin: 0, valign: "top", lineSpacing: 19,
    });
  });

  band(s, 5.3, 1.0, "この3つが揃うと、頑張り続けなくても回り始めます。7つのステップは、この3つを作るための順番です。");

  s.addNotes("ゴールを「学んだ状態」ではなく「形になった状態」で定義する。期待値をここで揃える。");
}

/* =========================================================
   3. 大前提（ステートメント／ダーク）
   ========================================================= */
{
  const s = pres.addSlide();
  s.background = { color: PLUM };
  s.addText(KICKER, {
    x: W - M - 4.2, y: 0.32, w: 4.2, h: 0.34, align: "right", valign: "middle",
    fontFace: BODY, fontSize: 9.5, color: ROSE_LT, charSpacing: 2, margin: 0,
  });

  s.addText("この6ヶ月の大前提", {
    x: M, y: 1.35, w: 7.0, h: 0.4,
    fontFace: BODY, fontSize: 12.5, color: ROSE_LT, charSpacing: 3, margin: 0, valign: "middle",
  });
  s.addText("「売れる」は結果。\n「選ばれる」が原因。", {
    x: M, y: 1.9, w: 7.0, h: 1.9,
    fontFace: HEAD, fontSize: 40, bold: true, color: WHITE, margin: 0, valign: "middle", lineSpacing: 62,
  });
  s.addText("売上は結果です。結果を直接いじろうとしても動きません。\n動かすのは原因のほう ―― 選ばれているかどうか、です。", {
    x: M, y: 4.0, w: 7.0, h: 1.0,
    fontFace: BODY, fontSize: 14, color: GREIGE, margin: 0, valign: "top", lineSpacing: 24,
  });

  const pair = [
    ["結果を追いかけると", "投稿を増やす／値下げ／キャンペーン\n→ 動かないまま、しんどくなる", PLUM_DK, ROSE_LT],
    ["原因を整えると", "選ばれる理由をつくる\n→ 売上は、あとからついてくる", GREIGE_LT, PLUM],
  ];
  pair.forEach((p, i) => {
    const y = 1.9 + i * 1.75;
    s.addShape(pres.ShapeType.roundRect, {
      x: 8.35, y, w: 4.23, h: 1.5, rectRadius: 0.07, fill: { color: p[2] },
    });
    s.addText(p[0], {
      x: 8.7, y: y + 0.16, w: 3.6, h: 0.35,
      fontFace: BODY, fontSize: 12.5, bold: true, color: p[3], margin: 0, valign: "middle",
    });
    s.addText(p[1], {
      x: 8.7, y: y + 0.55, w: 3.6, h: 0.8,
      fontFace: BODY, fontSize: 12, color: i === 0 ? GREIGE : INK, margin: 0, valign: "top", lineSpacing: 19,
    });
  });

  s.addText("スタイリストなら「この人にお願いしたい」、物販なら「このブランドから買いたい」。それが起きていれば、売上はあとからついてきます。", {
    x: M, y: 5.6, w: CW, h: 0.7,
    fontFace: BODY, fontSize: 13, color: ROSE_LT, margin: 0, valign: "middle",
  });

  s.addNotes("6ヶ月の共通言語になる一文。早口にしない。板書できるなら板書する。");
}

/* =========================================================
   4. なぜ埋もれるのか
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "なぜ、ファッション起業は埋もれるのか", "センスがないからでも、努力が足りないからでもありません");

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 2.0, w: CW, h: 0.95, rectRadius: 0.07, fill: { color: GREIGE },
  });
  s.addText("感性や専門性はあるのに、それが「選ばれる仕組み」になっていない ―― 理由はこれだけです。", {
    x: M + 0.45, y: 2.0, w: CW - 0.9, h: 0.95,
    fontFace: HEAD, fontSize: 18, bold: true, color: PLUM, margin: 0, valign: "middle",
  });

  const sym = [
    "自分の強みが、言葉になっていない",
    "誰に何を届けるのかが曖昧",
    "商品がなんとなく作られている",
    "発信が単発で終わっている",
    "Instagram・LINE・EC がバラバラ",
    "だから「なんとなく素敵」で止まる",
  ];
  sym.forEach((t, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = M + col * 6.13;
    const y = 3.2 + row * 0.86;
    s.addShape(pres.ShapeType.roundRect, {
      x, y, w: 5.7, h: 0.7, rectRadius: 0.06,
      fill: { color: i === 5 ? PLUM : GREIGE_LT },
    });
    s.addText(t, {
      x: x + 0.35, y, w: 5.0, h: 0.7,
      fontFace: BODY, fontSize: 13, bold: i === 5, color: i === 5 ? GREIGE : INK, margin: 0, valign: "middle",
    });
  });

  band(s, 6.05, 0.95, "必要なのは、発信量ではありません。選ばれる理由が伝わる「設計」です。", { fill: ROSE_LT, color: PLUM, size: 14 });

  s.addNotes("受講生の自己否定を外すパート。原因を「能力」から「設計」に移す。");
}

/* =========================================================
   5. 7ステップの全体像
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "7ステップの全体像", "上から下へ、情報が流れていきます。詰まったら必ず一つ上に戻ってください");

  const steps = [
    ["価値の言語化", "感性と専門性を、伝わる言葉に"],
    ["選ばれる理由を決める", "理想のお客様と、その人の詰まり"],
    ["商品設計", "入口・本命・継続の3層をつくる"],
    ["発信設計", "興味／信頼／欲しい を分ける"],
    ["販売導線", "発信から申込み・購入まで線にする"],
    ["コーチングセールス", "押し売りではなく、聞いて整理する"],
    ["仕組み化・自動化", "UTAGE / L Message / AI で回す"],
  ];
  steps.forEach((st, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i < 4 ? i : i - 4;
    const x = M + col * 6.13;
    const y = 2.02 + row * 0.86;
    s.addShape(pres.ShapeType.roundRect, {
      x, y, w: 5.7, h: 0.72, rectRadius: 0.06, fill: { color: i % 2 === 0 ? GREIGE_LT : GREIGE },
    });
    numCircle(s, x + 0.22, y + 0.14, 0.44, i + 1, PLUM, ROSE_LT, 15);
    s.addText(st[0], {
      x: x + 0.8, y, w: 2.2, h: 0.72,
      fontFace: BODY, fontSize: 13, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText(st[1], {
      x: x + 3.0, y, w: 2.55, h: 0.72,
      fontFace: BODY, fontSize: 11, color: MUTED, margin: 0, valign: "middle",
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M + 6.13, y: 4.6, w: 5.7, h: 1.4, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("発信ネタが出てこないのは STEP4 の問題ではなく、\nSTEP1・2 が決まっていないから。\n詰まったら、必ず一つ上に戻る。", {
    x: M + 6.48, y: 4.6, w: 5.0, h: 1.4,
    fontFace: BODY, fontSize: 12.5, color: GREIGE, margin: 0, valign: "middle", lineSpacing: 21,
  });

  band(s, 6.3, 0.8, "STEP7の自動化だけは、1〜5が固まる前に手を出さないでください。ブレた内容を自動で流し続けることになります。",
    { fill: ROSE_LT, color: PLUM, size: 13 });

  s.addNotes("以降の毎回の講義冒頭で「今日は何番の話か」を必ず言う。この図が6ヶ月の共通地図。");
}

/* =========================================================
   6. サービス型も物販型も、本質は同じ
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "サービス型も物販型も、本質は同じ", "違うのは、7ステップに入る中身だけ。構造は変わりません");

  const head = (t) => ({ text: t, options: { bold: true, color: WHITE, fill: { color: PLUM }, fontSize: 12.5 } });
  const row = (cells, tint) => cells.map((c, i) => ({
    text: c,
    options: { color: i === 0 ? PLUM : INK, bold: i === 0, fill: { color: tint }, fontSize: 12.5 },
  }));

  s.addTable([
    [head(""), head("サービス型（パーソナルスタイリスト等）"), head("物販型（ブランド・EC）")],
    row(["選ばれる形", "「この人にお願いしたい」", "「このブランドから買いたい」"], WHITE),
    row(["STEP3 商品", "診断／同行／継続サポート", "入口アイテム／主力／リピート商品"], GREIGE_LT),
    row(["STEP5 導線", "Instagram → LINE → 個別相談", "Instagram → EC（LINEで先行案内）"], WHITE),
    row(["STEP6 場面", "個別相談・カウンセリング", "DM・コメント・接客"], GREIGE_LT),
  ], {
    x: M, y: 2.05, w: CW, colW: [2.1, 4.87, 4.86],
    rowH: [0.45, 0.62, 0.62, 0.62, 0.62],
    fontFace: BODY, fontSize: 12.5, color: INK, valign: "middle",
    border: { type: "solid", color: "E0D6D2", pt: 1 },
    margin: [0.05, 0.12, 0.05, 0.12],
  });

  band(s, 5.5, 1.3,
    "将来、サービスと物販の両方をやる方がとても多いです。ご自身のほうを聞きながら、もう一方も聞いておいてください。\nただし発信の入口は、どちらかに寄せること。両方同時だと「この人は何の人か」が判断できなくなります。");

  s.addNotes("受講生が二種類いるので、必ず両方の例を出して分断させない。");
}

/* =========================================================
   7. STEP1 価値の言語化
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "価値の言語化", "7つのうちの1番目。正直に言うと、ここが8割です", 1);

  const q = [
    ["専門性", "何を根拠に語れるか。理論、心理学、現場の経験年数、素材の知識。ここは謙遜しないでください。"],
    ["提供できる変化", "「似合う服が分かる」の先。朝の支度が早くなる、写真に写るのが嫌でなくなる。ここが一番大事です。"],
    ["価値観", "何を大事にし、何をやらないか。自分語りではなく、お客様が「合いそう」と判断するための材料です。"],
  ];
  const cw = 3.75, gap = 0.42;
  q.forEach((item, i) => {
    const x = M + i * (cw + gap);
    card(s, x, 2.05, cw, 2.6, GREIGE_LT);
    numCircle(s, x + 0.4, 2.3, 0.6, i + 1, ROSE, WHITE, 20);
    s.addText(item[0], {
      x: x + 1.12, y: 2.32, w: cw - 1.5, h: 0.56,
      fontFace: HEAD, fontSize: 21, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText(item[1], {
      x: x + 0.4, y: 3.05, w: cw - 0.8, h: 1.4,
      fontFace: BODY, fontSize: 12.5, color: INK, margin: 0, valign: "top", lineSpacing: 20,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 4.9, w: CW, h: 0.85, rectRadius: 0.07, fill: { color: GREIGE },
  });
  s.addText("謙遜は、お客様にとっては「情報不足」です。", {
    x: M + 0.45, y: 4.9, w: CW - 0.9, h: 0.85,
    fontFace: HEAD, fontSize: 18, bold: true, color: PLUM, margin: 0, valign: "middle",
  });

  band(s, 6.0, 1.0, "言語化ができていないと、価格でしか比べてもらえません。できると、「この人から買いたい」で選ばれます。");

  s.addNotes("7つの中で最も時間を使うパート。物販型の方にも同じ3つが必要だと必ず補足する。");
}

/* =========================================================
   8. STEP1 ミニワーク
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "ミニワーク：この一文を埋める", "3分間。完璧でなくて構いません ―― 下書きで大丈夫です", 1);

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 2.1, w: CW, h: 2.0, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("「（　　　　　　）な人が、（　　　　　　）できるように\n　なるお手伝いをしています。それは私が（　　　　　　）だからです。」", {
    x: M + 0.5, y: 2.1, w: CW - 1.0, h: 2.0,
    fontFace: HEAD, fontSize: 21, bold: true, color: WHITE, margin: 0, valign: "middle", lineSpacing: 44,
  });

  const parts = [
    ["1つめのカッコ", "理想のお客様", "年齢や性別で止めない。困っている場面まで降ろす"],
    ["2つめのカッコ", "提供できる変化", "できるようになること。その結果の気持ちの変化まで"],
    ["3つめのカッコ", "専門性", "理論・心理学・現場経験。当事者だったことも強い材料"],
  ];
  const cw = 3.75, gap = 0.42;
  parts.forEach((p, i) => {
    const x = M + i * (cw + gap);
    card(s, x, 4.35, cw, 1.7, GREIGE_LT);
    s.addText(p[0], {
      x: x + 0.35, y: 4.5, w: cw - 0.7, h: 0.3,
      fontFace: BODY, fontSize: 10.5, bold: true, color: ROSE_DK, charSpacing: 1, margin: 0, valign: "middle",
    });
    s.addText(p[1], {
      x: x + 0.35, y: 4.82, w: cw - 0.7, h: 0.42,
      fontFace: HEAD, fontSize: 17, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText(p[2], {
      x: x + 0.35, y: 5.26, w: cw - 0.7, h: 0.62,
      fontFace: BODY, fontSize: 11.5, color: INK, margin: 0, valign: "top", lineSpacing: 17,
    });
  });

  band(s, 6.3, 0.8, "書けなかった箇所が、今月のあなたの課題です。空欄のまま次に進まないでください。",
    { fill: ROSE_LT, color: PLUM, size: 13.5 });

  s.addNotes("3分きっちり測る。書けなかったことを失敗にしない。オンラインはチャットに1人1行で投稿してもらう。");
}

/* =========================================================
   9. STEP2 選ばれる理由を決める
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "選ばれる理由を決める", "「誰もやっていないこと」を探さない。決めるのは3つだけです", 2);

  const three = [
    ["理想のお客様", "年齢・性別で止めない。困っている場面まで降ろす。",
      "例：子どもの入学式で、浮かないけれど埋もれない服が分からない40代"],
    ["その人の「詰まり」", "何を着ればいいか分からない／買っても着ない／自信が持てない。",
      "詰まりの解像度が、そのままあなたの専門性の解像度になります"],
    ["あなたを選ぶ理由", "同じような人は他にもいます。その中であなたである理由。",
      "「感覚で選んでいる」ではなく「理論として説明できる」ことは、それ自体が理由になります"],
  ];
  three.forEach((t, i) => {
    const y = 2.05 + i * 1.36;
    s.addShape(pres.ShapeType.roundRect, {
      x: M, y, w: CW, h: 1.18, rectRadius: 0.06, fill: { color: i % 2 === 0 ? GREIGE_LT : GREIGE },
    });
    numCircle(s, M + 0.3, y + 0.3, 0.58, i + 1, PLUM, ROSE_LT, 19);
    s.addText(t[0], {
      x: M + 1.05, y: y + 0.14, w: 3.0, h: 0.42,
      fontFace: HEAD, fontSize: 19, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText(t[1], {
      x: M + 1.05, y: y + 0.58, w: 4.6, h: 0.5,
      fontFace: BODY, fontSize: 12, color: INK, margin: 0, valign: "top", lineSpacing: 18,
    });
    s.addText(t[2], {
      x: M + 5.9, y: y + 0.2, w: 5.6, h: 0.8,
      fontFace: BODY, fontSize: 11.5, italic: true, color: ROSE_DK, margin: 0, valign: "middle", lineSpacing: 18,
    });
  });

  band(s, 6.2, 0.9, "絞るのは「発信の入口」だけです。買ってくださる方を制限するわけではありません。");

  s.addNotes("「絞ると客が減るのでは」と不安になるパート。最後の補足を必ず言う。物販型はここがブランドコンセプト。");
}

/* =========================================================
   10. STEP3 商品設計
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "商品設計 ― 3層をつくる", "良い方ほど、ここが弱いです。単発で疲弊する原因は「商品が1層しかない」こと", 3);

  const layers = [
    ["本命商品", "変化を届ける。利益はここで取る", "継続スタイリング／パーソナル講座", "主力アイテム", PLUM, WHITE],
    ["入口商品", "はじめての方が試せる。役割は出会いの数", "診断メニュー／単発相談／体験", "小物・定番アイテム", GREIGE, PLUM],
    ["継続商品", "一度買ってくださった方の2回目", "月額フォロー／定期の見直し", "色違い・セット販売", GREIGE_LT, PLUM],
  ];
  layers.forEach((l, i) => {
    const y = 2.05 + i * 1.22;
    s.addShape(pres.ShapeType.roundRect, {
      x: M, y, w: CW, h: 1.05, rectRadius: 0.06, fill: { color: l[4] },
    });
    s.addText(l[0], {
      x: M + 0.35, y: y + 0.1, w: 2.0, h: 0.45,
      fontFace: HEAD, fontSize: 20, bold: true, color: l[5], margin: 0, valign: "middle",
    });
    s.addText(l[1], {
      x: M + 0.35, y: y + 0.56, w: 3.6, h: 0.4,
      fontFace: BODY, fontSize: 11, color: i === 0 ? GREIGE : MUTED, margin: 0, valign: "middle",
    });
    s.addText([
      { text: "サービス型　", options: { bold: true, color: i === 0 ? ROSE_LT : ROSE_DK } },
      { text: l[2], options: { color: i === 0 ? GREIGE : INK } },
    ], {
      x: M + 4.0, y: y + 0.14, w: 7.4, h: 0.4,
      fontFace: BODY, fontSize: 12.5, margin: 0, valign: "middle",
    });
    s.addText([
      { text: "物販型　　　", options: { bold: true, color: i === 0 ? ROSE_LT : ROSE_DK } },
      { text: l[3], options: { color: i === 0 ? GREIGE : INK } },
    ], {
      x: M + 4.0, y: y + 0.54, w: 7.4, h: 0.4,
      fontFace: BODY, fontSize: 12.5, margin: 0, valign: "middle",
    });
  });

  band(s, 5.85, 1.15,
    "順番のコツ：本命商品から先に決めてください。入口から作ると「入口だけ買われて終わり」になります。\n本命が決まっていれば、入口商品は「本命の一部を切り出したもの」として自然に作れます。");

  s.addNotes("本命商品しかないブランドは、いつまでも新規を探し続けることになる。");
}

/* =========================================================
   11. ファッション心理学（ステートメント／ダーク）
   ========================================================= */
{
  const s = pres.addSlide();
  s.background = { color: PLUM };
  s.addText(KICKER, {
    x: W - M - 4.2, y: 0.32, w: 4.2, h: 0.34, align: "right", valign: "middle",
    fontFace: BODY, fontSize: 9.5, color: ROSE_LT, charSpacing: 2, margin: 0,
  });
  s.addText("この講座の土台", {
    x: M, y: 0.9, w: CW, h: 0.4,
    fontFace: BODY, fontSize: 12.5, color: ROSE_LT, charSpacing: 3, margin: 0, valign: "middle",
  });
  s.addText("お客様が買っているのは、服そのものではなく、\nその先にある「自己イメージ」と「変化」。", {
    x: M, y: 1.4, w: CW, h: 1.5,
    fontFace: HEAD, fontSize: 27, bold: true, color: WHITE, margin: 0, valign: "middle", lineSpacing: 46,
  });
  s.addText("自信を持ちたい／今の自分を変えたい／新しいステージに進みたい／人からどう見られるかを整えたい／自分らしくありたい", {
    x: M, y: 3.0, w: CW, h: 0.5,
    fontFace: BODY, fontSize: 13, color: GREIGE, margin: 0, valign: "middle",
  });

  const compare = [
    ["機能の説明で止まると", "「シワになりにくい素材です」", "→ 比較され、価格で負ける", PLUM_DK, ROSE_LT, GREIGE],
    ["自己イメージの話にすると", "「打ち合わせが続く日でも、夕方に鏡を見てがっかりしなくて済みます」", "→ 同じ商品でも、選ばれる", GREIGE_LT, ROSE_DK, PLUM],
  ];
  compare.forEach((c, i) => {
    const x = M + i * 6.13;
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 3.75, w: 5.7, h: 2.25, rectRadius: 0.07, fill: { color: c[3] },
    });
    s.addText(c[0], {
      x: x + 0.35, y: 3.95, w: 5.0, h: 0.35,
      fontFace: BODY, fontSize: 12, bold: true, color: c[4], margin: 0, valign: "middle",
    });
    s.addText(c[1], {
      x: x + 0.35, y: 4.38, w: 5.0, h: 0.95,
      fontFace: HEAD, fontSize: 16, bold: true, color: c[5], margin: 0, valign: "top", lineSpacing: 26,
    });
    s.addText(c[2], {
      x: x + 0.35, y: 5.4, w: 5.0, h: 0.4,
      fontFace: BODY, fontSize: 12.5, color: c[4], margin: 0, valign: "middle",
    });
  });

  s.addText("表面の売り方を学んだ人と、「人がなぜ選ぶのか」を理解している人とでは、長い目で見て圧倒的に差がつきます。", {
    x: M, y: 6.25, w: CW, h: 0.6,
    fontFace: BODY, fontSize: 13, color: ROSE_LT, margin: 0, valign: "middle",
  });

  s.addNotes("この講座の差別化の核。ここを外すと他の起業塾と同じになる。サービス型・物販型どちらにも効く話。");
}

/* =========================================================
   12. STEP4 発信設計
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "発信設計 ― 3種類に分ける", "反応がない原因は、全部の投稿が同じ役割になっていることです", 4);

  const posts = [
    ["興味を持たれる発信", "まだ知らない人へ", "ブランドの話も想いも語らない。その人が今日役に立つ話をする。", "リール"],
    ["信頼される発信", "気になっている人へ", "背景と過程を見せる。なぜその素材か、失敗した試作、お客様の変化。", "教育動画・フィード"],
    ["欲しいと思われる発信", "迷っている人へ", "情緒ではなく事実。サイズ感、着比べ、当日の流れ、返品交換の条件。", "ストーリーズ・商品ページ"],
  ];
  const cw = 3.75, gap = 0.42;
  posts.forEach((p, i) => {
    const x = M + i * (cw + gap);
    card(s, x, 2.05, cw, 2.95, GREIGE_LT);
    s.addText(p[1], {
      x: x + 0.38, y: 2.25, w: cw - 0.76, h: 0.32,
      fontFace: BODY, fontSize: 11, bold: true, color: ROSE_DK, charSpacing: 1, margin: 0, valign: "middle",
    });
    s.addText(p[0], {
      x: x + 0.38, y: 2.6, w: cw - 0.76, h: 0.76,
      fontFace: HEAD, fontSize: 19, bold: true, color: PLUM, margin: 0, valign: "top", lineSpacing: 26,
    });
    s.addText(p[2], {
      x: x + 0.38, y: 3.42, w: cw - 0.76, h: 1.0,
      fontFace: BODY, fontSize: 12, color: INK, margin: 0, valign: "top", lineSpacing: 19,
    });
    s.addShape(pres.ShapeType.roundRect, {
      x: x + 0.38, y: 4.44, w: cw - 0.76, h: 0.4, rectRadius: 0.09, fill: { color: PLUM },
    });
    s.addText(p[3], {
      x: x + 0.38, y: 4.44, w: cw - 0.76, h: 0.4, align: "center", valign: "middle",
      fontFace: BODY, fontSize: 11, bold: true, color: GREIGE, margin: 0,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 5.25, w: CW, h: 0.85, rectRadius: 0.07, fill: { color: GREIGE },
  });
  s.addText("興味ばかり → フォロワーは増えるのに売れない　／　欲しいばかり → 売り込みが強く見えて離れられる", {
    x: M + 0.45, y: 5.25, w: CW - 0.9, h: 0.85,
    fontFace: BODY, fontSize: 13, color: PLUM, margin: 0, valign: "middle",
  });

  band(s, 6.3, 0.8, "ワーク：直近10投稿をこの3つに仕分けしてください。だいたい偏っています。そこが今の詰まりです。",
    { fill: ROSE_LT, color: PLUM, size: 13.5 });

  s.addNotes("「毎日投稿」から「役割別の設計」への切り替え。仕分けワークは必ずやってもらう。");
}

/* =========================================================
   13. STEP4 シナリオの型
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "リール・教育動画は「型」で作る", "毎回ゼロから考えるから続きません。型を持ってください", 4);

  const flows = [
    ["リールの型", ["つかみ", "共感", "答え", "次の一歩"],
      ["最初の2秒で「私のことだ」", "そうなりますよね、と受け止める", "今日役に立つことを1つだけ", "保存／プロフィールへ"]],
    ["教育動画の型", ["誰のための話か", "なぜそうなるのか", "整えるポイント", "自分の場合は？", "次の案内"],
      ["今日の対象をはっきり言う", "原因は能力ではなく設計", "3つまでに絞る", "整理が必要だと気づいてもらう", "個別相談・次回へ"]],
  ];

  flows.forEach((f, fi) => {
    const y = 2.05 + fi * 1.95;
    s.addText(f[0], {
      x: M, y, w: 2.0, h: 0.38,
      fontFace: HEAD, fontSize: 18, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    const n = f[1].length;
    const gap = 0.16;
    const cw = (CW - gap * (n - 1)) / n;
    f[1].forEach((label, i) => {
      const x = M + i * (cw + gap);
      s.addShape(pres.ShapeType.roundRect, {
        x, y: 0.48 + y, w: cw, h: 1.15, rectRadius: 0.06,
        fill: { color: fi === 0 ? GREIGE_LT : GREIGE },
      });
      s.addText(`${i + 1}　${label}`, {
        x: x + 0.18, y: y + 0.6, w: cw - 0.36, h: 0.35,
        fontFace: BODY, fontSize: 12.5, bold: true, color: PLUM, margin: 0, valign: "middle",
      });
      s.addText(f[2][i], {
        x: x + 0.18, y: y + 0.96, w: cw - 0.36, h: 0.6,
        fontFace: BODY, fontSize: 10.5, color: INK, margin: 0, valign: "top", lineSpacing: 15,
      });
    });
  });

  band(s, 6.1, 1.0,
    "教育動画の②が肝心です。うまくいかない理由を、その人の能力のせいにしない。「設計がまだできていないだけ」と伝えると、人は動けます。");

  s.addNotes("AIに投げるときも、指示するのはこの型。型がないままAIに投げると当たり障りのない文章しか出てこない。");
}

/* =========================================================
   14. STEP5 販売導線
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "販売導線 ― 点を線にする", "どれだけ良い商品でも、ここが抜けると売上につながりません", 5);

  const flows = [
    ["サービス型", ["Instagram", "プロフィール", "LINE登録", "教育の流れ", "個別相談", "本命商品"], GREIGE_LT],
    ["物販型", ["Instagram", "世界観・ストーリー", "商品ページ", "購入", "LINE・メール", "継続購入"], GREIGE],
  ];
  flows.forEach((f, fi) => {
    const y = 2.05 + fi * 1.35;
    s.addText(f[0], {
      x: M, y, w: 1.5, h: 1.0,
      fontFace: HEAD, fontSize: 17, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    const n = f[1].length;
    const gap = 0.14;
    const cw = (CW - 1.6 - gap * (n - 1)) / n;
    f[1].forEach((label, i) => {
      const x = M + 1.6 + i * (cw + gap);
      s.addShape(pres.ShapeType.roundRect, {
        x, y: y + 0.16, w: cw, h: 0.68, rectRadius: 0.06, fill: { color: f[2] },
      });
      s.addText(label, {
        x: x + 0.06, y: y + 0.16, w: cw - 0.12, h: 0.68, align: "center", valign: "middle",
        fontFace: BODY, fontSize: 11, color: PLUM, margin: 0, lineSpacing: 14,
      });
      if (i < n - 1) {
        s.addShape(pres.ShapeType.triangle, {
          x: x + cw + 0.015, y: y + 0.43, w: 0.1, h: 0.14, rotate: 90, fill: { color: ROSE },
        });
      }
    });
  });

  s.addText("矢印のところに「理由」がありますか？", {
    x: M, y: 4.85, w: CW, h: 0.4,
    fontFace: HEAD, fontSize: 18, bold: true, color: PLUM, margin: 0, valign: "middle",
  });
  const checks = [
    "プロフィールを見て「何の人か」が分かる",
    "LINEに登録する理由がある（「最新情報」では登録されません）",
    "登録後に価値が伝わる流れがある",
    "気になったのに次がない、という行き止まりがない",
  ];
  checks.forEach((c, i) => {
    const x = M + (i % 2) * 6.13;
    const y = 5.25 + Math.floor(i / 2) * 0.58;
    s.addShape(pres.ShapeType.roundRect, {
      x, y, w: 5.7, h: 0.5, rectRadius: 0.05, fill: { color: GREIGE_LT },
    });
    s.addText("□　" + c, {
      x: x + 0.25, y, w: 5.3, h: 0.5,
      fontFace: BODY, fontSize: 11.5, color: INK, margin: 0, valign: "middle",
    });
  });

  band(s, 6.42, 0.62, "紙に書いて矢印を引き、つながらないところが今月直す場所です。", { fill: ROSE_LT, color: PLUM, size: 13 });

  s.addNotes("LINE登録の理由づくりは、入口商品の考え方と同じ。行き止まりが一番多い取りこぼし。");
}

/* =========================================================
   15. STEP6 コーチングセールス
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "コーチングセールス", "押し売りではなく、相手の本音を引き出して、前に進める状態をつくる", 6);

  const steps = [
    ["聞く", "7〜8割", "今どういう状態で、何に困っていて、本当はどうなりたいのか。話しすぎる人ほど成約しません。"],
    ["整理する", "相手の言葉で", "「つまり、○○が一番のネックということですね」。相手が自分の課題を客観的に見た瞬間、価値が生まれています。"],
    ["提案する", "正直に", "整理した課題に、自分の商品が合うかを伝える。合わないなら合わないと言う。それが信頼になります。"],
  ];
  const cw = 3.75, gap = 0.42;
  steps.forEach((t, i) => {
    const x = M + i * (cw + gap);
    card(s, x, 2.05, cw, 2.7, i === 0 ? GREIGE : GREIGE_LT);
    numCircle(s, x + 0.38, 2.28, 0.62, i + 1, PLUM, ROSE_LT, 20);
    s.addText(t[0], {
      x: x + 1.12, y: 2.3, w: cw - 1.5, h: 0.58,
      fontFace: HEAD, fontSize: 22, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText(t[1], {
      x: x + 0.38, y: 3.0, w: cw - 0.76, h: 0.32,
      fontFace: BODY, fontSize: 11, bold: true, color: ROSE_DK, charSpacing: 1, margin: 0, valign: "middle",
    });
    s.addText(t[2], {
      x: x + 0.38, y: 3.36, w: cw - 0.76, h: 1.28,
      fontFace: BODY, fontSize: 12, color: INK, margin: 0, valign: "top", lineSpacing: 19,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 5.0, w: CW, h: 0.85, rectRadius: 0.07, fill: { color: GREIGE },
  });
  s.addText("物販でも同じです。「これ、似合いますよ」ではなく「どんな場面で着たいですか」から入る。買わせるのではなく、選べるようにする。", {
    x: M + 0.45, y: 5.0, w: CW - 0.9, h: 0.85,
    fontFace: BODY, fontSize: 12.5, color: PLUM, margin: 0, valign: "middle",
  });

  band(s, 6.05, 0.95, "売るのが怖いのは、商品に自信がないからではありません。相手の役に立つか、確信が持てないからです。だから聞くんです。");

  s.addNotes("「売るのが怖い」を外すパート。技術ではなく姿勢の話として扱う。");
}

/* =========================================================
   16. STEP6 セルフコーチング
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "セルフコーチング ― 自分を整える", "自分の状態は、そのまま仕事の結果に出ます", 6);

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 2.05, w: CW, h: 1.0, rectRadius: 0.07, fill: { color: GREIGE },
  });
  s.addText("不安になる → 比べて落ち込む → 発信がブレる → 商品が決めきれない → 値段を下げたくなる", {
    x: M + 0.45, y: 2.05, w: CW - 0.9, h: 1.0,
    fontFace: BODY, fontSize: 14, bold: true, color: PLUM, margin: 0, valign: "middle",
  });

  const qs = [
    ["今、何が不安？", "漠然とした不安を、一つに落とす"],
    ["それは事実？　想像？", "大半は想像です"],
    ["今日できる一番小さい一歩は？", "大きい一歩は考えるだけで止まる"],
  ];
  const cw = 3.75, gap = 0.42;
  qs.forEach((q, i) => {
    const x = M + i * (cw + gap);
    card(s, x, 3.35, cw, 2.05, GREIGE_LT);
    numCircle(s, x + 0.38, 3.6, 0.6, i + 1, ROSE, WHITE, 20);
    s.addText(q[0], {
      x: x + 0.38, y: 4.3, w: cw - 0.76, h: 0.7,
      fontFace: HEAD, fontSize: 17, bold: true, color: PLUM, margin: 0, valign: "top", lineSpacing: 24,
    });
    s.addText(q[1], {
      x: x + 0.38, y: 5.0, w: cw - 0.76, h: 0.34,
      fontFace: BODY, fontSize: 11, color: MUTED, margin: 0, valign: "middle",
    });
  });

  band(s, 5.7, 1.0, "止まっていること自体は、問題ではありません。止まったまま黙っていることだけが、問題です。6ヶ月、一人で抱えないでください。");

  s.addNotes("継続の話。ここを扱う講座は少ない＝差別化。グループコンサルで相談してよい、と明示する。");
}

/* =========================================================
   17. STEP7 仕組み化・自動化
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "仕組み化・自動化", "売れている方は、頑張り続けているのではなく、少しずつ仕組みにしています", 7);

  const steps = [
    ["繰り返しを見つける", "毎回同じ説明をしている、毎回同じ質問に答えている、毎回同じ流れで案内している。繰り返しているものは、必ず仕組みにできます。"],
    ["一度だけ作る", "LINE登録後に自動で届く流れ、よくある質問の回答、申込みまでの案内。UTAGE や L Message で組むのはここです。"],
    ["AIに渡す", "投稿文のたたき台、商品説明の下書き、リールのシナリオ案、画像イメージ。AIは0を1にするのが得意。最後の判断は人がやる。"],
  ];
  const cw = 3.75, gap = 0.42;
  steps.forEach((t, i) => {
    const x = M + i * (cw + gap);
    card(s, x, 2.05, cw, 2.75, GREIGE_LT);
    numCircle(s, x + 0.38, 2.3, 0.62, i + 1, PLUM, ROSE_LT, 20);
    s.addText(t[0], {
      x: x + 0.38, y: 3.02, w: cw - 0.76, h: 0.5,
      fontFace: HEAD, fontSize: 19, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText(t[1], {
      x: x + 0.38, y: 3.56, w: cw - 0.76, h: 1.15,
      fontFace: BODY, fontSize: 12, color: INK, margin: 0, valign: "top", lineSpacing: 19,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 5.05, w: CW, h: 1.2, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("順番を間違えないでください。", {
    x: M + 0.45, y: 5.2, w: CW - 0.9, h: 0.4,
    fontFace: HEAD, fontSize: 18, bold: true, color: WHITE, margin: 0, valign: "middle",
  });
  s.addText("STEP1〜5 が固まっていない状態で自動化すると、ブレた内容を自動で流し続けることになります。中身が決まってから、それを楽にするために使う。", {
    x: M + 0.45, y: 5.6, w: CW - 0.9, h: 0.5,
    fontFace: BODY, fontSize: 12.5, color: GREIGE, margin: 0, valign: "middle",
  });

  band(s, 6.45, 0.65, "自動化は最後。これが一番もったいない間違いです。", { fill: ROSE_LT, color: PLUM, size: 13 });

  s.addNotes("ツールの話に見せず「頑張り続けない設計」の話にする。順番の注意は強めに。");
}

/* =========================================================
   18. 自己診断
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "自己診断 ― あなたはどこで詰まっているか", "当てはまるものにチェック。外れた一番小さい番号が、あなたの現在地です");

  const items = [
    "自分の価値を、人に伝わる一文で言える",
    "理想のお客様と、その人の「詰まり」が言える",
    "入口・本命・継続の3層が揃っている",
    "直近10投稿が3種類に偏りなく分かれている",
    "発信から申込み・購入まで線がつながっている",
    "相談や接客で、話すより聞く時間のほうが長い",
    "繰り返し作業が、仕組みになっている",
  ];
  items.forEach((t, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i < 4 ? i : i - 4;
    const x = M + col * 6.13;
    const y = 2.1 + row * 0.82;
    s.addShape(pres.ShapeType.roundRect, {
      x, y, w: 5.7, h: 0.68, rectRadius: 0.06, fill: { color: i % 2 === 0 ? GREIGE_LT : GREIGE },
    });
    numCircle(s, x + 0.2, y + 0.13, 0.42, i + 1, PLUM, ROSE_LT, 14);
    s.addText("□　" + t, {
      x: x + 0.75, y, w: 4.8, h: 0.68,
      fontFace: BODY, fontSize: 12, color: INK, margin: 0, valign: "middle",
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M + 6.13, y: 4.56, w: 5.7, h: 1.5, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("「5と7ができていない」という方も、\nまず一番小さい番号に戻ってください。\nその先にチェックが付いていても、\n土台が空いていると必ず戻ることになります。", {
    x: M + 6.48, y: 4.56, w: 5.0, h: 1.5,
    fontFace: BODY, fontSize: 12, color: GREIGE, margin: 0, valign: "middle", lineSpacing: 20,
  });

  band(s, 6.35, 0.75, "今月取り組む番号を、いま1つ決めてください。", { fill: ROSE_LT, color: PLUM, size: 14 });

  s.addNotes("ここを曖昧にすると受講生が拡散する。必ず一番小さい番号を優先させる。");
}

/* =========================================================
   19. よくあるつまずきと処方箋
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "よくあるつまずきと、処方箋", "症状の場所と、原因の場所は違います");

  const rows = [
    ["「発信ネタが出てこない」", "STEP4 の問題に見えるが", "誰の何を解決するか決まっていない", "STEP 1・2 へ戻る"],
    ["「価格を上げるのが怖い」", "STEP3 の問題に見えるが", "提供できる変化が言葉になっていない", "STEP 1 へ戻る"],
    ["「学んだのに動けない」", "情報量の問題に見えるが", "一度に全部やろうとしている", "1つに絞る"],
  ];
  rows.forEach((r, i) => {
    const y = 2.1 + i * 1.35;
    s.addShape(pres.ShapeType.roundRect, {
      x: M, y, w: CW, h: 1.15, rectRadius: 0.06, fill: { color: i % 2 === 0 ? GREIGE_LT : GREIGE },
    });
    s.addText(r[0], {
      x: M + 0.35, y: y + 0.12, w: 4.2, h: 0.45,
      fontFace: HEAD, fontSize: 18, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText(r[1], {
      x: M + 0.35, y: y + 0.6, w: 4.2, h: 0.35,
      fontFace: BODY, fontSize: 11, color: MUTED, margin: 0, valign: "middle",
    });
    s.addText([
      { text: "本当の原因　", options: { bold: true, color: ROSE_DK } },
      { text: r[2], options: { color: INK } },
    ], {
      x: M + 4.9, y, w: 4.6, h: 1.15,
      fontFace: BODY, fontSize: 12.5, margin: 0, valign: "middle",
    });
    s.addShape(pres.ShapeType.roundRect, {
      x: M + 9.75, y: y + 0.33, w: 1.9, h: 0.5, rectRadius: 0.1, fill: { color: PLUM },
    });
    s.addText(r[3], {
      x: M + 9.75, y: y + 0.33, w: 1.9, h: 0.5, align: "center", valign: "middle",
      fontFace: BODY, fontSize: 11.5, bold: true, color: GREIGE, margin: 0,
    });
  });

  band(s, 6.3, 0.8, "詰まったら、必ず一つ上に戻る。6ヶ月間、いちばん使う考え方です。", { fill: ROSE_LT, color: PLUM, size: 13.5 });

  s.addNotes("原因を上流に戻す訓練。ここを繰り返し言うと、受講生が自走できるようになる。");
}

/* =========================================================
   20. 今月のワーク
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "今月のワーク", "やることは1つだけです");

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 2.1, w: CW, h: 1.75, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("自己診断で外れた、一番小さい番号。\nそのワークシートを、最後まで埋める。", {
    x: M + 0.5, y: 2.1, w: CW - 1.0, h: 1.75,
    fontFace: HEAD, fontSize: 24, bold: true, color: WHITE, margin: 0, valign: "middle", lineSpacing: 44,
  });

  const notes = [
    ["提出", "次回のグループコンサルまで", "埋まらなかった箇所があれば、埋まらなかったこと自体を持ってきてください。"],
    ["この後", "ワークショップ60分", "STEP1 の言語化シートは、全員でここまでに仕上げてしまいます。"],
    ["宣言", "いつやるか、を決める", "「今月中」ではなく「毎週火曜の夜」のように、曜日と時間帯で決めてください。"],
  ];
  const cw = 3.75, gap = 0.42;
  notes.forEach((n, i) => {
    const x = M + i * (cw + gap);
    card(s, x, 4.1, cw, 2.0, GREIGE_LT);
    s.addText(n[0], {
      x: x + 0.38, y: 4.28, w: cw - 0.76, h: 0.32,
      fontFace: BODY, fontSize: 11, bold: true, color: ROSE_DK, charSpacing: 2, margin: 0, valign: "middle",
    });
    s.addText(n[1], {
      x: x + 0.38, y: 4.62, w: cw - 0.76, h: 0.45,
      fontFace: HEAD, fontSize: 15, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText(n[2], {
      x: x + 0.38, y: 5.12, w: cw - 0.76, h: 0.85,
      fontFace: BODY, fontSize: 11.5, color: INK, margin: 0, valign: "top", lineSpacing: 18,
    });
  });

  s.addText("「ここが書けませんでした」は、立派な相談です。", {
    x: M, y: 6.3, w: CW, h: 0.5,
    fontFace: BODY, fontSize: 13.5, italic: true, color: PLUM, margin: 0, valign: "middle",
  });

  s.addNotes("提出のハードルを下げる。書けなかったこと自体を歓迎する姿勢を明示する。");
}

/* =========================================================
   21. まとめ（ダーク）
   ========================================================= */
{
  const s = pres.addSlide();
  s.background = { color: PLUM };
  s.addText(KICKER, {
    x: W - M - 4.2, y: 0.32, w: 4.2, h: 0.34, align: "right", valign: "middle",
    fontFace: BODY, fontSize: 9.5, color: ROSE_LT, charSpacing: 2, margin: 0,
  });
  s.addText("まとめ", {
    x: M, y: 0.85, w: CW, h: 0.4,
    fontFace: BODY, fontSize: 12.5, color: ROSE_LT, charSpacing: 3, margin: 0, valign: "middle",
  });
  s.addText("「売れる」は結果。「選ばれる」が原因。", {
    x: M, y: 1.3, w: CW, h: 0.9,
    fontFace: HEAD, fontSize: 32, bold: true, color: WHITE, margin: 0, valign: "middle",
  });
  s.addText("選ばれる状態は、感性やセンスだけでは作れません。この7つの順番で、つくります。", {
    x: M, y: 2.2, w: CW, h: 0.4,
    fontFace: BODY, fontSize: 13.5, color: GREIGE, margin: 0, valign: "middle",
  });

  const sum = [
    "価値を、言葉にする", "選ばれる理由を、決める", "商品を、3層にする", "発信を、3種類に分ける",
    "発信から購入までを、線にする", "聞く姿勢で、売る", "繰り返しを、仕組みにする",
  ];
  sum.forEach((t, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i < 4 ? i : i - 4;
    const x = M + col * 6.13;
    const y = 2.85 + row * 0.78;
    s.addShape(pres.ShapeType.roundRect, {
      x, y, w: 5.7, h: 0.64, rectRadius: 0.06, fill: { color: PLUM_DK },
    });
    numCircle(s, x + 0.2, y + 0.12, 0.4, i + 1, ROSE, WHITE, 13);
    s.addText(t, {
      x: x + 0.72, y, w: 4.8, h: 0.64,
      fontFace: BODY, fontSize: 12.5, color: GREIGE, margin: 0, valign: "middle",
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M + 6.13, y: 5.19, w: 5.7, h: 1.3, rectRadius: 0.07, fill: { color: GREIGE_LT },
  });
  s.addText("センスだけで終わらせないために、\nこの6ヶ月があります。", {
    x: M + 6.48, y: 5.19, w: 5.0, h: 1.3,
    fontFace: HEAD, fontSize: 17, bold: true, color: PLUM, margin: 0, valign: "middle", lineSpacing: 30,
  });

  s.addNotes("7つを1行ずつ読み上げて振り返る。");
}

/* =========================================================
   22. 次回まで
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "次回まで", "止まったときの動き方も、決めておきましょう");

  const next = [
    ["次回の内容", "STEP1・STEP2 をもう一段深く", "価値の言語化と、選ばれる理由の設計。今日書いた一文を持ってきてください。"],
    ["提出物", "ワークシート（該当STEP）", "グループコンサルまでに。埋まらなかった箇所には、印だけ付けておいてください。"],
    ["質問の出し方", "「どこで」「何が」書けないか", "「わかりません」より「STEP1の変化の欄が書けません」のほうが、その場で解決します。"],
  ];
  const cw = 3.75, gap = 0.42;
  next.forEach((n, i) => {
    const x = M + i * (cw + gap);
    card(s, x, 2.1, cw, 2.5, GREIGE_LT);
    s.addText(n[0], {
      x: x + 0.38, y: 2.3, w: cw - 0.76, h: 0.32,
      fontFace: BODY, fontSize: 11, bold: true, color: ROSE_DK, charSpacing: 2, margin: 0, valign: "middle",
    });
    s.addText(n[1], {
      x: x + 0.38, y: 2.66, w: cw - 0.76, h: 0.8,
      fontFace: HEAD, fontSize: 17, bold: true, color: PLUM, margin: 0, valign: "top", lineSpacing: 26,
    });
    s.addText(n[2], {
      x: x + 0.38, y: 3.5, w: cw - 0.76, h: 0.95,
      fontFace: BODY, fontSize: 11.5, color: INK, margin: 0, valign: "top", lineSpacing: 18,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 4.9, w: CW, h: 1.5, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("止まっていること自体は、問題ではありません。\n止まったまま黙っていることだけが、問題です。", {
    x: M + 0.5, y: 4.9, w: CW - 1.0, h: 1.5,
    fontFace: HEAD, fontSize: 21, bold: true, color: WHITE, margin: 0, valign: "middle", lineSpacing: 40,
  });

  s.addText("Fashion Entrepreneurship Academia", {
    x: M, y: 6.6, w: CW, h: 0.4,
    fontFace: BODY, fontSize: 10.5, color: MUTED, charSpacing: 3, margin: 0, valign: "middle",
  });

  s.addNotes("ワークショップ60分へ移る前のブリッジ。質問の出し方をここで型にしておくと、6ヶ月の質が変わる。");
}

pres.writeFile({ fileName: "ファッション起業7つのステップ.pptx" }).then((f) => {
  console.log("created:", f);
});
