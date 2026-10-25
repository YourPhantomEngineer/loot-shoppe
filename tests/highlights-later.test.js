const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+require('path').join(__dirname,'..','index.html'));await p.evaluate(()=>localStorage.clear());await p.reload();
await p.addScriptTag({content:fs.readFileSync(require('path').join(__dirname,'helpers.js'),'utf8')});
const r=await p.evaluate(()=>{const out={};const hls=()=>[...app.querySelectorAll(".hl")].map(e=>e.dataset.act||e.className.split(" ")[0]).join(",");
  const ok=()=>{const t=tipOpen;if(t)document.querySelector("#ov [data-act=tipOk]").click();return t};
  T.through();hlClear();S.story.hlPark=null;S.story.tipQ=[];render();
  // Smithy gear tiers
  S.story.built.smithy=1;app.querySelector('[data-t="upg"]').click();while(scn)scnGo("next");out.gear=ok()+" -> "+hls();app.querySelector("header h1").click();
  // Floor modifier on the Descend button
  S.story.built.watch=1;S.story.flags.hlMod=1;startDelve(0);T.through();const R=S.run;let g=0;
  while(!R.stairs&&g<300){R.hp=999;explore();while(scn)scnGo("next");while(tipOpen)ok();if(S.story.hl==="h_mod")break;if(R.fight){R.fight=null}g++;hlClear();playNext()}
  render();out.mod=S.story.hl+" -> "+hls()+" | "+(app.querySelector("[data-act=descend]")?.textContent||"");
  hlClear();leaveDungeon();T.through();
  // Relic lore in stock
  S.story.built.obs=1;S.story.flags.hlLore=1;S.inv.push("idol");endDay();while(scn)scnGo("next");while(tipOpen&&S.story.hl!=="h_lore"){ok()}render();out.lore=S.story.hl+" -> "+hls();
  // Loan lock line
  hlClear();S.story.built.well=1;S.story.loan=300;tab="journal";render();askReopen();out.loan=ok()+" -> "+hls();
  return out});
console.log(JSON.stringify(r,null,1),"errors",errs);await b.close()})();
