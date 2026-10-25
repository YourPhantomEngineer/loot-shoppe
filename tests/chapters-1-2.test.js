const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:900}});const e=[];p.on('pageerror',x=>e.push(x.message));
await p.route(/fonts\.(googleapis|gstatic)/,r=>r.abort());
await p.goto('file://'+require('path').join(__dirname,'..','index.html'));
await p.addScriptTag({content:fs.readFileSync(require('path').join(__dirname,'helpers.js'),'utf8')});
await p.screenshot({path:'s11.png'});
const out=await p.evaluate(()=>{const L=[];const log=m=>L.push(m);
  log("start q="+S.story.queue+" ov="+!!scn+" tabs="+[...document.querySelectorAll('[data-act=tab]')].map(x=>x.dataset.t));
  T.through();log("after 1.1 tabs="+(render(),[...document.querySelectorAll('[data-act=tab]')].map(x=>x.dataset.t))+" goals="+T.goals());
  // delve mossy, stairs on floor 1
  T.delve(0);const R=S.run;R.steps=5;let g=0;while(!R.stairs&&g<200){R.hp=9999;explore();T.through();T.win();g++}
  log("stairs="+R.stairs+" goals="+T.goals());
  S.xp=30;addXp(1);T.home();
  log("home seen13="+seen("1.3")+" goals="+T.goals());
  T.sellAbove("dagger");log("after sale goals="+T.goals());
  tab="work";SE("tab",{t:"work"});T.through();S.mats.scrap=5;craft(RECIPES.findIndex(r=>r.out==="pick"));T.through();
  log("crafted goals="+T.goals()+" ch1done="+S.story.flags.ch1done+" ch="+S.story.ch);
  T.day();log("after day ch="+S.story.ch+" seen17="+seen("1.7")+" seen21="+seen("2.1")+" skills="+fl("skills")+" choice21="+S.story.choices["2.1"]);
  T.day();log("day2 seen22="+seen("2.2")+" crew="+S.crew+" goals="+T.goals());
  // mine locked
  log("mine open="+dunOpen(1));
  // well before slime
  S.gold=5000;S.mats.fiber=9;repair("well");log("well early built="+built("well"));
  T.delve(0);T.mini();T.boss();log("bosses goals="+T.goals()+" glass="+!!S.story.items.glass);T.home();
  payDebt();T.through();log("paid="+S.story.debtPaid+" goals="+T.goals());
  repair("well");T.through();log("well="+built("well")+" cust="+custN()+" ch="+S.story.ch+" mine="+dunOpen(1));
  log("seen="+Object.keys(S.story.seen).join(","));
  log("journal="+S.story.journal.map(j=>j.kind).join(","));
  return L});
console.log(out.join("\n"));console.log("errors",e);
await p.evaluate(()=>{tab="journal";render()});await p.screenshot({path:'journal.png',fullPage:true});
await b.close()})();
