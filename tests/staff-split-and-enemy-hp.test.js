// Staff share sales at random, weighted toward later hires and higher levels; enemy HP shows in fights.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.join(__dirname,'..','index.html'));await p.evaluate(()=>localStorage.clear());await p.reload();
await p.addScriptTag({content:fs.readFileSync(path.join(__dirname,'helpers.js'),'utf8')});
const r=await p.evaluate(()=>{const o={};T.through();
  const run=(levels,days=600)=>{const tally={pip:0,marlo:0,greta:0,sable:0};
    for(let d=0;d<days;d++){S.crew=["pip","marlo","greta","sable"];for(const k of S.crew){S.staffs[k]={sold:(levels[k]-1)*12,wageB:0,rateB:0}}
      S.gold=1e7;S.inv=Array(6).fill("dagger");S.keep={};const rep=staffShift();
      for(const l of rep.lines){const m=l.match(/^(Pip|Marlo|Old Greta|Sable) sold/);if(m)tally[{Pip:"pip",Marlo:"marlo","Old Greta":"greta",Sable:"sable"}[m[1]]]++}}
    const tot=Object.values(tally).reduce((a,b)=>a+b,0);return Object.fromEntries(Object.entries(tally).map(([k,v])=>[k,Math.round(v/tot*100)]))};
  const even=run({pip:1,marlo:1,greta:1,sable:1});o.even=even;
  o.evenOrder=even.sable>even.greta&&even.greta>even.marlo&&even.marlo>even.pip&&even.pip>0;
  const lv=run({pip:5,marlo:1,greta:1,sable:1});o.pip5=lv;o.pip5BeatsSable1=lv.pip>lv.sable;
  // never more than a staff member's daily limit
  S.crew=["pip","marlo","greta","sable"];for(const k of S.crew)S.staffs[k]={sold:0,wageB:0,rateB:0};S.inv=Array(30).fill("dagger");S.gold=1e7;
  const rep=staffShift(),c=n=>rep.lines.filter(l=>l.startsWith(n+" sold")).length;o.limits=c("Pip")<=staffSells("pip")&&c("Sable")<=staffSells("sable");
  // staff aren't held to the shop's customers a day, only their own limits
  let most=0,within=true;for(let d=0;d<20;d++){for(const k of S.crew)S.staffs[k]={sold:0,wageB:0,rateB:-.5};S.inv=[...Array(20).fill("dagger"),...Array(20).fill("ring")];S.gold=1e7;
    const r2=staffShift(),n=r2.lines.filter(l=>/ sold | traded /.test(l)).length;most=Math.max(most,n);
    within=within&&["Pip","Marlo","Old Greta","Sable"].every((nm,i)=>r2.lines.filter(l=>l.startsWith(nm+" sold")||l.includes(" traded "+nm+" ")).length<=staffSells(S.crew[i]))}
  o.pastShopLimit=most>custN()+2&&within;o.most=most;o.custN=custN();
  // enemy HP
  S.crew=[];startDelve(0);T.through();S.run.hp=9999;let g=0;while(!S.run.fight&&g<300){explore();T.through();S.run.ev=null;g++}
  render();const F=S.run.fight;o.enemyHp=app.querySelector('.mhp')?.textContent===`HP ${fmt(F.hp)} / ${fmt(F.max)}`;
  return o});
console.log(JSON.stringify(r));const bad=Object.entries(r).filter(([k,v])=>v===false).map(([k])=>k);
if(bad.length||errs.length){console.log("FAIL",bad.join(", "),errs);process.exit(1)}await b.close()})();
