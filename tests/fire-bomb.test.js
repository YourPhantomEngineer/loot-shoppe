// Fire Bombs scale with attack, show their damage, and Blasting Powder upgrades them at a higher crafting cost.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.join(__dirname,'..','index.html'));await p.evaluate(()=>localStorage.clear());await p.reload();
await p.addScriptTag({content:fs.readFileSync(path.join(__dirname,'helpers.js'),'utf8')});
const r=await p.evaluate(()=>{const o={},ov=()=>document.querySelector('#ov:not([hidden]) .ovcard')?.textContent||"";T.through();
  const bombR=RECIPES.find(x=>x.out==="bomb"),U=UPG.find(u=>u.k==="powder");
  o.lockedBeforeApothecary=!canBuyUpgrade((S.gold=99999,U))&&(tab="upg",render(),/Needs the Apothecary/.test(app.querySelector('[data-act=up][data-k=powder]').textContent));
  S.story.built.apothecary=S.day;S.gear.blade=10;render();
  const atk=dmg();o.rank0=bombDmg()===Math.round(1.2*atk)&&JSON.stringify(bombR.mats)==='{"scrap":1,"gel":1}';
  for(let i=0;i<4;i++)app.querySelector('[data-act=up][data-k=powder]').click();
  o.rank4=S.gear.powder===4&&bombDmg()===Math.round(3.6*atk)&&bombDmg()>atk*3&&bombR.mats.dust===1&&bombR.mats.ember===2;
  o.maxed=!canBuyUpgrade(U)&&/Max/.test(app.querySelector('[data-act=up][data-k=powder]').textContent);
  S.inv.push("bomb");tab="town";render();app.querySelector('[data-act=info][data-k=bomb]').click();o.tooltip=new RegExp(fmt(bombDmg())+" damage").test(ov());document.querySelector('#ov [data-act=infoOk]').click();
  // in a fight: the chip shows the damage and the bomb deals it
  S.belt=["bomb"];startDelve(0);T.through();S.run.hp=9999;let g=0;while(!S.run.fight&&g<300){explore();T.through();S.run.ev=null;g++}
  S.run.fight.hp=S.run.fight.max=99999;render();const chip=app.querySelector('#usepanel [data-act=use]');o.chip=chip&&chip.textContent.includes(fmt(bombDmg())+" dmg");
  const before=S.run.fight.hp;chip.click();T.through();o.dealt=S.run.fight&&before-S.run.fight.hp===bombDmg();
  // a deep floor's blast is the minimum
  S.gear.powder=0;S.gear.blade=0;S.run.d=3;S.run.floor=8;o.floorMinimum=bombDmg()===Math.round((10+8*3)*hfOf(DUN[3])*.8);
  return o});
await p.evaluate(()=>{localStorage.setItem(KEY,JSON.stringify(Object.assign(fresh(),{day:9,gear:{blade:3,armor:2,pack:1,sign:0}})))});await p.reload();
r.oldSave=await p.evaluate(()=>S.gear.powder===0&&RECIPES.find(x=>x.out==="bomb").mats.scrap===1&&!isNaN(upCost(UPG.find(u=>u.k==="powder"))));
const bad=Object.entries(r).filter(([k,v])=>v!==true).map(([k])=>k);console.log(JSON.stringify(r));
if(bad.length||errs.length){console.log("FAIL",bad.join(", "),"errors:",errs);process.exit(1)}await b.close()})();
