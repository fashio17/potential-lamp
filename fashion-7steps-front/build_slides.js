/**
 * 無料動画スライド 生成スクリプト（1本版 ＋ 3本版）
 *
 *   node build_slides.js
 *
 * 出力（2ファイル）
 *   無料動画スライド_1本版.pptx  … 全19枚。LINE登録直後に配信する22分の本編用
 *   無料ミニ講座スライド_3本版.pptx … 全23枚。会員サイトの無料コース（3レッスン）用
 *
 * 中身のスライドは共通で、表紙・目次・次回予告だけが差し替わります。
 * 方針：スマホ視聴前提。1枚1メッセージ、本文は最小18pt。
 */

const pptxgen = require("pptxgenjs");

/* ---------- パレット（受講生向け教材と共通） ---------- */
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

const HEAD = "Yu Mincho";
const BODY = "Yu Gothic";

const W = 13.333;
const M = 0.9;
const CW = W - M * 2; // 11.533

/* =========================================================
   共通ヘルパー
   ========================================================= */

function chapter(s, label, dark) {
  if (!label) return;
  s.addText(label, {
    x: W - M - 2.4, y: 0.34, w: 2.4, h: 0.32, align: "right", valign: "middle",
    fontFace: BODY, fontSize: 11, color: dark ? ROSE_LT : MUTED, charSpacing: 2, margin: 0,
  });
}

function numCircle(p, s, x, y, d, n, fill, txt, size) {
  s.addShape(p.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: fill } });
  s.addText(String(n), {
    x, y, w: d, h: d, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: size, bold: true, color: txt, margin: 0,
  });
}

function contentSlide(p, label, title, lead) {
  const s = p.addSlide();
  chapter(s, label, false);
  s.addText(title, {
    x: M, y: 0.72, w: CW, h: 0.9,
    fontFace: HEAD, fontSize: 34, bold: true, color: PLUM, margin: 0, valign: "middle",
  });
  if (lead) {
    s.addText(lead, {
      x: M, y: 1.62, w: CW, h: 0.45,
      fontFace: BODY, fontSize: 16, color: MUTED, margin: 0, valign: "middle",
    });
  }
  return s;
}

function statementSlide(p, label, big, sub, notes) {
  const s = p.addSlide();
  s.background = { color: PLUM };
  chapter(s, label, true);
  s.addText(big, {
    x: M, y: 1.9, w: CW, h: 2.5,
    fontFace: HEAD, fontSize: 40, bold: true, color: WHITE, margin: 0, valign: "middle", lineSpacing: 64,
  });
  if (sub) {
    s.addText(sub, {
      x: M, y: 4.7, w: CW, h: 1.4,
      fontFace: BODY, fontSize: 18, color: GREIGE, margin: 0, valign: "top", lineSpacing: 32,
    });
  }
  s.addNotes(notes);
  return s;
}

/* =========================================================
   表紙・目次・次回予告（版によって変わるもの）
   ========================================================= */

/** 1本版の表紙 */
function coverSingle(p) {
  const s = p.addSlide();
  s.background = { color: PLUM };

  s.addShape(p.ShapeType.ellipse, { x: 9.1, y: 1.7, w: 3.3, h: 3.3, fill: { color: PLUM_DK } });
  s.addShape(p.ShapeType.ellipse, {
    x: 9.1, y: 1.7, w: 3.3, h: 3.3, fill: { color: PLUM, transparency: 100 },
    line: { color: ROSE, width: 1.25 },
  });
  s.addText("7", {
    x: 9.1, y: 1.7, w: 3.3, h: 3.3, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 120, bold: true, color: ROSE_LT, margin: 0,
  });

  s.addText("パーソナルスタイリスト／イメージコンサルタントの方へ", {
    x: M, y: 1.85, w: 7.9, h: 0.42,
    fontFace: BODY, fontSize: 15, color: ROSE_LT, margin: 0, valign: "middle",
  });
  s.addText("資格を取ったのに、\nなぜ選ばれないのか", {
    x: M, y: 2.35, w: 7.9, h: 1.9,
    fontFace: HEAD, fontSize: 42, bold: true, color: WHITE, margin: 0, valign: "middle", lineSpacing: 64,
  });
  s.addText("選ばれている人が、整えている7つ", {
    x: M, y: 4.4, w: 7.9, h: 0.5,
    fontFace: BODY, fontSize: 17, color: GREIGE, margin: 0, valign: "middle",
  });
  s.addText("えりりん　／　ファッション心理学者・大学教授　　|　　約22分", {
    x: M, y: 5.5, w: 7.9, h: 0.4,
    fontFace: BODY, fontSize: 12.5, color: MUTED, charSpacing: 1, margin: 0, valign: "middle",
  });

  s.addNotes("冒頭15秒が勝負。名乗りより先にタイトルを言う。テンポ優先。");
  return s;
}

/** 1本版の目次（離脱防止） */
function agendaSingle(p) {
  const s = contentSlide(p, "", "今日お話しするのは、3つです", "22分、お付き合いください");
  const items = [
    ["なぜ、選ばれないのか", "資格を取ったのに、という状態の正体"],
    ["お客様が変わらない、本当の理由", "たぶん、聞いたことがない話です"],
    ["選ばれている人が、整えている7つ", "自分の現在地が分かるチェックつき"],
  ];
  items.forEach((t, i) => {
    const y = 2.5 + i * 1.25;
    s.addShape(p.ShapeType.roundRect, {
      x: M, y, w: CW, h: 1.05, rectRadius: 0.07, fill: { color: i % 2 === 0 ? GREIGE_LT : GREIGE },
    });
    numCircle(p, s, M + 0.35, y + 0.2, 0.65, i + 1, PLUM, ROSE_LT, 22);
    s.addText(t[0], {
      x: M + 1.25, y: y + 0.12, w: CW - 1.7, h: 0.48,
      fontFace: HEAD, fontSize: 23, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText(t[1], {
      x: M + 1.25, y: y + 0.6, w: CW - 1.7, h: 0.36,
      fontFace: BODY, fontSize: 14, color: MUTED, margin: 0, valign: "middle",
    });
  });
  s.addNotes("最初に全体像を見せると離脱が減る。「3つです」と言い切る。");
  return s;
}

/** 3本版の表紙 */
function coverChapter(p, n, kicker, title, sub, notes) {
  const s = p.addSlide();
  s.background = { color: PLUM };
  chapter(s, `動画 ${n}`, true);
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 1.75, w: 2.3, h: 0.42, rectRadius: 0.1, fill: { color: ROSE },
  });
  s.addText(`無料ミニ講座　${n}／3`, {
    x: M, y: 1.75, w: 2.3, h: 0.42, align: "center", valign: "middle",
    fontFace: BODY, fontSize: 12, bold: true, color: WHITE, margin: 0,
  });
  s.addText(kicker, {
    x: M, y: 2.42, w: CW, h: 0.45,
    fontFace: BODY, fontSize: 16, color: ROSE_LT, margin: 0, valign: "middle",
  });
  s.addText(title, {
    x: M, y: 2.95, w: CW, h: 1.85,
    fontFace: HEAD, fontSize: 44, bold: true, color: WHITE, margin: 0, valign: "middle", lineSpacing: 66,
  });
  s.addText(sub, {
    x: M, y: 4.95, w: CW, h: 0.5,
    fontFace: BODY, fontSize: 17, color: GREIGE, margin: 0, valign: "middle",
  });
  s.addText("えりりん　／　ファッション心理学者・大学教授", {
    x: M, y: 5.85, w: CW, h: 0.4,
    fontFace: BODY, fontSize: 12.5, color: MUTED, charSpacing: 1, margin: 0, valign: "middle",
  });
  s.addNotes(notes);
  return s;
}

/** 3本版の次回予告 */
function nextSlide(p, n, label, title, notes) {
  const s = p.addSlide();
  s.background = { color: PLUM };
  chapter(s, `動画 ${n}`, true);
  s.addText(label, {
    x: M, y: 2.5, w: CW, h: 0.5,
    fontFace: BODY, fontSize: 16, color: ROSE_LT, charSpacing: 3, margin: 0, valign: "middle",
  });
  s.addText(title, {
    x: M, y: 3.1, w: CW, h: 1.5,
    fontFace: HEAD, fontSize: 40, bold: true, color: WHITE, margin: 0, valign: "middle", lineSpacing: 58,
  });
  s.addText("次のレッスンで、お話しします。", {
    x: M, y: 4.75, w: CW, h: 0.5,
    fontFace: BODY, fontSize: 17, color: GREIGE, margin: 0, valign: "middle",
  });
  s.addNotes(notes);
  return s;
}

/* =========================================================
   本編スライド（1本版・3本版で共通）
   ========================================================= */

function symptoms(p, ch) {
  const s = contentSlide(p, ch, "こんなこと、ありませんか", "ひとつでも当てはまったら、最後までご覧ください");
  const items = [
    "インスタは頑張って投稿しているのに、反応が薄い",
    "モニターさんは来るけれど、本申込みにつながらない",
    "診断メニューはあるけれど、一回きりで終わってしまう",
    "同じ資格の人が多くて、自分の違いを説明できない",
    "診断してお伝えしたのに、お客様が実際には変わらない",
  ];
  items.forEach((t, i) => {
    const y = 2.3 + i * 0.82;
    s.addShape(p.ShapeType.roundRect, {
      x: M, y, w: CW, h: 0.7, rectRadius: 0.06,
      fill: { color: i === 4 ? ROSE_LT : GREIGE_LT },
    });
    s.addText(t, {
      x: M + 0.4, y, w: CW - 0.8, h: 0.7,
      fontFace: BODY, fontSize: 18, bold: i === 4, color: i === 4 ? PLUM : INK, margin: 0, valign: "middle",
    });
  });
  s.addText("▷ 物販の方は「診断」を「商品」に置き換えて聞いてください", {
    x: M, y: 6.5, w: CW, h: 0.4,
    fontFace: BODY, fontSize: 13, color: MUTED, margin: 0, valign: "middle",
  });
  s.addNotes("5つを1つずつ、間を取って読む。最後の1つを一番ゆっくり。");
}

function notSense(p, ch) {
  statementSlide(p, ch,
    "うまくいかない理由は、\nセンスでも、努力でもありません。",
    "むしろ逆です。ご相談くださる方ほど、勉強熱心で、誠実で、お客様思いです。\n足りないのは、感性と専門性が「選ばれる仕組み」になっていないこと。それだけです。",
    "目を見て、ゆっくり。視聴者の心が一番緩む場所。");
}

function commodity(p, ch) {
  const s = contentSlide(p, ch, "「診断ができます」では、もう選ばれない", "資格を持っている方が、本当に増えました");

  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 2.25, w: CW, h: 1.0, rectRadius: 0.07, fill: { color: GREIGE },
  });
  s.addText("パーソナルカラー　　骨格　　顔タイプ", {
    x: M, y: 2.25, w: CW, h: 1.0, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 26, bold: true, color: PLUM, margin: 0,
  });
  s.addText("同じ協会、同じ診断結果、似たような料金。この中に並べられると、違いが見えません。", {
    x: M, y: 3.4, w: CW, h: 0.45,
    fontFace: BODY, fontSize: 16, color: INK, margin: 0, valign: "middle",
  });

  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 4.05, w: CW, h: 1.75, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("「パーソナルカラー診断、骨格診断、顔タイプ診断ができます。\n　○○協会認定講師です。」", {
    x: M + 0.5, y: 4.2, w: CW - 1.0, h: 0.95,
    fontFace: BODY, fontSize: 17, color: GREIGE, margin: 0, valign: "middle", lineSpacing: 30,
  });
  s.addText("何ができるかは書いてある。でも、受けた自分がどうなるかが書いていない。", {
    x: M + 0.5, y: 5.15, w: CW - 1.0, h: 0.5,
    fontFace: BODY, fontSize: 17, bold: true, color: ROSE_LT, margin: 0, valign: "middle",
  });
  s.addText("だからお客様は、価格でしか比べようがなくなります。", {
    x: M, y: 6.05, w: CW, h: 0.5,
    fontFace: BODY, fontSize: 16, color: PLUM, margin: 0, valign: "middle",
  });
  s.addNotes("プロフィール文は声に出して読む。多くの視聴者が「自分だ」と気づく。");
}

function notChange(p, ch) {
  statementSlide(p, ch,
    "診断したのに、\nお客様が変わらない。",
    "似合う色をお伝えして、コーディネートまでご提案した。喜んで帰られた。\nなのに3ヶ月後にお会いすると、前と同じ服を着ていらっしゃる。",
    "前半の山。自分の失敗として語れると強い。実体験で。");
}

function voices(p, ch) {
  const s = contentSlide(p, ch, "買おうとした瞬間、心の中で聞こえる声", "お客様の頭の中で、何が起きているか");
  const list = [
    "「私なんかが、こんな明るい色を着ても」",
    "「あ、けっこう高いな。安いほうでいいや」",
    "「これ着てたら、家族に何か言われそう」",
  ];
  list.forEach((t, i) => {
    const y = 2.35 + i * 1.05;
    s.addShape(p.ShapeType.roundRect, {
      x: M, y, w: CW, h: 0.88, rectRadius: 0.07, fill: { color: GREIGE },
    });
    s.addText(t, {
      x: M, y, w: CW, h: 0.88, align: "center", valign: "middle",
      fontFace: HEAD, fontSize: 24, bold: true, color: PLUM, margin: 0,
    });
  });
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 5.7, w: CW, h: 1.0, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("そっと棚に戻して、いつもの黒いカーディガンを買って帰る。", {
    x: M, y: 5.7, w: CW, h: 1.0, align: "center", valign: "middle",
    fontFace: BODY, fontSize: 18, color: GREIGE, margin: 0,
  });
  s.addNotes("「ご自身にも、ありませんか」と問いかけを挟む。自分ごと化のポイント。");
}

function kannen(p, ch) {
  const s = contentSlide(p, ch, "この声を「観念」といいます", "ファッションに対する、その人の思い込みです");

  s.addText("こんな口癖、聞きませんか", {
    x: M, y: 2.2, w: 5.5, h: 0.4,
    fontFace: BODY, fontSize: 15, bold: true, color: ROSE_DK, charSpacing: 1, margin: 0, valign: "middle",
  });
  ["「安かったから、つい買っちゃって」", "「素敵な服を着てないと、恥ずかしい」", "「結局、好きなものを着ちゃうよね」"]
    .forEach((t, i) => {
      const y = 2.68 + i * 0.72;
      s.addShape(p.ShapeType.roundRect, {
        x: M, y, w: 5.5, h: 0.62, rectRadius: 0.06, fill: { color: GREIGE_LT },
      });
      s.addText(t, {
        x: M + 0.3, y, w: 5.0, h: 0.62,
        fontFace: BODY, fontSize: 16, color: INK, margin: 0, valign: "middle",
      });
    });

  s.addText("観念は、過去の体験からできています", {
    x: M + 6.03, y: 2.2, w: 5.5, h: 0.4,
    fontFace: BODY, fontSize: 15, bold: true, color: ROSE_DK, charSpacing: 1, margin: 0, valign: "middle",
  });
  ["子どもの頃、母が選んだ服をずっと着ていた", "背が高くて、可愛い服が似合わなかった", "「変な格好だと一緒に歩けない」と言われた"]
    .forEach((t, i) => {
      const y = 2.68 + i * 0.72;
      s.addShape(p.ShapeType.roundRect, {
        x: M + 6.03, y, w: 5.5, h: 0.62, rectRadius: 0.06, fill: { color: GREIGE },
      });
      s.addText(t, {
        x: M + 6.33, y, w: 5.0, h: 0.62,
        fontFace: BODY, fontSize: 16, color: INK, margin: 0, valign: "middle",
      });
    });

  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 5.2, w: CW, h: 1.1, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("何十年も前の体験が、今日のクローゼットを決めています。", {
    x: M, y: 5.2, w: CW, h: 1.1, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 24, bold: true, color: WHITE, margin: 0,
  });
  s.addNotes("実例が命。自分の講座で出た言葉を、差し支えない範囲で2〜3個そのまま読む。");
}

function knowledge(p, ch) {
  statementSlide(p, ch,
    "知識は入っても、\n観念はそのまま。",
    "だから、行動が変わりません。これが、診断結果が実行されない本当の理由です。\n逆に、観念のほうが変わると、同じ診断結果でも受け取り方がまるで違ってきます。",
    "この動画の結論。ゆっくり。ここだけは絶対に早口にしない。");
}

function threePhases(p, ch) {
  const s = contentSlide(p, ch, "観念は、3つの順番で変わります", null);
  const phases = [
    ["DISCOVERY", "自分を見つめる", "「ファッションとは何ですか」\n過去の体験を思い出す"],
    ["AWAKENESS", "気づき", "その観念がどこから来たのか\nに気づいていただく"],
    ["Circulation", "受け取り直す", "手放したいものを手放し、\n見る場所を変えていく"],
  ];
  const cw = 3.58, gap = 0.4;
  phases.forEach((ph, i) => {
    const x = M + i * (cw + gap);
    s.addShape(p.ShapeType.roundRect, {
      x, y: 2.2, w: cw, h: 3.1, rectRadius: 0.07, fill: { color: i === 2 ? GREIGE : GREIGE_LT },
    });
    numCircle(p, s, x + cw / 2 - 0.32, 2.45, 0.64, i + 1, PLUM, ROSE_LT, 21);
    s.addText(ph[0], {
      x: x + 0.2, y: 3.25, w: cw - 0.4, h: 0.38, align: "center",
      fontFace: BODY, fontSize: 14, bold: true, color: ROSE_DK, charSpacing: 2, margin: 0, valign: "middle",
    });
    s.addText(ph[1], {
      x: x + 0.2, y: 3.66, w: cw - 0.4, h: 0.45, align: "center",
      fontFace: HEAD, fontSize: 21, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText(ph[2], {
      x: x + 0.3, y: 4.22, w: cw - 0.6, h: 0.9,
      fontFace: BODY, fontSize: 14, color: INK, margin: 0, valign: "top", lineSpacing: 23,
    });
  });
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 5.6, w: CW, h: 1.0, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("この3つを通ったあとに診断をお伝えすると、まったく違う入り方をします。", {
    x: M, y: 5.6, w: CW, h: 1.0, align: "center", valign: "middle",
    fontFace: BODY, fontSize: 18, color: GREIGE, margin: 0,
  });
  s.addNotes("概念の紹介まで。具体的な質問項目や進め方は講座の中身なので、無料では出さない。");
}

function gapSuit(p, ch) {
  const s = contentSlide(p, ch, "「似合う」と「なりたい」は、ズレます", null);
  const two = [
    ["診断で出る「似合う」", "淡い色がお似合いです\nこの形がお似合いです", GREIGE_LT],
    ["ご本人の「なりたい」", "でも、黒でかっこよくいたい\n憧れているのは、別の形", GREIGE],
  ];
  two.forEach((t, i) => {
    const x = M + i * 6.03;
    s.addShape(p.ShapeType.roundRect, {
      x, y: 2.2, w: 5.5, h: 1.6, rectRadius: 0.07, fill: { color: t[2] },
    });
    s.addText(t[0], {
      x: x + 0.35, y: 2.38, w: 4.8, h: 0.45,
      fontFace: HEAD, fontSize: 21, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText(t[1], {
      x: x + 0.35, y: 2.88, w: 4.8, h: 0.8,
      fontFace: BODY, fontSize: 16, color: INK, margin: 0, valign: "top", lineSpacing: 26,
    });
  });
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 4.05, w: CW, h: 0.95, rectRadius: 0.07, fill: { color: ROSE_LT },
  });
  s.addText("「でも診断結果はこうですから」と押すと、納得しないまま帰られて、結局着ません。", {
    x: M, y: 4.05, w: CW, h: 0.95, align: "center", valign: "middle",
    fontFace: BODY, fontSize: 18, bold: true, color: PLUM, margin: 0,
  });
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 5.25, w: CW, h: 1.35, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("先に「なりたい」を聞ききる。そのうえで、似合うを乗せる。", {
    x: M, y: 5.25, w: CW, h: 1.35, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 26, bold: true, color: WHITE, margin: 0,
  });
  s.addNotes("「その姿になったら、何が変わりそうですか」という問いを口頭で紹介する。");
}

function orderChange(p, ch) {
  const s = contentSlide(p, ch, "順番を変えるだけで、変わります", "同じ時間、同じ資格、同じ診断結果です");
  const rows = [
    ["よくある順番", ["診断する", "ご提案する"], GREIGE_LT, MUTED],
    ["変えたあとの順番", ["聞く", "気づいていただく", "それから診断する"], PLUM, ROSE_LT],
  ];
  rows.forEach((r, ri) => {
    const y = 2.35 + ri * 1.75;
    s.addShape(p.ShapeType.roundRect, {
      x: M, y, w: CW, h: 1.45, rectRadius: 0.07, fill: { color: r[2] },
    });
    s.addText(r[0], {
      x: M + 0.4, y: y + 0.12, w: 4.0, h: 0.4,
      fontFace: BODY, fontSize: 14, bold: true, color: r[3], charSpacing: 1, margin: 0, valign: "middle",
    });
    const n = r[1].length;
    const bw = 2.6, bg = 0.5;
    r[1].forEach((label, i) => {
      const x = M + 0.4 + i * (bw + bg);
      s.addShape(p.ShapeType.roundRect, {
        x, y: y + 0.6, w: bw, h: 0.62, rectRadius: 0.08,
        fill: { color: ri === 0 ? WHITE : GREIGE_LT },
      });
      s.addText(label, {
        x, y: y + 0.6, w: bw, h: 0.62, align: "center", valign: "middle",
        fontFace: BODY, fontSize: 16, bold: true, color: PLUM, margin: 0,
      });
      if (i < n - 1) {
        s.addShape(p.ShapeType.triangle, {
          x: x + bw + 0.19, y: y + 0.83, w: 0.12, h: 0.17, rotate: 90,
          fill: { color: ri === 0 ? MUTED : ROSE },
        });
      }
    });
  });
  s.addText("お客様の行動が変わり、行動が変わるから、また来てくださるようになります。", {
    x: M, y: 6.05, w: CW, h: 0.5,
    fontFace: BODY, fontSize: 17, color: PLUM, margin: 0, valign: "middle",
  });
  s.addNotes("「順番を変えるだけ」を強調する。");
}

function sevenMap(p, ch) {
  const s = contentSlide(p, ch, "選ばれている方が、整えている7つ", "今日は覚えなくて大丈夫です。地図として見てください");
  const steps = [
    ["価値の言語化", "資格名ではなく「その人がどうなるか」で説明できる"],
    ["選ばれる理由", "どんな方の、どんな困りごとに応えるかがはっきりしている"],
    ["商品の3層", "試す入口・変化を届ける本命・続けて選ばれるもの"],
    ["発信の設計", "思いつきではなく、見る人の気持ちの順番に沿っている"],
    ["販売の導線", "見た方が、次にどこへ行けばいいかがつながっている"],
    ["セッションの設計", "聞く → 気づいていただく → それから診断する"],
    ["仕組み化", "毎回同じことを手作業でやらない。だから疲れない"],
  ];
  steps.forEach((st, i) => {
    const y = 2.3 + i * 0.62;
    s.addShape(p.ShapeType.roundRect, {
      x: M, y, w: CW, h: 0.54, rectRadius: 0.05, fill: { color: i % 2 === 0 ? GREIGE_LT : GREIGE },
    });
    numCircle(p, s, M + 0.16, y + 0.09, 0.36, i + 1, PLUM, ROSE_LT, 12);
    s.addText(st[0], {
      x: M + 0.66, y, w: 2.9, h: 0.54,
      fontFace: BODY, fontSize: 15, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText(st[1], {
      x: M + 3.6, y, w: CW - 3.9, h: 0.54,
      fontFace: BODY, fontSize: 13.5, color: INK, margin: 0, valign: "middle",
    });
  });
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 6.75, w: CW, h: 0.5, rectRadius: 0.06, fill: { color: ROSE_LT },
  });
  s.addText("これは、やることリストではありません。今どこにいるかを知るための地図です。", {
    x: M, y: 6.75, w: CW, h: 0.5, align: "center", valign: "middle",
    fontFace: BODY, fontSize: 15, bold: true, color: PLUM, margin: 0,
  });
  s.addNotes("最後の1行が最重要。ゆっくり言う。「7つもやるのか」と思わせない。");
}

function goUp(p, ch) {
  statementSlide(p, ch,
    "詰まったら、\n必ず一つ上に戻る。",
    "「インスタのネタが思いつかない」は、4番目の発信の問題に見えます。\nでも実際は、1番目と2番目が決まっていないことがほとんどです。\n誰にどんな価値を届けるか決まっていないのに、ネタだけ探しても出てきません。",
    "これを知っているだけで遠回りが減る、と添える。");
}

function fourChecks(p, ch) {
  const s = contentSlide(p, ch, "あなたは、どこが空いていますか", "4つだけ。心の中で、はい・いいえで答えてみてください");
  const qs = [
    "自分の価値を、資格名を使わずにひとことで言えますか",
    "お客様が本当に困っていることを、その方の言葉で言えますか",
    "診断のあとに続く商品が、ありますか",
    "セッションで、自分より、お客様が話す時間のほうが長いですか",
  ];
  qs.forEach((t, i) => {
    const y = 2.4 + i * 0.92;
    s.addShape(p.ShapeType.roundRect, {
      x: M, y, w: CW, h: 0.78, rectRadius: 0.06, fill: { color: GREIGE_LT },
    });
    numCircle(p, s, M + 0.24, y + 0.14, 0.5, i + 1, PLUM, ROSE_LT, 17);
    s.addText(t, {
      x: M + 1.0, y, w: CW - 1.4, h: 0.78,
      fontFace: BODY, fontSize: 17, color: INK, margin: 0, valign: "middle",
    });
  });
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 6.15, w: CW, h: 0.85, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("「いいえ」がついた中で、一番小さい番号。そこがあなたの現在地です。", {
    x: M, y: 6.15, w: CW, h: 0.85, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 22, bold: true, color: WHITE, margin: 0,
  });
  s.addNotes("★沈黙を入れる。すぐ次に行かない。視聴者が自分の中で答える時間を作る。");
}

function mostCommon(p, ch) {
  statementSlide(p, ch,
    "いちばん多いのは、\n1番と2番です。",
    "みなさん、集客が課題だと思っていらっしゃいます。でも実際は、その手前で止まっています。\nそして1番と2番は、一人ではとても見つけにくい。自分の価値は、自分では当たり前すぎて見えないからです。\n「こんなの誰でもできる」と思っていたことが、実は一番の強みだった ―― 本当によくあります。",
    "ここで初めて「一人では難しい」に着地させる。押しつけない。");
}

function consult(p, ch) {
  const s = contentSlide(p, ch, "個別相談で、一緒に整理します", "あなたの現在地を、一緒に言葉にしていく時間です");
  const items = [
    "いま、どこで詰まっているのか",
    "あなたの強みは何で、それをどう言葉にするか",
    "診断のあとに、どんな商品があるといいか",
    "サービス型か、物販型か、その両方か",
  ];
  items.forEach((t, i) => {
    const x = M + (i % 2) * 5.93;
    const y = 2.3 + Math.floor(i / 2) * 0.85;
    s.addShape(p.ShapeType.roundRect, {
      x, y, w: 5.6, h: 0.72, rectRadius: 0.06, fill: { color: GREIGE_LT },
    });
    s.addText("・　" + t, {
      x: x + 0.3, y, w: 5.0, h: 0.72,
      fontFace: BODY, fontSize: 15, color: INK, margin: 0, valign: "middle",
    });
  });
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 4.15, w: CW, h: 1.0, rectRadius: 0.07, fill: { color: ROSE_LT },
  });
  s.addText("売り込みの時間ではありません。わたしのほうが、聞いている時間が長い時間です。", {
    x: M, y: 4.15, w: CW, h: 1.0, align: "center", valign: "middle",
    fontFace: BODY, fontSize: 18, bold: true, color: PLUM, margin: 0,
  });
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 5.4, w: CW, h: 1.15, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("お話をうかがって、わたしがお役に立てないと思ったら、正直にそうお伝えします。", {
    x: M, y: 5.4, w: CW, h: 1.15, align: "center", valign: "middle",
    fontFace: BODY, fontSize: 18, color: GREIGE, margin: 0,
  });
  s.addNotes("押さない。正直に断ることもあると言うと、かえって信頼される。");
}

function whoFor(p, ch) {
  const s = contentSlide(p, ch, "こんな方に、お会いしたいです", null);
  ["資格は取ったけれど、そこから先が分からない方",
    "単発の診断で、少し疲れてきてしまった方",
    "お客様に、もっと深いところで役に立ちたい方"].forEach((t, i) => {
    const y = 2.2 + i * 0.85;
    s.addShape(p.ShapeType.roundRect, {
      x: M, y, w: CW, h: 0.72, rectRadius: 0.06, fill: { color: GREIGE_LT },
    });
    s.addText(t, {
      x: M + 0.4, y, w: CW - 0.8, h: 0.72,
      fontFace: BODY, fontSize: 18, color: INK, margin: 0, valign: "middle",
    });
  });
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 5.0, w: CW, h: 1.5, rectRadius: 0.07, fill: { color: GREIGE },
  });
  s.addText("逆に「とにかく早く稼ぐ方法だけ知りたい」という方には、合いません。", {
    x: M + 0.5, y: 5.15, w: CW - 1.0, h: 0.5,
    fontFace: BODY, fontSize: 17, bold: true, color: PLUM, margin: 0, valign: "middle",
  });
  s.addText("わたしがお伝えしているのは、時間はかかるけれど、長く続く形だからです。", {
    x: M + 0.5, y: 5.7, w: CW - 1.0, h: 0.5,
    fontFace: BODY, fontSize: 16, color: INK, margin: 0, valign: "middle",
  });
  s.addNotes("合わない人を明示すると、合う人の申込みの質が上がる。");
}

function closing(p, ch, thanksLine) {
  const s = p.addSlide();
  s.background = { color: PLUM };
  chapter(s, ch, true);

  s.addShape(p.ShapeType.ellipse, { x: 9.1, y: 1.9, w: 3.3, h: 3.3, fill: { color: PLUM_DK } });
  s.addShape(p.ShapeType.ellipse, {
    x: 9.1, y: 1.9, w: 3.3, h: 3.3, fill: { color: PLUM, transparency: 100 },
    line: { color: ROSE, width: 1.25 },
  });
  s.addText("7", {
    x: 9.1, y: 1.9, w: 3.3, h: 3.3, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 120, bold: true, color: ROSE_LT, margin: 0,
  });

  s.addText(thanksLine, {
    x: M, y: 1.95, w: 7.8, h: 0.45,
    fontFace: BODY, fontSize: 15, color: ROSE_LT, margin: 0, valign: "middle",
  });
  s.addText("「売れる」は結果。\n「選ばれる」が原因。", {
    x: M, y: 2.5, w: 7.8, h: 1.8,
    fontFace: HEAD, fontSize: 36, bold: true, color: WHITE, margin: 0, valign: "middle", lineSpacing: 58,
  });
  s.addText("そしてそれは、センスではなく、順番で作れます。", {
    x: M, y: 4.45, w: 7.8, h: 0.5,
    fontFace: BODY, fontSize: 17, color: GREIGE, margin: 0, valign: "middle",
  });
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 5.3, w: 5.4, h: 0.8, rectRadius: 0.12, fill: { color: GREIGE_LT },
  });
  s.addText("個別相談は LINE から", {
    x: M, y: 5.3, w: 5.4, h: 0.8, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 21, bold: true, color: PLUM, margin: 0,
  });
  s.addText("えりりん　／　ファッション心理学者・大学教授", {
    x: M, y: 6.35, w: 7.8, h: 0.4,
    fontFace: BODY, fontSize: 12.5, color: MUTED, charSpacing: 1, margin: 0, valign: "middle",
  });
  s.addNotes("最後は感謝で締める。申込URLはLINEの文面側に置く。");
}

/* =========================================================
   デッキ組み立て
   ========================================================= */

/** 1本版（全19枚）：LINE登録直後に配信する22分の本編 */
function buildSingle() {
  const p = new pptxgen();
  p.layout = "LAYOUT_WIDE";
  p.author = "Fashion Entrepreneurship Academia";
  p.title = "資格を取ったのに、なぜ選ばれないのか";

  coverSingle(p);        // 1
  agendaSingle(p);       // 2
  symptoms(p, "");       // 3
  notSense(p, "");       // 4
  commodity(p, "");      // 5
  notChange(p, "");      // 6
  voices(p, "");         // 7
  kannen(p, "");         // 8
  knowledge(p, "");      // 9
  threePhases(p, "");    // 10
  gapSuit(p, "");        // 11
  orderChange(p, "");    // 12
  sevenMap(p, "");       // 13
  goUp(p, "");           // 14
  fourChecks(p, "");     // 15
  mostCommon(p, "");     // 16
  consult(p, "");        // 17
  whoFor(p, "");         // 18
  closing(p, "", "最後までご覧いただき、ありがとうございました"); // 19

  return p.writeFile({ fileName: "無料動画スライド_1本版.pptx" });
}

/** 3本版（全23枚）：会員サイトの無料コース（3レッスン） */
function buildThree() {
  const p = new pptxgen();
  p.layout = "LAYOUT_WIDE";
  p.author = "Fashion Entrepreneurship Academia";
  p.title = "無料ミニ講座 ― 選ばれるファッションのお仕事";

  // レッスン1（1-7）
  coverChapter(p, 1, "パーソナルスタイリスト／イメージコンサルタントの方へ",
    "資格を取ったのに、\nなぜ選ばれないのか", "約10分",
    "冒頭15秒が勝負。名乗りより先にタイトルを言ってもいい。");
  symptoms(p, "レッスン 1");
  notSense(p, "レッスン 1");
  commodity(p, "レッスン 1");
  notChange(p, "レッスン 1");
  {
    const s = contentSlide(p, "レッスン 1", "これは、意志の問題ではありません", "あなたの説明が下手だからでもありません");
    s.addShape(p.ShapeType.roundRect, {
      x: M, y: 2.4, w: CW, h: 1.3, rectRadius: 0.07, fill: { color: ROSE_LT },
    });
    s.addText("ここには、まったく別の理由があります。", {
      x: M, y: 2.4, w: CW, h: 1.3, align: "center", valign: "middle",
      fontFace: HEAD, fontSize: 30, bold: true, color: PLUM, margin: 0,
    });
    s.addText("この理由が分かると", {
      x: M, y: 3.95, w: CW, h: 0.4,
      fontFace: BODY, fontSize: 15, bold: true, color: ROSE_DK, charSpacing: 2, margin: 0, valign: "middle",
    });
    ["同じ診断をしても、お客様の変わり方がまったく違ってきます",
      "単発の診断で疲れてしまう働き方からも、抜けられます"].forEach((t, i) => {
      const y = 4.45 + i * 0.85;
      s.addShape(p.ShapeType.roundRect, {
        x: M, y, w: CW, h: 0.72, rectRadius: 0.06, fill: { color: GREIGE_LT },
      });
      numCircle(p, s, M + 0.28, y + 0.14, 0.44, i + 1, PLUM, ROSE_LT, 15);
      s.addText(t, {
        x: M + 0.95, y, w: CW - 1.3, h: 0.72,
        fontFace: BODY, fontSize: 18, color: INK, margin: 0, valign: "middle",
      });
    });
    s.addNotes("次のレッスンへの引き。理由そのものはここでは言わない。");
  }
  nextSlide(p, 1, "次のレッスン", "お客様が変わらない、\n本当の理由",
    "「たぶん聞いたことがない話です」と添える。");

  // レッスン2（8-15）
  coverChapter(p, 2, "無料ミニ講座 2本目",
    "お客様が変わらない、\n本当の理由", "約12分　／　3本の中で、いちばんお伝えしたい回です",
    "3本の中心。ここで「この人は他と違う」と思ってもらう。");
  voices(p, "レッスン 2");
  kannen(p, "レッスン 2");
  knowledge(p, "レッスン 2");
  threePhases(p, "レッスン 2");
  gapSuit(p, "レッスン 2");
  orderChange(p, "レッスン 2");
  nextSlide(p, 2, "次のレッスン・最終回", "選ばれている人が、\n整えている7つ",
    "「自分がどこで止まっているか分かるチェックもあります」と予告する。");

  // レッスン3（16-23）
  coverChapter(p, 3, "無料ミニ講座 3本目（最終回）",
    "選ばれている人が、\n整えている7つ", "約12分　／　やることリストではなく、現在地を知るための地図です",
    "地図を渡して現在地を自覚してもらう。「7つもやるのか」と思わせないこと。");
  sevenMap(p, "レッスン 3");
  goUp(p, "レッスン 3");
  fourChecks(p, "レッスン 3");
  mostCommon(p, "レッスン 3");
  consult(p, "レッスン 3");
  whoFor(p, "レッスン 3");
  closing(p, "レッスン 3", "3日間、ありがとうございました");

  return p.writeFile({ fileName: "無料ミニ講座スライド_3本版.pptx" });
}

buildSingle()
  .then((f) => { console.log("created:", f); return buildThree(); })
  .then((f) => console.log("created:", f));
