// Post-game Endless Goals: the epilogue starts three goals (one Delve, one Shop, one Craft) on a "Storyline Complete!"
// Journal card; goals pay out, get replaced and scale with the tier; every 5th and 10th completion add bonuses;
// everything carries through a Grand Reopening; a save that finished before this update gets the goals and prompt once.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const b=await chromium.launch();const errs=[];const H=fs.readFileSync(path.join(__dirname,'helpers.js'),'utf8');
const open=async(save)=>{const p=await b.newPage({viewport:{width:390,height:844}});p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+path.join(__dirname,'..','index.html'));await p.evaluate(s=>{localStorage.clear();if(s)localStorage.setItem(KEY,s)},save);await p.reload();
  await p.addScriptTag({content:H});return p};
// fast-forward to just before the epilogue
const toEnd=`T.through();const st=S.story;for(let c=1;c<=6;c++){for(const g of chGoals(c))st.goals[g.id]=S.day;st.flags["ch"+c+"done"]=S.day;if(c<6)st.flags["ch"+c+"ended"]=S.day}
  for(const id of Object.keys(SCN))if(/^[1-6]\\./.test(id))st.seen[id]=S.day;for(const t in TIPS)st.tips[t]=st.tips[t]||S.day;delete st.tips.t_endless;delete st.tips.h_fest;
  st.ch=6;st.debtPaid=DEBT_PAYMENTS;st.items.weapon=S.day;for(const k of ["well","tavern","apothecary","smithy","market","watch","obs"])st.built[k]=S.day;
  for(const f of ["mine","vault","hollow","vossDone"])st.flags[f]=S.day;st.tipQ=[];st.queue=[];hlClear();`;
const p=await open();
const r=await p.evaluate(toEnd=>{const o={};eval(toEnd);const st=S.story;
  o.noneBefore=!st.endless;
  endDay();const tipsSeen=[];let n=0;while((scn||tipOpen||st.hl)&&n<50){if(scn)scnGo("next");else if(tipOpen){tipsSeen.push(tipOpen);document.querySelector('#ov [data-act=tipOk]').click()}else{if(st.hl==="t_endless"){tab="town";render();o.tabHl=!!app.querySelector('.hl[data-t="journal"]');tab="journal";render();o.cardHl=!!document.querySelector('#endless.hl')}hlClear();playNext()}n++}
  o.ended=!!st.ended;o.prompt=tipsSeen.includes("t_endless");o.tabHl=!!o.tabHl;o.cardHl=!!o.cardHl;
  const E=st.endless;o.three=E&&E.goals.length===3&&E.tier===1&&E.done===0;
  o.oneEach=E.goals.map(g=>EGP(g.k).cat).sort().join()==="craft,delve,shop";
  tab="journal";render();const card=document.getElementById("endless");
  o.title=/Storyline Complete!/.test(card.textContent)&&/Goals completed: 0/.test(card.textContent)&&!/Chapter 6/.test(card.querySelector('.jtitle').textContent);
  o.bars=card.querySelectorAll('.bar').length===3&&/ · 0 \/ /.test(card.textContent);
  o.logKept=st.journal.some(e=>/Sable checks on him once a month/.test(e.text))&&/Sable checks on him/.test(app.textContent);
  // tier 1 targets and scaling
  o.tier1=["kill:15","floor:4","boss:1","stair:1","sell:10","haggle:5","earn:2000","coll:3","craft:5","kit:3"].every(x=>{const [k,n]=x.split(":");return egTarget(EGP(k),1)===+n});
  o.scale=egTarget(EGP("sell"),2)===12&&egTarget(EGP("sell"),5)===17&&egTarget(EGP("earn"),3)===2650;
  const fg=egMake("floor",30);o.floorCap=fg.n===DUN[fg.d].floors;
  // complete a craft goal by crafting bombs; it pays out and is replaced by a new craft goal at tier 2
  T.rich();S.mats.ember=0;S.mats.ore=0;S.mats.dust=0;S.legacy.stars=0;
  const ci=()=>E.goals.findIndex(g=>EGP(g.k).cat==="craft");E.goals[ci()]=egMake("kit",1);
  const bomb=RECIPES.findIndex(x=>x.out==="bomb");const g0=S.gold;
  for(let i=0;i<3;i++){craft(bomb);T.through()}
  o.progress=true;o.paid=E.done===1&&E.tier===2&&S.gold-g0===1000&&/Goal complete! \+1,000G/.test(E.last.replace(/<[^>]+>/g,""));
  const ng=E.goals[ci()];o.replaced=EGP(ng.k).cat==="craft"&&ng.tier===2&&ng.p===0&&ng.n===egTarget(EGP(ng.k),2)&&ng.k!=="kit";
  // keep completing craft goals up to 10: the 5th adds materials, the 10th a star
  let at5=null,g9=0,tries2=0;while(E.done<10&&tries2++<400){S.mats.scrap=50;S.mats.gel=50;const before=E.done;craft(bomb);T.through();if(E.done===5&&before===4)at5={e:S.mats.ember,o:S.mats.ore,d:S.mats.dust,s:S.legacy.stars};if(E.done===9&&before===8)g9=S.legacy.stars}
  o.fifth=!!at5&&at5.e===2&&at5.o===2&&at5.d===1&&at5.s===0;o.tenth=g9===0&&S.legacy.stars===1&&S.mats.ember===4&&E.tier===11;
  // shop events: a haggled sale above market to the Spoon Man
  const si=E.goals.findIndex(g=>EGP(g.k).cat==="shop");E.goals[si]=egMake("coll",1);SE("sale",{above:true,haggled:true,price:500,type:"coll",reg:"the Spoon Man"});
  o.spoonDouble=E.goals[si].p===2;
  E.goals[si]=egMake("earn",1);SE("sale",{above:false,haggled:false,price:1500,type:"town"});SE("sold",{n:2,g:400});o.earnDay=E.goals[si].p===1900;
  S.day++;render();o.earnResets=egProg(E.goals[si])===0;
  // delve events: defeating monsters counts
  const di=E.goals.findIndex(g=>EGP(g.k).cat==="delve");E.goals[di]=egMake("kill",1);
  const R=T.delve(0);let tries=0;while(E.goals[di].p<2&&tries<300){R.hp=99999;R.steps=0;explore();T.through();T.win();tries++}
  o.kills=E.goals[di].p>=2;T.home();
  return o},toEnd);
// Grand Reopening keeps goals, progress, tier and count
const keep=await p.evaluate(()=>{const E=S.story.endless,snap=JSON.stringify(E);S.story.loan=0;doReopen();T.through();
  return JSON.stringify(S.story.endless)===snap&&S.story.endless.done===10&&S.story.endless.tier===11});
r.reopenKeeps=keep;
// a save that finished the game before Endless Goals
const old=await p.evaluate(()=>{const st=S.story;delete st.endless;delete st.flags.tut4;delete st.tips.t_endless;st.tipQ=[];st.hl=null;save();return localStorage.getItem(KEY)});
const p2=await open(old);
r.oldSave=await p2.evaluate(()=>{const E=S.story.endless;const ok=E&&E.goals.length===3&&E.tier===1&&E.done===0;
  const prompt=tipOpen==="t_endless"||S.story.tipQ.includes("t_endless");T.through();tab="journal";render();
  return ok&&prompt&&/Storyline Complete!/.test(document.getElementById("endless").textContent)});
const again=await p2.evaluate(()=>{save();return localStorage.getItem(KEY)});
const p3=await open(again);
r.promptOnce=await p3.evaluate(()=>tipOpen!=="t_endless"&&!S.story.tipQ.includes("t_endless"));
console.log(JSON.stringify(r));const bad=Object.entries(r).filter(([k,v])=>v===false||v===null).map(([k])=>k);
if(bad.length||errs.length){console.log("FAIL",bad.join(", "),errs);process.exit(1)}await b.close()})();
