const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:900}});const p=await ctx.newPage();const e=[];p.on('pageerror',x=>e.push(x.message));
await ctx.route(/fonts\.(googleapis|gstatic)/,r=>r.abort());
await p.goto('file://'+require('path').join(__dirname,'..','index.html'));
await p.addScriptTag({content:fs.readFileSync(require('path').join(__dirname,'helpers.js'),'utf8')});
// ---------- 1. Full run, every optional hire declined; capture variant lines
const run1=await p.evaluate(()=>{const L=[];const log=m=>L.push(m);
  // record every card's text as it plays
  const texts={};const og=scnGo;scnGo=function(go){if(scn){const c=cardAt(scn.id,scn.i);(texts[scn.id]=texts[scn.id]||[]).push(JSON.stringify(c.s))}return og(go)};
  const D=1; // "Not now" on every optional hire; first option elsewhere
  const thr=()=>{let n=0;while((scn||tipOpen)&&n<400){if(tipOpen){document.querySelector('#ov [data-act=tipOk]').click();n++;continue}const c=cardAt(scn.id,scn.i);const opts=c.c;let go="next";
    if(opts){const no=opts.find(o=>o[1]==="no");go=no?no[1]:opts[0][1]}scnGo(go);n++}};
  T.through=thr;
  T.toCh3();T.rich();repair("tavern");thr();T.delve(1);T.mini();T.boss();T.home();T.day();
  T.rich();repair("smithy");thr();repair("apothecary");thr();payDebt();thr();
  T.rich();repair("market");thr();T.delve(2);T.mini();T.home();T.day();T.day();T.delve(2);T.boss();T.home();
  T.rich();repair("watch");thr();payDebt();thr();
  S.xp=xpFor(10)+3;SE("level",{lvl:10});thr();T.day();T.rich();repair("obs");thr();
  T.delve(3);T.mini();T.home();payDebt();thr();T.delve(3);T.boss();T.home();
  T.rich();forge();thr();T.delve(4);T.mini();const R=S.run;R.floor=5;R.stairs=true;R.nextMod=null;descend();thr();T.win();thr();T.home();
  log("ended="+!!S.story.ended+" crew="+S.crew.join("+")+" hiredEver="+JSON.stringify(S.story.hiredEver));
  log("board (met, not on staff): "+STAFF.filter(s=>s.need()&&!S.crew.includes(s.k)).map(s=>s.n).join(", "));
  log("can hire Marlo later: "+(hire("marlo",true),S.crew.includes("marlo")));
  const pick=(id,re)=>(texts[id]||[]).join(" ").match(re)?.[0]||"(missing)";
  log("4.4 Marlo variant: "+pick("4.4",/Because I've (watched|been selling)[^"]*/));
  log("5.2 Sable variant: "+pick("5.2",/You (did turn me away|'d have thrown me out)[^"]*/));
  log("5.5 Sable aside: "+pick("5.5",/(slipping in from the street, pale|after he leaves, pale)/));
  log("3.5i Greta idle (not hired): "+pick("3.5i",/stopping by the counter/));
  log("6.1 everyone speaks: "+["Bram","Marlo","Old Greta","Sable","Wren"].every(n=>(texts["6.1"]||[]).join(" ").includes(n)));
  log("scenes seen: "+Object.keys(S.story.seen).length+" / defined: "+Object.keys(SCN).filter(k=>!SCN[k].repeat).length);
  log("not seen: "+Object.keys(SCN).filter(k=>!SCN[k].repeat&&!seen(k)).join(","));
  return L});
console.log("=== 1. Full run, optional hires declined\n"+run1.join("\n"));

// ---------- 2. Gated items tried early (fresh game)
await p.evaluate(()=>{localStorage.clear()});await p.reload();await p.addScriptTag({content:fs.readFileSync(require('path').join(__dirname,'helpers.js'),'utf8')});
const run2=await p.evaluate(()=>{const L=[];const log=(k,ok)=>L.push((ok?"PASS ":"FAIL ")+k);
  T.through();T.rich();
  log("Skills tab hidden in Ch1",!fl("skills")&&(render(),!document.querySelector('[data-t=skills]')));
  log("Sunken Mine locked",!dunOpen(1));log("Ember Vault locked",!dunOpen(2));log("Starfall Spire locked",!dunOpen(3));log("Hollow Heart locked and hidden",!dunOpen(4));
  S.xp=xpFor(12);log("Spire still locked at level 12 in Ch1 (flags, not level)",!dunOpen(3));
  log("Town Well not available in Ch1",!canBuild(BLD("well")));
  repair("tavern");log("Tavern can't be repaired in Ch1",!built("tavern"));
  log("Pip can't be hired before meeting him",(hire("pip"),!S.crew.includes("pip")));
  log("Marlo can't be hired early",(hire("marlo"),!S.crew.includes("marlo")));
  const p0=S.story.debtPaid;payDebt();log("No debt payment in Ch1",S.story.debtPaid===p0);
  askReopen();log("No Grand Reopening before the Well",!S.story.queue.includes("reopenAsk")&&!scn);
  log("Bombs need the Apothecary",!canCraft(RECIPES.find(r=>r.out==="bomb")));
  log("Tier 3 recipes need the Smithy",!canCraft(RECIPES.find(r=>r.out==="halberd")));
  S.gold=1e6;for(let i=0;i<5;i++){const u=UPG[0];const c=upCost(u);if(S.gear.blade<gearCap("blade")){S.gold-=c;S.gear.blade++}}
  log("Gear capped at 3 without the Smithy",S.gear.blade===3&&gearCap("blade")===3);
  log("Can't forge Bram's blade early",!canForge());
  // jump to Ch2 to test the Well and the Smithy gates
  S.story.ch=2;S.story.chDay=S.day;S.story.seen["2.1"]=1;S.story.flags.met_pip=1;
  T.rich();repair("well");log("Well locked until the Slime Monarch's star-glass",!built("well"));
  S.story.ch=3;repair("smithy");log("Smithy locked until the Kobold Foreman",!built("smithy"));
  log("Only one payment per chapter: Ch3 allows payment 1-2, not 3",(S.story.debtPaid=2,!payDue()));
  // summit and Hollow floors
  log("Spire summit sealed until Ch5 goals 1-4",!!floorSealed(3,8));
  log("Hollow Heart final floor sealed until the blade",!!floorSealed(4,6));
  S.story.flags.vault=1;startDelve(2);T.through();const R=S.run;R.floor=6;R.stairs=true;R.nextMod=null;descend();log("Vault floors are never sealed",R.floor===7);T.home();
  S.story.goals.c5lv10=1;startDelve(3);T.through();S.run.floor=7;S.run.stairs=true;descend();log("Descend to the sealed summit is refused",S.run.floor===7);T.home();
  return L});
console.log("=== 2. Gated items tried early\n"+run2.join("\n"));

// ---------- 3. Old save (pre-story format)
await p.evaluate(()=>{localStorage.clear();localStorage.setItem("haggle-hollow-v1",JSON.stringify({day:42,gold:3100,xp:2600,inv:["sword","ruby","idol"],gear:{blade:4,armor:3,pack:2,shelf:3,sign:2},trend:{weapon:1.1,armor:1,potion:.9,trinket:1,gem:1.2},sold:120,earned:21000,hired:"marlo",staffs:{marlo:{sold:30,wageB:.2,rateB:.05}},bosses:{0:3,1:1,2:1},skills:{power:2,showman:2},legacy:{stars:4,perks:{conn:2,fortune:1},count:2,total:9},mats:{ore:5},keep:{ruby:true}}))});
await p.reload();await p.addScriptTag({content:fs.readFileSync(require('path').join(__dirname,'helpers.js'),'utf8')});
const run3=await p.evaluate(()=>{const L=[];const log=m=>L.push(m);
  log("loaded: day="+S.day+" gold="+S.gold+" lvl="+lvl()+" inv="+S.inv+" crew="+S.crew+" hired field gone="+(S.hired===undefined));
  log("story: ch="+S.story.ch+" queue="+S.story.queue+" playing="+(scn&&scn.id)+" skills tab="+fl("skills"));
  log("legacy -> reputation: stars="+S.legacy.stars+" (4 + refunded Old Connections 3+6) perks="+JSON.stringify(S.legacy.perks));
  log("showman removed="+(S.skills.showman===undefined)+" customers="+custN());
  T.through();log("after letter: ch="+S.story.ch+" seen 1.7="+seen("1.7")+" 2.1="+seen("2.1")+" journal="+S.story.journal.length);
  log("Mine now locked until Ch2 ends: "+!dunOpen(1));
  return L});
console.log("=== 3. Old save\n"+run3.join("\n"));
console.log("page errors:",e);await b.close()})();
