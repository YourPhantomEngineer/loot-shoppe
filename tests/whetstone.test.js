// Only one whetstone works per dungeon run; spares stay on the belt for the next one.
// Master Grindstone (needs the Smithy) unlocks stronger kinds, each with its own bonus and recipe.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.join(__dirname,'..','index.html'));await p.evaluate(()=>localStorage.clear());await p.reload();
await p.addScriptTag({content:fs.readFileSync(path.join(__dirname,'helpers.js'),'utf8')});
const r=await p.evaluate(()=>{const o={};T.through();S.gear.belt=4;S.belt=["whet","whet","whet"];startDelve(0);T.through();
  const chip=()=>[...app.querySelectorAll('#usepanel [data-act=use]')].find(c=>/Whetstone/.test(c.textContent));
  render();chip().click();T.through();o.first=S.run.atkB===1.3&&S.belt.length===2;
  render();const c=chip();o.secondBlocked=c.getAttribute("aria-disabled")==="true"&&/used this run/.test(c.textContent);
  c.click();T.through();useItem("belt",0);o.stillOne=S.run.atkB===1.3&&S.belt.length===2;
  leaveDungeon();T.through();startDelve(0);T.through();render();chip().click();T.through();o.nextDelve=S.run.atkB===1.3&&S.belt.length===1;
  // tiers
  leaveDungeon();T.through();const U=UPG.find(u=>u.k==="grind"),idx=k=>RECIPES.findIndex(x=>x.out===k);S.gold=1e6;
  tab="upg";render();o.needsSmithy=!canBuyUpgrade(U)&&/Needs the Smithy/.test(app.querySelector('[data-act=up][data-k=grind]').textContent);
  S.story.built.smithy=S.day;S.mats={scrap:50,ore:50,ember:50,dust:50};tab="work";render();
  const has=k=>!!app.querySelector(`[data-act=craft][data-i="${idx(k)}"]`),locked=k=>app.querySelector(`[data-act=craft][data-i="${idx(k)}"]`)?.getAttribute("aria-disabled")==="true";
  o.workshop=has("whet")&&!locked("whet")&&has("whet2")&&locked("whet2")&&!has("whet3");
  tab="upg";render();for(let i=0;i<4;i++)app.querySelector('[data-act=up][data-k=grind]').click();
  tab="work";render();o.allUnlocked=S.gear.grind===4&&["whet2","whet3","whet4","whet5"].every(k=>has(k)&&!locked(k));
  craft(idx("whet5"));craft(idx("whet"));o.crafted=S.inv.includes("whet5")&&S.mats.dust===49;
  S.belt=["whet","whet5"];startDelve(0);T.through();render();
  const chips=[...app.querySelectorAll('#usepanel [data-act=use]')];o.chipBonus=/\+30% attack/.test(chips[0].textContent)&&/\+100% attack/.test(chips[1].textContent);
  chips[1].click();T.through();render();o.starsteel=S.run.atkB===2&&[...app.querySelectorAll('#usepanel [data-act=use]')][0].getAttribute("aria-disabled")==="true";
  useItem("belt",0);o.noStacking=S.run.atkB===2&&S.belt.includes("whet");
  return o});
console.log(JSON.stringify(r));const bad=Object.entries(r).filter(([k,v])=>v!==true).map(([k])=>k);
if(bad.length||errs.length){console.log("FAIL",bad.join(", "),errs);process.exit(1)}await b.close()})();
