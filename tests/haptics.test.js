// Tap haptics were removed (iOS 27 blocks the iPhone trick): button taps on phones don't vibrate or add hidden switches.
const {chromium,devices}=require('playwright');const path=require('path');
const url='file://'+path.join(__dirname,'..','index.html');
const stub=()=>{window.__vib=0;Object.defineProperty(Navigator.prototype,'vibrate',{configurable:true,value:function(){window.__vib++;return true}})};
(async()=>{const b=await chromium.launch();const r={},errs=[];
for(const dev of ['Pixel 7','iPhone 13']){
  const ctx=await b.newContext({...devices[dev]});await ctx.addInitScript(stub);
  const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));
  await p.goto(url);await p.evaluate(()=>localStorage.clear());await p.reload();
  await p.evaluate(()=>{scn=null;tipOpen=null;S.music=false;S.sound=false;render();drawOv()});
  const before=await p.evaluate(()=>S.sound);
  await p.tap('[data-act=sound]');
  r[dev+' no buzz']=await p.evaluate(b=>window.__vib===0&&!document.querySelector('input[switch]')&&S.sound!==b,before);
}
await b.close();
const bad=Object.entries(r).filter(([k,v])=>v!==true).map(([k])=>k);
console.log(JSON.stringify(r));if(bad.length||errs.length){console.log("FAIL",bad.join(", "),"errors:",errs);process.exit(1)}
})();
