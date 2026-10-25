const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+require('path').join(__dirname,'..','index.html'));
const r=await p.evaluate(()=>{while(document.querySelector('#ov button'))document.querySelector('#ov button').click();
  const upgrade=UPG.find(u=>u.k==='belt'),freshState=fresh();
  S.inv=['herb','tonic','rope'];S.belt=[];equip('herb');equip('tonic');equip('rope');
  const base={rank:S.gear.belt,cap:beltCap(),belt:S.belt.slice(),blocked:S.inv.includes('rope')};
  S.gold=1000;tab='upg';render();const row=app.querySelector('[data-act="up"][data-k="belt"]'),rowText=row.textContent,cost=upCost(upgrade);row.click();
  const bought={rank:S.gear.belt,cap:beltCap(),gold:S.gold,text:rowText};equip('rope');
  const expanded={belt:S.belt.slice(),inv:S.inv.slice()};
  S.gear.belt=upgrade.max;render();const maxRow=app.querySelector('[data-act="up"][data-k="belt"]');
  const maxed={cap:beltCap(),disabled:maxRow.disabled,text:maxRow.textContent};

  const old=fresh();delete old.gear.belt;old.belt=['herb','tonic','rope','ladder'];S=loadState(old);migrate();
  const migrated={rank:S.gear.belt,cap:beltCap(),belt:S.belt.slice()};
  return {upgrade,freshRank:freshState.gear.belt,freshCap:beltCapAt(freshState.gear.belt),base,bought,expectedGold:1000-cost,expanded,maxed,migrated};});
if(errs.length||!r.upgrade||r.upgrade.max!==4||r.freshRank!==0||r.freshCap!==2||r.base.rank!==0||r.base.cap!==2||r.base.belt.length!==2||!r.base.blocked||r.bought.rank!==1||r.bought.cap!==3||r.bought.gold!==r.expectedGold||!/Supply slots 2 → 3/.test(r.bought.text)||r.expanded.belt.length!==3||r.expanded.inv.includes('rope')||r.maxed.cap!==6||!r.maxed.disabled||!/Fully upgraded/.test(r.maxed.text)||r.migrated.rank!==2||r.migrated.cap!==4||r.migrated.belt.length!==4)throw new Error(JSON.stringify({r,errs}));
console.log(JSON.stringify(r));await b.close()})();
