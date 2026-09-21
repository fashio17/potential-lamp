// 利用規約_全文_2026年10月期.md → 利用規約.docx
// 直すのは .md のほうです。build.sh を動かすと HTML・Word・PDF が作り直されます。
//   cd /tmp/kw && npm install docx        （はじめてのときだけ）
//   node 運用/利用規約/build_docx.js
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  Footer, PageNumber, BorderStyle, convertMillimetersToTwip,
} = require('/tmp/kw/node_modules/docx');

const HERE = __dirname;
const SRC = path.join(HERE, '利用規約_全文_2026年10月期.md');
const OUT = path.join(HERE, '利用規約_2026年10月期.docx');

const MIN = 'Yu Mincho';        // Word 側で使う和文書体
const MIN_EA = '游明朝';         // 日本語版 Word 用

function run(text, opt = {}) {
  return new TextRun({
    text,
    bold: opt.bold || false,
    size: opt.size || 21,            // half-point。21 = 10.5pt
    color: opt.color || '000000',
    font: { name: MIN, eastAsia: MIN_EA, hAnsi: MIN },
  });
}

const src = fs.readFileSync(SRC, 'utf8');
const body = src.split('\n---\n')[1].trim();

const children = [];

// 表題
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 480 },
  children: [run('ファッション起業アカデミア　利用規約', { bold: true, size: 32 })],
}));

for (const raw of body.split(/\n\s*\n/)) {
  const block = raw.trim();
  if (!block) continue;

  if (block.startsWith('## ')) {
    // 条見出し
    children.push(new Paragraph({
      spacing: { before: 360, after: 120 },
      children: [run(block.slice(3).trim(), { bold: true, size: 23 })],
    }));
  } else if (block.startsWith('### ')) {
    // 第2条の中のコース名
    children.push(new Paragraph({
      spacing: { before: 200, after: 80 },
      indent: { left: convertMillimetersToTwip(4) },
      children: [run(block.slice(4).trim(), { bold: true })],
    }));
  } else if (block === '以上') {
    children.push(new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { before: 480 },
      children: [run('以上')],
    }));
  } else if (/^\d{4}年\d{1,2}月\d{1,2}日/.test(block)) {
    children.push(new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { before: 240 },
      children: [run(block.replace(/\n/g, '　'))],
    }));
  } else if (/^（\d+）/.test(block)) {
    // （1）〜（7）の各号。1行ずつ、ぶら下げインデント
    for (const line of block.split('\n')) {
      children.push(new Paragraph({
        spacing: { line: 300, after: 40 },
        indent: { left: convertMillimetersToTwip(10), hanging: convertMillimetersToTwip(6) },
        children: [run(line.trim())],
      }));
    }
  } else {
    // 項（1．2．…）と、ふつうの段落
    const indented = /^\d+．/.test(block);
    children.push(new Paragraph({
      spacing: { line: 300, after: 120 },
      indent: indented
        ? { left: convertMillimetersToTwip(6), hanging: convertMillimetersToTwip(6) }
        : undefined,
      children: [run(block.replace(/\n/g, ''))],
    }));
  }
}

// 末尾の連絡先
children.push(new Paragraph({
  spacing: { before: 600 },
  border: { top: { style: BorderStyle.SINGLE, size: 4, space: 12, color: 'CCCCCC' } },
  children: [run('ファッション起業アカデミア　／　Fashion Laboratory　松岡依里子', { size: 19, color: '555555' })],
}));

const doc = new Document({
  styles: { default: { document: { run: { font: { name: MIN, eastAsia: MIN_EA }, size: 21 } } } },
  sections: [{
    properties: {
      page: {
        margin: {
          top: convertMillimetersToTwip(25), bottom: convertMillimetersToTwip(25),
          left: convertMillimetersToTwip(22), right: convertMillimetersToTwip(22),
        },
      },
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({
            children: [PageNumber.CURRENT, ' / ', PageNumber.TOTAL_PAGES],
            size: 18, color: '888888',
            font: { name: MIN, eastAsia: MIN_EA },
          })],
        })],
      }),
    },
    children,
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUT, buf);
  console.log(OUT + ' を作りました（' + buf.length + ' バイト）');
});
