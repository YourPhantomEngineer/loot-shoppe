// Staff level to 100: levels 1-5 unchanged, slower levels after, +0.5% price a level, +1 daily sale every 10 levels,
// and the staff card shows progress within the current level plus lifetime sales.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.join(__dirname,'..','index.html'));await p.evaluate(()=>localStorage.clear());await p.reload();
await p.addScriptTag({content:fs.readFileSync(path.join(__dirname,'helpers.js'),'utf8')});
const r=await p.evaluate(()=>{const o={};T.through();const set=(k,n)=>{S.staffs[k]={sold:n,wageB:0,rateB:0}};
  // levels 1-5 exactly as before (12 sales each)
  o.early=[0,11,12,24,36,47,48].map(n=>staffLvlAt(n)).join()==="1,1,2,3,4,4,5";
  o.after5=staffLvlAt(59)===5&&staffLvlAt(60)===6&&STAFF_AT[100]>4000&&STAFF_AT[100]<6000&&staffLvlAt(1e9)===100;
  o.growing=STAFF_AT[100]-STAFF_AT[99]>STAFF_AT[11]-STAFF_AT[10];
  // prices and daily sales
  set("pip",STAFF_AT[5]);const r5=staffRate("pip"),s5=staffSells("pip");
  set("pip",STAFF_AT[6]);o.rate6=Math.abs(staffRate("pip")-r5-.005)<1e-9;
  set("pip",STAFF_AT[9]);o.sells9=staffSells("pip")===s5;set("pip",STAFF_AT[10]);o.sells10=staffSells("pip")===s5+1;
  set("pip",STAFF_AT[20]);o.sells20=staffSells("pip")===s5+2;set("pip",STAFF_AT[100]);o.sells100=staffSells("pip")===s5+10;
  o.level1to5Same=(set("sable",STAFF_AT[3]),Math.abs(staffRate("sable")-(ST("sable").rate+.06))<1e-9&&staffSells("sable")===ST("sable").sells+1);
  // budget stretch keeps pace: a level 100 staff's price vs budget ratio matches level 5
  const ratio=k=>staffRate(k)/staffSway(k);set("greta",STAFF_AT[5]);const g5=ratio("greta");set("greta",STAFF_AT[100]);o.swayKeepsPace=Math.abs(ratio("greta")-g5)<1e-9;
  // staff card: per-level progress resets, lifetime below
  S.crew=["marlo"];set("marlo",STAFF_AT[12]+5);tab="town";S.report=null;render();const card=app.querySelector('.staffcard').textContent;
  o.card=card.includes(`Level 12`)&&card.includes(`5 / ${STAFF_AT[13]-STAFF_AT[12]} sales to level 13`)&&card.includes(`Lifetime: ${fmt(STAFF_AT[12]+5)} sold`);
  set("marlo",STAFF_AT[100]);render();o.maxCard=/Max level/.test(app.querySelector('.staffcard').textContent);
  // level-ups report past 5
  S.crew=["pip"];set("pip",STAFF_AT[10]-1);S.inv=Array(10).fill("dagger");S.keep={};S.gold=1e6;let rep=null,g=0;while(staffLvl("pip")<10&&g<20){rep=staffShift();g++}
  o.levelUpLine=staffLvl("pip")>=10;
  return o});
console.log(JSON.stringify(r));const bad=Object.entries(r).filter(([k,v])=>v!==true).map(([k])=>k);
if(bad.length||errs.length){console.log("FAIL",bad.join(", "),errs);process.exit(1)}await b.close()})();
