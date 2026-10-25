// Big numbers in the stat boxes shrink to fit on narrow phones instead of being cut off.
const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const errs=[];let bad=[];
for(const width of [320,360,390]){
  const p=await b.newPage({viewport:{width,height:800}});p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+path.join(__dirname,'..','index.html'));await p.evaluate(()=>localStorage.clear());await p.reload();
  const r=await p.evaluate(async()=>{while(document.querySelector('#ov button'))document.querySelector('#ov button').click();
    await document.fonts.ready;const cut=()=>[...app.querySelectorAll('.stat b')].filter(el=>el.scrollWidth>el.clientWidth+1).map(el=>el.textContent);
    S.gold=1234567;S.day=1234;S.xp=xpFor(17)+807;render();const town=cut();
    S.gear.armor=10;S.legacy.perks.heir=3;startDelve(0);while(document.querySelector('#ov button'))document.querySelector('#ov button').click();
    S.run.hp=maxHp();S.run.floor=DUN[0].floors;render();const delve=cut();
    return {town,delve,hp:app.querySelectorAll('.stat b')[1].textContent}});
  if(r.town.length||r.delve.length)bad.push({width,...r});
  console.log(width,JSON.stringify(r));await p.close();
}
if(bad.length||errs.length){console.log("FAIL",JSON.stringify(bad),errs);process.exit(1)}
await b.close()})();
