// Stock rows show two buttons, For sale and Keep; the active one is highlighted, and tapping either sets it.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const b=await chromium.launch();const errs=[];const p=await b.newPage({viewport:{width:390,height:844}});p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.join(__dirname,'..','index.html'));await p.evaluate(()=>localStorage.clear());await p.reload();
await p.addScriptTag({content:fs.readFileSync(path.join(__dirname,'helpers.js'),'utf8')});
const r=await p.evaluate(()=>{const o={};T.through();S.inv=["sword","herb"];S.keep={};tab="town";render();
  const grp=k=>[...app.querySelectorAll(`[data-act=keep][data-k="${k}"]`)];
  const state=k=>grp(k).map(x=>x.textContent+":"+x.getAttribute("aria-pressed")).join(",");
  o.two=grp("sword").length===2&&state("sword")==="For sale:true,Keep:false";
  o.defaults=state("herb")==="For sale:false,Keep:true"; // potions default to Keep
  const bg=x=>getComputedStyle(x).backgroundColor;const [fs,kp]=grp("sword");o.highlighted=bg(fs)!==bg(kp);
  grp("sword")[1].click();o.toKeep=isKept("sword")&&state("sword")==="For sale:false,Keep:true";
  grp("sword")[1].click();o.stays=isKept("sword"); // tapping the active one changes nothing
  grp("sword")[0].click();o.toSale=!isKept("sword")&&state("sword")==="For sale:true,Keep:false";
  o.tall=grp("sword").every(x=>x.getBoundingClientRect().height>=44);
  o.fits=document.documentElement.scrollWidth<=innerWidth;
  return o});
console.log(JSON.stringify(r));const bad=Object.entries(r).filter(([k,v])=>v===false||v===null).map(([k])=>k);
if(bad.length||errs.length){console.log("FAIL",bad.join(", "),errs);process.exit(1)}await b.close()})();
