// Recorded sound effects: every file in sounds/ is listed in SOUNDS and cached by sw.js for offline play,
// loads and plays over http (as on GitHub Pages), and the generated sound stands in when a file can't load.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const http=require('http');
const root=path.join(__dirname,'..');
(async()=>{const r={},errs=[];
const files=fs.readdirSync(path.join(root,'sounds')).map(f=>'sounds/'+f);
const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
r.allCached=files.length>0&&files.every(f=>sw.includes(`"${f}"`));
r.smallFiles=files.every(f=>fs.statSync(path.join(root,f)).size<150*1024);
const types={'.html':'text/html','.js':'text/javascript','.mp3':'audio/mpeg','.png':'image/png','.webmanifest':'application/manifest+json'};
const srv=http.createServer((q,s)=>{const f=path.join(root,decodeURIComponent(q.url.split('?')[0]).replace(/^\/$/,'/index.html'));
  if(!f.startsWith(root)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){s.writeHead(404);return s.end()}
  s.writeHead(200,{'content-type':types[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(s)});
await new Promise(ok=>srv.listen(0,'127.0.0.1',ok));const base=`http://localhost:${srv.address().port}/`; // the service worker only runs on https or localhost
const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});
const p=await b.newPage();p.on('pageerror',e=>errs.push(e.message));await p.route(/fonts/,x=>x.abort());
await p.goto(base+'index.html');await p.evaluate(()=>localStorage.clear());await p.reload();
r.listed=await p.evaluate(f=>f.every(x=>Object.values(SOUNDS).includes(x)),files);
await p.evaluate(()=>{scn=null;tipOpen=null;S.sound=true;S.music=false;render();drawOv()});
await p.click('[data-act=music]');await p.click('[data-act=music]'); // a tap starts audio, which loads the files
await p.waitForFunction(()=>Object.keys(SOUNDS).every(k=>SBUF[k]),null,{timeout:10000}).catch(()=>{});
r.decoded=await p.evaluate(()=>Object.keys(SOUNDS).every(k=>SBUF[k]&&SBUF[k].duration>.5&&SBUF[k].duration<3));
r.pursePlaysRecording=await p.evaluate(()=>{let made=0;const o=ac.createBufferSource.bind(ac);ac.createBufferSource=()=>{made++;return o()};
  const n0=made;sfx.purse();const ok=made===n0+1;ac.createBufferSource=o;return ok});
r.silentWhenSfxOff=await p.evaluate(()=>{S.sound=false;const ok=playFile("purse")===false;S.sound=true;return ok});
// the service worker caches the recording on install, so it plays offline
const ctx=await b.newContext();const q=await ctx.newPage();await q.route(/fonts/,x=>x.abort());
await q.goto(base+'index.html');
r.offlineCached=await q.evaluate(async()=>{await Promise.race([navigator.serviceWorker.ready,new Promise(ok=>setTimeout(ok,8000))]);await new Promise(ok=>setTimeout(ok,500));const keys=await caches.keys();
  for(const k of keys){const c=await caches.open(k);if(await c.match('sounds/coin-purse.mp3'))return true}return false}).catch(()=>false);
await b.close();srv.close();
// opened as a plain file (no server), the file can't load and the generated jingle plays instead
const b2=await chromium.launch();const f=await b2.newPage();f.on('pageerror',e=>errs.push(e.message));
await f.goto('file://'+path.join(root,'index.html'));
r.fallbackJingle=await f.evaluate(async()=>{S.sound=true;audioCtx();await new Promise(ok=>setTimeout(ok,500));
  let made=0;const o=ac.createOscillator.bind(ac);ac.createOscillator=()=>{made++;return o()};sfx.purse();ac.createOscillator=o;return !SBUF.purse&&made>0});
await b2.close();
const bad=Object.entries(r).filter(([k,v])=>v!==true).map(([k])=>k);
console.log(JSON.stringify(r));if(bad.length||errs.length){console.log("FAIL",bad.join(", "),"errors:",errs);process.exit(1)}
})();
