// Bombs scale with attack and show their damage. Each kind keeps its own strength and recipe;
// Blasting Powder unlocks stronger kinds, so old cheap bombs can't be upgraded after the fact.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.join(__dirname,'..','index.html'));await p.evaluate(()=>localStorage.clear());await p.reload();
await p.addScriptTag({content:fs.readFileSync(path.join(__dirname,'helpers.js'),'utf8')});
const r=await p.evaluate(()=>{const o={},ov=()=>document.querySelector('#ov:not([hidden]) .ovcard')?.textContent||"";T.through();
  const U=UPG.find(u=>u.k==="powder"),idx=k=>RECIPES.findIndex(x=>x.out===k);
  S.gold=99999;tab="upg";render();o.lockedBeforeApothecary=!canBuyUpgrade(U)&&/Needs the Apothecary/.test(app.querySelector('[data-act=up][data-k=powder]').textContent);
  S.story.built.apothecary=S.day;S.gear.blade=10;const atk=dmg();
  o.fireBomb=bombDmg("bomb")===Math.round(1.2*atk);
  // Workshop: Fire Bomb craftable, Blast Bomb shown but locked, stronger ones hidden
  S.mats={scrap:50,gel:50,ore:50,ember:50,dust:50};tab="work";render();
  const has=k=>!!app.querySelector(`[data-act=craft][data-i="${idx(k)}"]`),locked=k=>app.querySelector(`[data-act=craft][data-i="${idx(k)}"]`)?.getAttribute("aria-disabled")==="true";
  o.workshopRank0=has("bomb")&&!locked("bomb")&&has("bomb2")&&locked("bomb2")&&!has("bomb3");
  const n0=S.inv.length;app.querySelector(`[data-act=craft][data-i="${idx("bomb2")}"]`).click();o.lockedNotCrafted=S.inv.length===n0;
  // Upgrading doesn't change bombs already made
  craft(idx("bomb"));const old=bombDmg("bomb");tab="upg";render();
  for(let i=0;i<4;i++)app.querySelector('[data-act=up][data-k=powder]').click();
  o.oldBombUnchanged=S.gear.powder===4&&bombDmg("bomb")===old;
  o.starBomb=bombDmg("bomb5")===Math.round(3.6*atk)&&bombDmg("bomb5")>atk*3;
  tab="work";render();o.allUnlocked=["bomb2","bomb3","bomb4","bomb5"].every(k=>has(k)&&!locked(k));
  craft(idx("bomb5"));o.starCrafted=S.inv.includes("bomb5")&&S.mats.dust===49&&S.mats.ember===48;
  T.through();tab="town";render();app.querySelector('[data-act=info][data-k=bomb5]').click();o.tooltip=new RegExp(fmt(bombDmg("bomb5"))+" damage").test(ov())&&/Workshop/.test(ov());document.querySelector('#ov [data-act=infoOk]')?.click();
  // in a fight each chip shows its own damage, and the bomb deals it
  S.belt=["bomb","bomb5"];startDelve(0);T.through();S.run.hp=9999;let g=0;while(!S.run.fight&&g<300){explore();T.through();S.run.ev=null;g++}
  S.run.fight.hp=S.run.fight.max=99999;render();const chips=[...app.querySelectorAll('#usepanel [data-act=use]')];
  o.chips=chips[0].textContent.includes(fmt(bombDmg("bomb"))+" dmg")&&chips[1].textContent.includes(fmt(bombDmg("bomb5"))+" dmg");
  const before=S.run.fight.hp;chips[1].click();T.through();o.dealt=S.run.fight&&before-S.run.fight.hp===bombDmg("bomb5");
  S.gear.blade=0;S.run.d=3;S.run.floor=8;o.floorMinimum=bombDmg("bomb")===Math.round((10+8*3)*hfOf(DUN[3])*.8);
  return o});
await p.evaluate(()=>{localStorage.setItem(KEY,JSON.stringify(Object.assign(fresh(),{day:9,inv:["bomb","bomb"],gear:{blade:3,armor:2,pack:1,sign:0}})))});await p.reload();
r.oldSave=await p.evaluate(()=>S.gear.powder===0&&count(S.inv,"bomb")===2&&!isNaN(upCost(UPG.find(u=>u.k==="powder"))));
const bad=Object.entries(r).filter(([k,v])=>v!==true).map(([k])=>k);console.log(JSON.stringify(r));
if(bad.length||errs.length){console.log("FAIL",bad.join(", "),"errors:",errs);process.exit(1)}await b.close()})();
