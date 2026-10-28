// Phones give a very short buzz on every button tap. Desktops don't.
const {chromium,devices}=require('playwright');const path=require('path');
const url='file://'+path.join(__dirname,'..','index.html');
const stub=()=>{window.__vib=[];Object.defineProperty(Navigator.prototype,'vibrate',{configurable:true,value:function(p){window.__vib.push(p);return true}})};
(async()=>{const b=await chromium.launch();const r={},errs=[];
async function open(ctx){const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));
  await p.goto(url);await p.evaluate(()=>localStorage.clear());await p.reload();
  await p.evaluate(()=>{scn=null;tipOpen=null;S.music=false;S.sound=false;render();drawOv()});return p}
// Android phone: Vibration API, 10 ms
const a=await b.newContext({...devices['Pixel 7']});await a.addInitScript(stub);
const p=await open(a);
await p.tap('[data-act=sound]');
r.androidBuzz=await p.evaluate(()=>window.__vib.length===1&&window.__vib[0]===10);
await p.evaluate(()=>{const x=document.createElement('button');x.id='dis';x.disabled=true;x.textContent='x';document.body.appendChild(x)});
await p.tap('#dis',{force:true});
r.disabledNoBuzz=await p.evaluate(()=>window.__vib.length===1);
await p.evaluate(()=>document.querySelector('#app').click());
r.nonButtonNoBuzz=await p.evaluate(()=>window.__vib.length===1);
// iPhone (no Vibration API): hidden switch checkbox label gets tapped
const i=await b.newContext({...devices['iPhone 13']});await i.addInitScript(()=>{try{delete Navigator.prototype.vibrate}catch(e){}});
const q=await open(i);
const before=await q.evaluate(()=>S.sound);
await q.tap('[data-act=sound]');
r.iphoneSwitch=await q.evaluate(()=>!!hapEl&&hapEl.querySelector('input[switch]')!==null&&getComputedStyle(hapEl).pointerEvents==='none');
r.iphoneButtonStillWorks=await q.evaluate(b=>S.sound!==b,before);
// Desktop: nothing
const d=await b.newContext();await d.addInitScript(stub);
const w=await open(d);await w.click('[data-act=sound]');
r.desktopNoBuzz=await w.evaluate(()=>window.__vib.length===0&&!hapEl);
await b.close();
const bad=Object.entries(r).filter(([k,v])=>v!==true).map(([k])=>k);
console.log(JSON.stringify(r));if(bad.length||errs.length){console.log("FAIL",bad.join(", "),"errors:",errs);process.exit(1)}
})();
