// Check for updates while offline keeps the offline copy (and says you're offline); online it still reloads to the
// latest version. Runs the real service worker on a local server.
const {chromium}=require('playwright');const http=require('http');const fs=require('fs');const path=require('path');
const root=path.join(__dirname,'..');
const TYPES={".html":"text/html",".js":"text/javascript",".png":"image/png",".webmanifest":"application/manifest+json",".json":"application/json",".mp3":"audio/mpeg"};
(async()=>{
const srv=http.createServer((q,r)=>{let f=decodeURIComponent(q.url.split("?")[0]);if(f.endsWith("/"))f+="index.html";const p=path.join(root,f);
  if(!p.startsWith(root)||!fs.existsSync(p)||fs.statSync(p).isDirectory()){r.writeHead(404);return r.end()}
  r.writeHead(200,{"Content-Type":TYPES[path.extname(p)]||"application/octet-stream"});fs.createReadStream(p).pipe(r)}).listen(0);
const url=`http://localhost:${srv.address().port}/index.html`;
const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
// keep the game's own (Google Fonts) request from hanging the test
await ctx.route(/fonts\.(googleapis|gstatic)\.com/,r=>r.abort());
await p.goto(url);await p.evaluate(()=>navigator.serviceWorker.ready);await p.reload();
await p.waitForFunction(()=>!!navigator.serviceWorker.controller);
const o={};
o.cached=await p.evaluate(async()=>(await caches.keys()).length>0);
// offline: press Check for updates
await ctx.setOffline(true);
await p.evaluate(()=>{window.__stay=1;while(document.querySelector('#ov [data-act=tipOk],#ov [data-act=scn]'))document.querySelector('#ov button').click();tab="town";render()});
await p.click('[data-act=updateGame]');
await p.waitForFunction(()=>/You're offline/.test(document.getElementById("toast").textContent),null,{timeout:15000});
o.stayed=await p.evaluate(()=>window.__stay===1);
o.cacheKept=await p.evaluate(async()=>{const ks=await caches.keys();for(const k of ks)if(await (await caches.open(k)).match("index.html"))return true;return false});
// the game still opens offline afterwards
await p.reload();o.opensOffline=await p.evaluate(()=>!!document.querySelector('[data-act=tab]'));
// online: the button reloads the page as before
await ctx.setOffline(false);
await p.evaluate(()=>{window.__stay=1;while(document.querySelector('#ov button'))document.querySelector('#ov button').click();tab="town";render()});
await Promise.all([p.waitForNavigation({timeout:20000}),p.click('[data-act=updateGame]')]);
o.reloadedOnline=await p.evaluate(()=>window.__stay===undefined&&!!document.querySelector('[data-act=tab]'));
console.log(JSON.stringify(o));await b.close();srv.close();
const bad=Object.entries(o).filter(([k,v])=>v!==true).map(([k])=>k);
if(bad.length||errs.length){console.log("FAIL",bad.join(", "),errs);process.exit(1)}})();
