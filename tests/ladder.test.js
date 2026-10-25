const {chromium}=require('playwright');
const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+require('path').join(__dirname,'..','index.html'));
await p.addScriptTag({content:fs.readFileSync(require('path').join(__dirname,'helpers.js'),'utf8')});
const r=await p.evaluate(()=>{T.through();
  const recipe=RECIPES.find(r=>r.out==='ladder'),item=IT.ladder;
  S.mats.fiber=2;S.mats.scrap=1;craft(RECIPES.indexOf(recipe));
  const crafted=S.inv.includes('ladder')&&S.mats.fiber===0&&S.mats.scrap===0;
  equip('ladder');startDelve(0);T.through();
  const ready=canUse('ladder'),used=useItem('belt',S.belt.indexOf('ladder')),valid={floor:S.run.floor,belt:S.belt.slice(),event:S.run.event};

  S.belt.push('ladder');S.run.floor=DUN[0].floors;S.run.stairs=false;S.run.fight=null;S.run.ev=null;S.run.secretFloor=false;
  const bottomBefore=S.belt.length,bottomCan=canUse('ladder'),bottomUsed=descend(true);
  const bottomSafe=S.run.floor===DUN[0].floors&&S.belt.length===bottomBefore;

  S.run.d=3;S.run.floor=DUN[3].floors-1;S.run.secretFloor=false;S.run.fight=null;S.run.ev=null;
  const sealedBefore=S.belt.length,sealedCan=canUse('ladder');useItem('belt',S.belt.indexOf('ladder'));
  const sealedSafe=S.run.floor===DUN[3].floors-1&&S.belt.length===sealedBefore;

  S.run.d=0;S.run.floor=2;S.run.ev={type:'chest'};const eventBlocked=!canUse('ladder');S.run.ev=null;
  makeFight('Cellar Rat','mob');const combatBlocked=!canUse('ladder');S.run.fight=null;
  S.run.stairs=false;const normalBlocked=descend()===false&&S.run.floor===2;
  return {item:item&&item.c,recipe,crafted,ready,used,valid,bottomCan,bottomUsed,bottomSafe,sealedCan,sealedSafe,eventBlocked,combatBlocked,normalBlocked};});
if(errs.length||r.item!=='supply'||!r.recipe||r.recipe.mats.fiber!==2||r.recipe.mats.scrap!==1||!r.crafted||!r.ready||!r.used||r.valid.floor!==2||r.valid.belt.includes('ladder')||!/Ladder/.test(r.valid.event)||r.bottomCan||r.bottomUsed||!r.bottomSafe||r.sealedCan||!r.sealedSafe||!r.eventBlocked||!r.combatBlocked||!r.normalBlocked)throw new Error(JSON.stringify({r,errs}));
console.log(JSON.stringify(r));await b.close()})();
