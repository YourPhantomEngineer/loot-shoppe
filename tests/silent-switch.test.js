// Music and sound play on iPhones with the ring/silent switch on silent: the page asks for media playback.
const {chromium}=require('playwright');const path=require('path');
const url='file://'+path.join(__dirname,'..','index.html');
(async()=>{const b=await chromium.launch();const r={},errs=[];
// Newer Safari: navigator.audioSession
const p=await b.newPage();p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{navigator.audioSession={type:"auto"}});
await p.goto(url);await p.evaluate(()=>localStorage.clear());await p.reload();
await p.evaluate(()=>{scn=null;tipOpen=null;S.music=false;S.sound=false;render();drawOv()});
await p.click('[data-act=music]');
r.sessionPlayback=await p.evaluate(()=>S.music&&navigator.audioSession.type==="playback"&&!silentEl);
await p.click('[data-act=music]');
r.releasedWhenOff=await p.evaluate(()=>!S.music&&!S.sound&&navigator.audioSession.type==="auto");
await p.click('[data-act=sound]');
r.sfxAlsoPlayback=await p.evaluate(()=>S.sound&&navigator.audioSession.type==="playback");
// Older iPhone Safari (no audioSession): a looping silent audio element started on a tap
const ctx=await b.newContext({userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'});
const q=await ctx.newPage();q.on('pageerror',e=>errs.push(e.message));
await q.addInitScript(()=>{try{delete Navigator.prototype.audioSession}catch(e){}});
await q.goto(url);await q.evaluate(()=>localStorage.clear());await q.reload();
await q.evaluate(()=>{scn=null;tipOpen=null;S.music=false;S.sound=false;render();drawOv()});
await q.click('[data-act=music]');
r.silentEl=await q.evaluate(()=>!!silentEl&&silentEl.loop&&/^blob:/.test(silentEl.src)&&silentEl.hasAttribute("playsinline"));
await q.click('[data-act=music]');
r.silentPausedWhenOff=await q.evaluate(()=>silentEl.paused);
// Desktop browsers without audioSession get no extra element
const d=await b.newPage();await d.addInitScript(()=>{try{delete Navigator.prototype.audioSession}catch(e){}});
await d.goto(url);await d.evaluate(()=>{scn=null;tipOpen=null;S.music=false;render();drawOv()});await d.click('[data-act=music]');
r.desktopNoElement=await d.evaluate(()=>!silentEl);
await b.close();
const bad=Object.entries(r).filter(([k,v])=>v!==true).map(([k])=>k);
console.log(JSON.stringify(r));if(bad.length||errs.length){console.log("FAIL",bad.join(", "),"errors:",errs);process.exit(1)}
})();
