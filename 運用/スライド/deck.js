const SP='/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad';
const pptxgen=require(SP+'/node_modules/pptxgenjs');
const p=new pptxgen();
p.layout='LAYOUT_16x9';           // 10 x 5.625
const BERRY='6D2E46', ROSE='A26769', CREAM='ECE2D0', INK='2B2B2B', W='FFFFFF', MUTED='7A6A6E';
const F='Yu Gothic';
const M=0.62, CW=10-M*2;

function bg(s,c){ s.background={color:c}; }
function title(s,t,col){
  s.addText(t,{x:M,y:0.42,w:CW,h:0.75,fontSize:30,bold:true,color:col||BERRY,fontFace:F,isTextBox:true,margin:0,valign:'middle'});
}
function dot(s,x,y,n,c){
  s.addShape(p.ShapeType.ellipse,{x,y,w:0.46,h:0.46,fill:{color:c||BERRY}});
  s.addText(String(n),{x,y,w:0.46,h:0.46,fontSize:16,bold:true,color:W,align:'center',valign:'middle',fontFace:F,isTextBox:true,margin:0});
}
function card(s,x,y,w,h,c){ s.addShape(p.ShapeType.roundRect,{x,y,w,h,rectRadius:0.08,fill:{color:c||'F7F3F1'}}); }
function section(n,t,sub){
  const s=p.addSlide(); bg(s,BERRY);
  s.addText(n,{x:M,y:1.5,w:1.2,h:0.6,fontSize:15,bold:true,color:ROSE,fontFace:F,isTextBox:true,margin:0});
  s.addText(t,{x:M,y:2.05,w:CW,h:1.0,fontSize:40,bold:true,color:W,fontFace:F,isTextBox:true,margin:0});
  if(sub) s.addText(sub,{x:M,y:3.15,w:CW,h:0.6,fontSize:15,color:CREAM,fontFace:F,isTextBox:true,margin:0});
  return s;
}
function body(s,x,y,w,txt,size,col){
  s.addText(txt,{x,y,w,h:0.4,fontSize:size||15,color:col||INK,fontFace:F,isTextBox:true,margin:0,lineSpacing:24});
}

/* 1 表紙 */
let s=p.addSlide(); bg(s,BERRY);
s.addText('ファッション起業AIマスター講座',{x:M,y:1.35,w:CW,h:0.5,fontSize:16,color:ROSE,bold:true,fontFace:F,isTextBox:true,margin:0});
s.addText('3カ国で見てきたことを、\nAIで発信に変える90分',{x:M,y:1.85,w:CW,h:1.6,fontSize:36,bold:true,color:W,fontFace:F,isTextBox:true,margin:0,lineSpacing:48});
s.addText('2026年9月16日（水）21:00-22:30　／　松岡依里子',{x:M,y:3.75,w:CW,h:0.4,fontSize:14,color:CREAM,fontFace:F,isTextBox:true,margin:0});
s.addNotes('カメラはオフのままで結構です、途中退出も可、と最初に伝える。');

/* 2 今日の90分 */
s=p.addSlide(); bg(s,W); title(s,'今日の90分');
const flow=[['前半 45分','3カ国で見てきたこと／それをどうリールにしたか'],['後半 45分','10月から始まる講座のご案内と、ご質問']];
flow.forEach((r,i)=>{ const y=1.45+i*1.15; card(s,M,y,CW,0.95);
  s.addText(r[0],{x:M+0.3,y:y,w:2.2,h:0.95,fontSize:17,bold:true,color:BERRY,fontFace:F,isTextBox:true,margin:0,valign:'middle'});
  s.addText(r[1],{x:M+2.6,y:y,w:CW-2.9,h:0.95,fontSize:14,color:INK,fontFace:F,isTextBox:true,margin:0,valign:'middle'});});
card(s,M,3.95,CW,1.05,CREAM);
s.addText('先にお伝えしておきます。後半の20分は、講座のご案内です。\n身構えずに聞いてください。合わなければ、見送ってくださってかまいません。',
 {x:M+0.3,y:4.1,w:CW-0.6,h:0.8,fontSize:14,color:BERRY,bold:true,fontFace:F,isTextBox:true,margin:0,lineSpacing:22});

/* 3 自己紹介 */
s=p.addSlide(); bg(s,W); title(s,'松岡依里子');
const me=['ファッション心理学の研究者／大学教授','ファッション起業アカデミア 主宰','長く専業主婦。50歳を過ぎてから猛勉強して大学教授に','研究テーマは「服が自信に変わる仕組み」'];
me.forEach((t,i)=>{ const y=1.5+i*0.72; dot(s,M,y,i+1); body(s,M+0.72,y+0.05,CW-0.8,t,15); });
card(s,M,4.55,CW,0.62,CREAM);
s.addText('自分のことをあきらめなければ、いくつからだって夢は叶う',{x:M+0.3,y:4.66,w:CW-0.6,h:0.4,fontSize:15,bold:true,color:BERRY,fontFace:F,isTextBox:true,margin:0});

/* 4 セクション1 */
section('01','3カ国で見てきたこと','ソウル・パリ・ニューヨーク　2026年・実地');

/* 5 結論 */
s=p.addSlide(); bg(s,W); title(s,'先に結論です');
s.addText('ソウル　パリ　ニューヨーク',{x:M,y:4.35,w:5.3,h:0.4,fontSize:14,color:MUTED,fontFace:F,isTextBox:true,margin:0});
s.addText('3カ国とも、\n日常のベースは\nむしろ普通でした',{x:M,y:1.5,w:5.3,h:2.4,fontSize:34,bold:true,color:BERRY,fontFace:F,isTextBox:true,margin:0,lineSpacing:52});
card(s,6.2,1.5,3.2,2.6);
s.addText('毎日フル装備の方は、\n見かけませんでした。\n\n思っていたのとは、\n違いました。',{x:6.45,y:1.85,w:2.7,h:1.9,fontSize:14,color:INK,fontFace:F,isTextBox:true,margin:0,lineSpacing:23});

/* 6-8 3カ国 */
const three=[['ソウル','試行回数','安く、たくさん試して、違ったら次へ。\n流行を追うのではなく、つくっていました。'],
             ['パリ','一点突破','服そのものはオーソドックス。\n小物で、一点だけ効かせていました。'],
             ['ニューヨーク','スイッチ','昼はスニーカー、夜はドレス。\n靴だけ履き替えて、時間帯で切り替えていました。']];
s=p.addSlide(); bg(s,W); title(s,'やり方は、三者三様でした');
three.forEach((c,i)=>{ const x=M+i*3.02; card(s,x,1.45,2.82,2.9);
  s.addText(c[0],{x:x+0.25,y:1.7,w:2.3,h:0.4,fontSize:19,bold:true,color:BERRY,fontFace:F,isTextBox:true,margin:0});
  s.addText(c[1],{x:x+0.25,y:2.15,w:2.3,h:0.4,fontSize:15,bold:true,color:ROSE,fontFace:F,isTextBox:true,margin:0});
  s.addText(c[2],{x:x+0.25,y:2.65,w:2.35,h:1.6,fontSize:13,color:INK,fontFace:F,isTextBox:true,margin:0,lineSpacing:20});});
s.addText('けれど「自分で決めている」という一点だけは、どこも同じでした。',
 {x:M,y:4.75,w:CW,h:0.4,fontSize:16,bold:true,color:BERRY,fontFace:F,isTextBox:true,margin:0});

/* 9 売り場の言葉 */
s=p.addSlide(); bg(s,W); title(s,'売り場の言葉が、違いました');
card(s,M,1.45,4.28,2.5,'F7F3F1');
s.addText('ソウルの売り場',{x:M+0.28,y:1.68,w:3.7,h:0.35,fontSize:15,bold:true,color:BERRY,fontFace:F,isTextBox:true,margin:0});
s.addText('「あなたであれ、自信を持って」\n「他人の目から自由に、着たい服を」',{x:M+0.28,y:2.15,w:3.8,h:1.5,fontSize:14,color:INK,fontFace:F,isTextBox:true,margin:0,lineSpacing:23});
card(s,5.1,1.45,4.28,2.5,'F7F3F1');
s.addText('日本の売り場',{x:5.38,y:1.68,w:3.7,h:0.35,fontSize:15,bold:true,color:BERRY,fontFace:F,isTextBox:true,margin:0});
s.addText('「失敗しない選び方」\n同じ言葉を見た覚えがありません',{x:5.38,y:2.15,w:3.8,h:1.5,fontSize:14,color:INK,fontFace:F,isTextBox:true,margin:0,lineSpacing:23});
card(s,M,4.15,CW,0.95,CREAM);
s.addText('どちらが正しいかではありません。その社会が何を怖がっているかが、売り場の言葉に出ます。',
 {x:M+0.3,y:4.4,w:CW-0.6,h:0.5,fontSize:14,bold:true,color:BERRY,fontFace:F,isTextBox:true,margin:0});

/* 10 着地 */
s=p.addSlide(); bg(s,BERRY);
s.addText('「似合う」が分からなくなるのは',{x:M,y:1.35,w:CW,h:0.5,fontSize:18,color:CREAM,fontFace:F,isTextBox:true,margin:0});
s.addText('決める基準を、\n自分の外側に置いたときです',{x:M,y:1.9,w:CW,h:1.3,fontSize:28,bold:true,color:W,fontFace:F,isTextBox:true,margin:0,lineSpacing:44});
s.addText('私が、わたしのスタイリストになる',{x:M,y:3.5,w:CW,h:0.7,fontSize:30,bold:true,color:ROSE,fontFace:F,isTextBox:true,margin:0});
s.addNotes('可能自己（Markus & Nurius, 1986）。試着は「なりうる自分」の試着。');

/* 11 セクション2 */
section('02','それを、どうリールにしたか','画面をお見せしながら、全部公開します');

/* 12 AIに渡した3つ */
s=p.addSlide(); bg(s,W); title(s,'私がAIに渡したのは、3つだけです');
const three2=['使えそうな写真か動画','誰に来てほしいか','何を届けているか'];
three2.forEach((t,i)=>{ const y=1.55+i*0.82; dot(s,M,y,i+1); body(s,M+0.75,y+0.07,CW-0.9,t,17); });
card(s,M,4.15,CW,0.95,CREAM);
s.addText('プロンプトのテクニックは、ひとつも使っていません。',
 {x:M+0.3,y:4.4,w:CW-0.6,h:0.5,fontSize:16,bold:true,color:BERRY,fontFace:F,isTextBox:true,margin:0});

/* 13 数字 */
s=p.addSlide(); bg(s,W); title(s,'17本の結果を、全部お見せします');
const st=[['17本','7/22 - 8/29'],['66万回','合計再生数'],['3本','10万回超え']];
st.forEach((r,i)=>{ const x=M+i*3.02; card(s,x,1.5,2.82,1.5);
  s.addText(r[0],{x:x+0.2,y:1.68,w:2.4,h:0.72,fontSize:38,bold:true,color:BERRY,fontFace:F,isTextBox:true,margin:0});
  s.addText(r[1],{x:x+0.22,y:2.46,w:2.4,h:0.35,fontSize:13,color:MUTED,fontFace:F,isTextBox:true,margin:0});});
card(s,M,3.25,CW,1.75,'F7F3F1');
s.addText('いちばん伸びた1本　172,000回　「旅行にパンツを持っていくの、やめました」\nいちばん伸びなかった1本　2,122回　「6月に、ソウルを訪ねました」',
 {x:M+0.3,y:3.55,w:CW-0.6,h:1.1,fontSize:15,color:INK,fontFace:F,isTextBox:true,margin:0,lineSpacing:30});

/* 14 差 */
s=p.addSlide(); bg(s,W); title(s,'差は、表紙の一行にありました');
card(s,M,1.45,4.28,2.9,'F7F3F1');
s.addText('伸びない',{x:M+0.28,y:1.68,w:3.7,h:0.35,fontSize:15,bold:true,color:MUTED,fontFace:F,isTextBox:true,margin:0});
s.addText('報告型\n\n「6月に、ソウルを訪ねました」\n「一宮の、尾州に行きました」',{x:M+0.28,y:2.15,w:3.85,h:1.9,fontSize:13,color:INK,fontFace:F,isTextBox:true,margin:0,lineSpacing:23});
card(s,5.1,1.45,4.28,2.9,CREAM);
s.addText('伸びる',{x:5.38,y:1.68,w:3.7,h:0.35,fontSize:15,bold:true,color:BERRY,fontFace:F,isTextBox:true,margin:0});
s.addText('読み手の予想を打ち消す\n\n「旅行にパンツを持っていくの、やめました」\n「この暑いのに、なぜ黒を着るのですか」',{x:5.34,y:2.15,w:3.9,h:1.9,fontSize:13,color:INK,fontFace:F,isTextBox:true,margin:0,lineSpacing:23});
s.addText('素材は、みなさんの人生の中にあります。AIは、それを形にしているだけです。',
 {x:M,y:4.55,w:CW,h:0.4,fontSize:15,bold:true,color:BERRY,fontFace:F,isTextBox:true,margin:0});

/* 15 ワーク */
s=p.addSlide(); bg(s,CREAM); title(s,'書き出してみてください');
three2.forEach((t,i)=>{ const y=1.5+i*0.78; dot(s,M,y,i+1,BERRY); body(s,M+0.75,y+0.07,CW-0.9,t,17); });
card(s,M,4.0,CW,1.05,W);
s.addText('1つ目はすぐ書けます。止まるのは、2つ目と3つ目です。\nそこが、6ヶ月かけて言葉にしていくところです。',
 {x:M+0.3,y:4.2,w:CW-0.6,h:0.75,fontSize:14,color:BERRY,bold:true,fontFace:F,isTextBox:true,margin:0,lineSpacing:22});

/* 16 セクション3 */
section('03','講座のご案内','ファッション起業AIマスター講座　2026年10月15日 開講');

/* 17 何が身につくか */
s=p.addSlide(); bg(s,W); title(s,'この6ヶ月で学ぶこと');
const lr=[['AIを中心とした発信の動線設計','撮る・書く・届けるまで'],['ファッション心理学','感性と顧客心理を言葉にする'],['コーチングの基礎','押しつけずに、続く形にする']];
lr.forEach((r,i)=>{ const y=1.45+i*1.05; card(s,M,y,CW,0.9); dot(s,M+0.25,y+0.22,i+1);
  s.addText(r[0],{x:M+0.9,y:y,w:4.3,h:0.9,fontSize:16,bold:true,color:BERRY,fontFace:F,isTextBox:true,margin:0,valign:'middle'});
  s.addText(r[1],{x:M+5.25,y:y,w:3.4,h:0.9,fontSize:13,color:INK,fontFace:F,isTextBox:true,margin:0,valign:'middle'});});
s.addText('AIは、ゼロから作る道具ではありません。自分の中にあるものを展開する共同制作者です。',
 {x:M,y:4.72,w:CW,h:0.4,fontSize:14,bold:true,color:BERRY,fontFace:F,isTextBox:true,margin:0});

/* 18 AIが苦手な方へ */
s=p.addSlide(); bg(s,W); title(s,'AIが苦手でも大丈夫です');
card(s,M,1.5,CW,2.9,CREAM);
s.addText('AIが苦手な方には、使わないやり方もお伝えします。',{x:M+0.4,y:1.85,w:CW-0.8,h:0.45,fontSize:19,bold:true,color:BERRY,fontFace:F,isTextBox:true,margin:0});
s.addText('ただ、正直に申し上げます。\n動線を作る作業は、AIを使ったほうが圧倒的に楽です。\n\n好きになる必要はありません。使えるところだけ使ってください。',
 {x:M+0.4,y:2.45,w:CW-0.8,h:1.7,fontSize:15,color:INK,fontFace:F,isTextBox:true,margin:0,lineSpacing:27});

/* 19 向いていない方 */
s=p.addSlide(); bg(s,W); title(s,'先に、向いていない方をお伝えします');
const ng=[['今すぐ収入にしたい方','6ヶ月かかります'],['言われたとおりにやりたい方','自分の言葉を探す講座です']];
ng.forEach((r,i)=>{ const y=1.55+i*1.25; card(s,M,y,CW,1.05,'F7F3F1');
  s.addText(r[0],{x:M+0.35,y:y+0.15,w:CW-0.7,h:0.4,fontSize:18,bold:true,color:BERRY,fontFace:F,isTextBox:true,margin:0});
  s.addText(r[1],{x:M+0.35,y:y+0.6,w:CW-0.7,h:0.35,fontSize:14,color:INK,fontFace:F,isTextBox:true,margin:0});});
s.addText('当てはまる方は、今日は見送ってください。',{x:M,y:4.35,w:CW,h:0.5,fontSize:18,bold:true,color:BERRY,fontFace:F,isTextBox:true,margin:0});

/* 20 2つのコース */
s=p.addSlide(); bg(s,W); title(s,'違うのは、2つだけです');
s.addTable([
 [{text:'',options:{fill:{color:W}}},{text:'レギュラー',options:{bold:true,color:W,fill:{color:BERRY},align:'center'}},{text:'VIP',options:{bold:true,color:W,fill:{color:BERRY},align:'center'}}],
 [{text:'講座（月1回・計6回）'},{text:'1・4ヶ月目はハイブリッド\nほかはオンライン'},{text:'毎月すべて対面（東京）'}],
 [{text:'質問会（月1回・計6回）'},{text:'オンライン・合同'},{text:'オンライン・合同'}],
 [{text:'個別のZoom対応'},{text:'契約後すぐ／最終月の2回'},{text:'随時'}],
 [{text:'チャットサポート'},{text:'無制限'},{text:'無制限'}],
 [{text:'ランチ会'},{text:'4ヶ月目・合同'},{text:'4ヶ月目・合同'}],
],{x:M,y:1.4,w:CW,colW:[2.9,2.94,2.92],fontSize:12,fontFace:F,color:INK,border:{pt:0.5,color:'DDD5D2'},valign:'middle',rowH:0.42,margin:6});
s.addText('質問会もランチ会も、どちらのコースの方も一緒です。対面はハイブリッドなので、遠方の方はオンラインで参加できます。',
 {x:M,y:4.55,w:CW,h:0.5,fontSize:13,color:BERRY,bold:true,fontFace:F,isTextBox:true,margin:0,lineSpacing:20});

/* 21 受講料 */
s=p.addSlide(); bg(s,W); title(s,'受講料');
card(s,M,1.45,4.28,2.2,'F7F3F1');
s.addText('レギュラーコース',{x:M+0.3,y:1.68,w:3.7,h:0.35,fontSize:15,bold:true,color:BERRY,fontFace:F,isTextBox:true,margin:0});
s.addText('398,000円',{x:M+0.3,y:2.1,w:3.7,h:0.7,fontSize:32,bold:true,color:BERRY,fontFace:F,isTextBox:true,margin:0});
s.addText('定員10名',{x:M+0.3,y:2.95,w:3.7,h:0.35,fontSize:14,color:MUTED,fontFace:F,isTextBox:true,margin:0});
card(s,5.1,1.45,4.28,2.2,CREAM);
s.addText('VIPコース',{x:5.4,y:1.68,w:3.7,h:0.35,fontSize:15,bold:true,color:BERRY,fontFace:F,isTextBox:true,margin:0});
s.addText('660,000円',{x:5.4,y:2.1,w:3.7,h:0.7,fontSize:32,bold:true,color:BERRY,fontFace:F,isTextBox:true,margin:0});
s.addText('定員3名',{x:5.4,y:2.95,w:3.7,h:0.35,fontSize:14,color:MUTED,fontFace:F,isTextBox:true,margin:0});
s.addText('レギュラーは、講座6回・質問会6回・個別Zoom 2回・ランチ会で15回。1回あたり約26,500円です。\nお支払いは一括をお願いしています。分割をご希望の方はご相談ください。',
 {x:M,y:3.85,w:CW,h:1.0,fontSize:14,color:INK,fontFace:F,isTextBox:true,margin:0,lineSpacing:26});

/* 22 定員と締切 */
s=p.addSlide(); bg(s,W); title(s,'定員と締切');
const dl=[['お申し込み締切','2026年10月10日（土）'],['開講','2026年10月15日（木）'],['VIPコース','定員3名。埋まり次第、締め切ります']];
dl.forEach((r,i)=>{ const y=1.5+i*1.0; card(s,M,y,CW,0.85);
  s.addText(r[0],{x:M+0.35,y:y+0.22,w:3.0,h:0.4,fontSize:15,bold:true,color:MUTED,fontFace:F,isTextBox:true,margin:0});
  s.addText(r[1],{x:M+3.5,y:y+0.2,w:CW-3.9,h:0.45,fontSize:17,bold:true,color:BERRY,fontFace:F,isTextBox:true,margin:0});});
s.addText('毎月お会いして、Zoomでも随時お受けするので、3名がお約束を守れる限界です。',
 {x:M,y:4.6,w:CW,h:0.4,fontSize:13,color:INK,fontFace:F,isTextBox:true,margin:0});

/* 23 欠席 */
s=p.addSlide(); bg(s,W); title(s,'出られない回があっても大丈夫です');
const ab=['会員サイトがあります。動画の教材も順次増えています','欠席された回は、アーカイブでご覧いただけます','VIPの方には、その回のぶんを個別でおぎないます'];
ab.forEach((t,i)=>{ const y=1.55+i*0.85; dot(s,M,y,i+1); body(s,M+0.75,y+0.05,CW-0.9,t,15); });
card(s,M,4.15,CW,0.95,CREAM);
s.addText('6ヶ月のあいだには、どうしても出られない回が出てくると思います。',
 {x:M+0.3,y:4.4,w:CW-0.6,h:0.5,fontSize:15,bold:true,color:BERRY,fontFace:F,isTextBox:true,margin:0});

/* 24 今日決めなくていい */
s=p.addSlide(); bg(s,BERRY);
s.addText('今日、お決めいただかなくて大丈夫です',{x:M,y:1.5,w:CW,h:0.8,fontSize:28,bold:true,color:W,fontFace:F,isTextBox:true,margin:0});
s.addText('迷われている方には、個別相談をご用意しています。\n1対1で、合うかどうかを一緒に見る時間です。無料です。\n\n合わなければ、見送ってくださってかまいません。',
 {x:M,y:2.5,w:CW,h:1.8,fontSize:16,color:CREAM,fontFace:F,isTextBox:true,margin:0,lineSpacing:30});
s.addNotes('申し込みのURLと個別相談のURLを、チャットに貼る。');

/* 25 締め */
s=p.addSlide(); bg(s,W);
s.addText('今日の服は、誰が決めましたか。',{x:M,y:2.1,w:CW,h:0.9,fontSize:32,bold:true,color:BERRY,fontFace:F,isTextBox:true,margin:0});
s.addText('ご参加ありがとうございました。',{x:M,y:3.15,w:CW,h:0.4,fontSize:15,color:MUTED,fontFace:F,isTextBox:true,margin:0});

p.writeFile({fileName:SP+'/説明会_20260916.pptx'}).then(f=>console.log('written',f));
