const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const e=[];p.on('pageerror',x=>e.push(x.message));
await p.route(/fonts\.(googleapis|gstatic)/,r=>r.abort());
await p.goto('file://'+require('path').join(__dirname,'..','index.html'));
await p.addScriptTag({content:fs.readFileSync(require('path').join(__dirname,'helpers.js'),'utf8')});
const out=await p.evaluate(()=>{const L=[];const log=m=>L.push(m);
  // Ch2: repair the well before the payment, so Ch2 is still open
  T.through();T.delve(0);const R=S.run;R.steps=5;let g=0;while(!R.stairs&&g<300){R.hp=9999;explore();T.through();T.win();g++}
  S.xp=30;addXp(1);T.home();T.sellAbove("dagger");S.mats.scrap=(S.mats.scrap||0)+2;craft(RECIPES.findIndex(r=>r.out==="pick"));T.through();
  T.day();T.day();T.delve(0);T.mini();T.boss();T.home();S.mats.fiber=9;S.gold+=500;repair("well");T.through();
  log("ch="+S.story.ch+" paid="+S.story.debtPaid+" well="+built("well"));
  askReopen();T.through(0); // confirm
  // read the reopening cards before clicking through
  const cards=[];while(scn){const c=cardAt(scn.id,scn.i);cards.push(scn.id+": "+JSON.stringify(c.s).slice(0,160));scnGo("next")}
  log(cards.join("\n"));
  log("after: ch="+S.story.ch+" loan="+S.story.loan+" lender="+S.story.loanFrom);
  // try paying Maribel's debt while loan unpaid: Wren's line must appear
  S.gold=2000;payDebt();log("paid="+S.story.debtPaid+" tip="+TIPS[S.story.tipQ[0]]?.t);T.through();
  askReopen();log("reopen while loan: queued="+S.story.queue.includes("reopenAsk")+" tip="+TIPS[S.story.tipQ[0]]?.t);
  // chapter variant lines
  for(const c of [3,4,5,6]){S.story.ch=c;log("Ch"+c+" line: "+reopenLine())}
  S.story.ended=1;log("ended line: "+reopenLine());
  return L});
console.log(out.join("\n"));console.log("errors",e);await b.close()})();
