// Each shopkeeper can be set to sell only some categories (Market Today's five plus Supplies). Picks persist.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.join(__dirname,'..','index.html'));await p.evaluate(()=>localStorage.clear());await p.reload();
await p.addScriptTag({content:fs.readFileSync(path.join(__dirname,'helpers.js'),'utf8')});
const r=await p.evaluate(()=>{const o={};T.through();
  // older saves (no picks) sell everything
  S.crew=["pip","sable"];S.staffs={pip:{sold:0,wageB:0,rateB:-.5},sable:{sold:0,wageB:0,rateB:-.5}};
  o.defaultAll=staffCats("pip").length===6&&staffCats("pip").includes("supply");
  // Pip sells only potions, Sable only weapons
  S.staffs.pip.cats=["potion"];S.staffs.sable.cats=["weapon"];
  const cat=n=>IT[ITEMS.find(i=>i.n===n).k].c;let ok=true,pipN=0,sabN=0;
  for(let d=0;d<200;d++){S.gold=1e7;S.keep={herb:false};S.inv=[...Array(4).fill("herb"),...Array(4).fill("dagger"),...Array(4).fill("ring")];
    for(const l of staffShift().lines){let m=l.match(/^(Pip|Sable) sold an? (.+?) for/)||l.match(/traded (Pip|Sable) 2 .+ for an? (.+)\.$/);
      if(!m)continue;const c=cat(m[2]);if(m[1]==="Pip"){pipN++;ok=ok&&c==="potion"}else{sabN++;ok=ok&&c==="weapon"}}}
  o.onlyPicked=ok&&pipN>0&&sabN>0;
  // nothing For sale in anyone's categories: day off, no wages
  S.crew=["pip"];S.inv=["ring","ring"];S.gold=1e7;const off=staffShift();
  o.dayOff=off.wage===0&&off.gold===0&&/categories your staff are set to sell/.test(off.lines[0]);
  return o});
// the staff card: chips match Market Today plus Supplies, toggle, and the last one can't be turned off
await p.evaluate(()=>{S.crew=["pip"];S.staffs={pip:{sold:0,wageB:0,rateB:0}};S.run=null;S.shop=null;tab="town";scn=null;tipOpen=null;S.story.hl=null;S.story.tipQ=[];render();drawOv()});
const sel=c=>`[data-act=staffCat][data-k=pip][data-c=${c}]`;
r.chips=await p.evaluate(()=>[...app.querySelectorAll('[data-act=staffCat][data-k=pip]')].map(x=>x.textContent).join(",")==="Weapons,Armor,Potions,Trinkets,Gems,Supplies");
r.allOn=await p.evaluate(()=>[...app.querySelectorAll('[data-act=staffCat][data-k=pip]')].every(x=>x.getAttribute('aria-pressed')==="true"));
await p.click(sel('gem'));
r.toggledOff=await p.evaluate(()=>!staffCats("pip").includes("gem")&&app.querySelector('[data-act=staffCat][data-k=pip][data-c=gem]').getAttribute('aria-pressed')==="false");
for(const c of ['weapon','armor','potion','trinket'])await p.click(sel(c));
r.oneLeft=await p.evaluate(()=>staffCats("pip").join()==="supply");
await p.click(sel('supply'));
r.lastStays=await p.evaluate(()=>staffCats("pip").join()==="supply");
await p.click(sel('gem'));
r.persists=await p.evaluate(()=>{save();const s=JSON.parse(localStorage.getItem(KEY));endDay();return s.staffs.pip.cats.join()==="gem,supply"&&staffCats("pip").join()==="gem,supply"});
for(const c of ['weapon','armor','potion','trinket'])await p.click(sel(c));
r.allClearsPick=await p.evaluate(()=>S.staffs.pip.cats===undefined);
await b.close();
console.log(JSON.stringify(r));const bad=Object.entries(r).filter(([k,v])=>v!==true).map(([k])=>k);
if(bad.length||errs.length){console.log("FAIL",bad.join(", "),errs);process.exit(1)}})();
