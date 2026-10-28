// Recorded sound effects: every file in sounds/ is listed in SOUNDS and cached by sw.js for offline play, recordings
// load and play over http (as on GitHub Pages), and the generated sound stands in when there is no recording.
// No recordings are in use right now, so loading is checked with a short test tone served by this test.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const http=require('http');
const root=path.join(__dirname,'..');
(async()=>{const r={},errs=[];
const dir=path.join(root,'sounds'),files=fs.existsSync(dir)?fs.readdirSync(dir).map(f=>'sounds/'+f):[];
const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
r.allCached=files.every(f=>sw.includes(`"${f}"`));
r.smallFiles=files.every(f=>fs.statSync(path.join(root,f)).size<150*1024);
// a 1-second 440 Hz test tone, as a WAV
const tone=(()=>{const sr=8000,n=sr,B=Buffer.alloc(44+n*2);B.write("RIFF",0);B.writeUInt32LE(36+n*2,4);B.write("WAVEfmt ",8);B.writeUInt32LE(16,16);
  B.writeUInt16LE(1,20);B.writeUInt16LE(1,22);B.writeUInt32LE(sr,24);B.writeUInt32LE(sr*2,28);B.writeUInt16LE(2,32);B.writeUInt16LE(16,34);B.write("data",36);B.writeUInt32LE(n*2,40);
  for(let i=0;i<n;i++)B.writeInt16LE(Math.round(Math.sin(i/sr*2*Math.PI*440)*8000),44+i*2);return B})();
const types={'.html':'text/html','.js':'text/javascript','.mp3':'audio/mpeg','.png':'image/png','.webmanifest':'application/manifest+json'};
const srv=http.createServer((q,s)=>{const u=decodeURIComponent(q.url.split('?')[0]);
  if(u==='/__test-tone.wav'){s.writeHead(200,{'content-type':'audio/wav'});return s.end(tone)}
  const f=path.join(root,u.replace(/^\/$/,'/index.html'));
  if(!f.startsWith(root)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){s.writeHead(404);return s.end()}
  s.writeHead(200,{'content-type':types[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(s)});
await new Promise(ok=>srv.listen(0,'127.0.0.1',ok));const base=`http://localhost:${srv.address().port}/`; // the service worker only runs on https or localhost
const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});
const p=await b.newPage();p.on('pageerror',e=>errs.push(e.message));await p.route(/fonts/,x=>x.abort());
await p.goto(base+'index.html');await p.evaluate(()=>localStorage.clear());await p.reload();
r.listed=await p.evaluate(f=>f.every(x=>Object.values(SOUNDS).includes(x))&&Object.values(SOUNDS).every(x=>f.includes(x)),files);
// with no recording, the purse plays its generated jingle
r.jingleWithoutRecording=await p.evaluate(()=>{S.sound=true;audioCtx();let made=0;const o=ac.createOscillator.bind(ac);ac.createOscillator=()=>{made++;return o()};
  sfx.purse();ac.createOscillator=o;return !SBUF.purse&&made>0});
// a recording listed in SOUNDS loads once audio starts and then plays instead
await p.goto(base+'index.html');
await p.evaluate(()=>{SOUNDS.purse="__test-tone.wav";scn=null;tipOpen=null;S.sound=true;S.music=false;render();drawOv()});
await p.click('[data-act=music]');await p.click('[data-act=music]'); // a tap starts audio, which loads the files
await p.waitForFunction(()=>SBUF.purse,null,{timeout:10000}).catch(()=>{});
r.decoded=await p.evaluate(()=>!!SBUF.purse&&SBUF.purse.duration>.9&&SBUF.purse.duration<1.1);
r.recordingPlays=await p.evaluate(()=>{let made=0;const o=ac.createBufferSource.bind(ac);ac.createBufferSource=()=>{made++;return o()};
  sfx.purse();ac.createBufferSource=o;return made===1});
r.silentWhenSfxOff=await p.evaluate(()=>{S.sound=false;const ok=playFile("purse")===false;S.sound=true;return ok});
// the service worker installs and caches everything in CORE (including any sound files) for offline play
const ctx=await b.newContext();const q=await ctx.newPage();await q.route(/fonts/,x=>x.abort());
await q.goto(base+'index.html');
r.offlineCached=await q.evaluate(async f=>{await Promise.race([navigator.serviceWorker.ready,new Promise(ok=>setTimeout(ok,8000))]);await new Promise(ok=>setTimeout(ok,500));
  for(const k of await caches.keys()){const c=await caches.open(k);if(await c.match('index.html')){for(const x of f)if(!await c.match(x))return false;return true}}return false},files).catch(()=>false);
await b.close();srv.close();
const bad=Object.entries(r).filter(([k,v])=>v!==true).map(([k])=>k);
console.log(JSON.stringify(r));if(bad.length||errs.length){console.log("FAIL",bad.join(", "),"errors:",errs);process.exit(1)}
})();
