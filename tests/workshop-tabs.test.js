// The Workshop splits recipes into Supplies and Trade goods tabs, each grouped; every recipe lands in exactly one group.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.join(__dirname,'..','index.html'));await p.evaluate(()=>localStorage.clear());await p.reload();
await p.addScriptTag({content:fs.readFileSync(path.join(__dirname,'helpers.js'),'utf8')});
const r=await p.evaluate(()=>{const o={};T.through();
  o.everyRecipeOneGroup=RECIPES.every(rc=>Object.values(WGROUPS).flat().filter(([,f])=>f(rc.out)).length===1);
  // open everything up so all recipes show
  S.story.flags.vault=true;S.story.flags.mine=true;S.story.built.apothecary=1;S.story.built.smithy=1;S.gear.powder=4;S.gear.grind=4;S.story.goals.c5lv10=1;
  S.mats={scrap:9,gel:9};S.inv=["dagger"];S.story.hl=null;S.story.tipQ=[];S.story.seen["1.5"]=1;scn=null;tipOpen=null;tab="work";render();drawOv();
  const rows=()=>[...app.querySelectorAll('[data-act=craft]')].map(x=>RECIPES[+x.dataset.i].out);
  const heads=()=>[...app.querySelectorAll('.wgroup')].map(x=>x.textContent).join();
  o.defaultSupplies=wtab==="supply"&&app.querySelector('[data-act=wtab][data-w=supply]').getAttribute('aria-selected')==="true";
  o.supplyHeads=heads()==="Potions,Bombs,Whetstones,Tools";
  const sup=rows();o.supplyOnly=sup.length>0&&sup.every(k=>wtabOf(k)==="supply")&&sup.includes("bomb")&&sup.includes("ladder")&&sup.includes("tonic");
  o.readyBadge=app.querySelector("[data-act=wtab][data-w=supply] .dot")?.textContent===String(RECIPES.filter(x=>wtabOf(x.out)==="supply"&&canCraft(x)).length); // bombs + lockpick
  app.querySelector('[data-act=wtab][data-w=goods]').click();
  o.goodsHeads=heads()==="Weapons,Armor,Trinkets,Gems,Boss crafts";
  const gd=rows();o.goodsOnly=gd.every(k=>wtabOf(k)==="goods")&&gd.includes("sword")&&gd.includes("crown");
  o.allShown=sup.length+gd.length===RECIPES.length;
  // crafting from the goods tab still works and stays on that tab
  const before=S.inv.length;app.querySelector(`[data-act=craft][data-i="${RECIPES.findIndex(x=>x.out==="sword")}"]`).click();
  o.craftWorks=S.inv.includes("sword")&&wtab==="goods";
  return o});
await b.close();
console.log(JSON.stringify(r));const bad=Object.entries(r).filter(([k,v])=>v!==true).map(([k])=>k);
if(bad.length||errs.length){console.log("FAIL",bad.join(", "),errs);process.exit(1)}})();
