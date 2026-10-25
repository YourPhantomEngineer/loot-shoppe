// Scene 6.5 (The core), card 2: Voss, then Wren's new line (with her portrait), then Voss, then the two choices.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const b=await chromium.launch();const errs=[];const H=fs.readFileSync(path.join(__dirname,'helpers.js'),'utf8');
const p=await b.newPage({viewport:{width:390,height:844}});p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.join(__dirname,'..','index.html'));await p.evaluate(()=>localStorage.clear());await p.reload();
await p.addScriptTag({content:H});
const r=await p.evaluate(()=>{const o={};T.through();
  scn={id:"6.5",i:0};drawOv();document.querySelector('#ov [data-act=scn]').click(); // Continue from card 1
  const lines=[...document.querySelectorAll('#ov .sline')];
  o.order=lines.map(l=>l.querySelector('.who').textContent).join(",")==="Voss,Wren,Voss";
  o.text=/Did you come to collect\?/.test(lines[0]?.textContent)&&/We came to stop you\. All those years in that blue coat, drinking tea you never touched, smiling at our counters\. Hiding among us\./.test(lines[1]?.textContent)&&/I farmed you/.test(lines[2]?.textContent);
  o.wrenPortrait=!!lines[1]&&lines[1].classList.contains("wp")&&(()=>{const t=document.createElement('div');t.innerHTML=portrait("Wren");const w=t.firstElementChild.outerHTML,v=t.innerHTML=portrait("Voss");return lines[1].querySelector('.spr')?.outerHTML===w&&w!==t.firstElementChild.outerHTML})();
  const btns=[...document.querySelectorAll('#ov [data-act=scn]')].map(x=>x.textContent);
  o.choices=btns.join("|")==="You're not going home.|What are you?";
  return o});
console.log(JSON.stringify(r));const bad=Object.entries(r).filter(([k,v])=>v===false||v===null).map(([k])=>k);
if(bad.length||errs.length){console.log("FAIL",bad.join(", "),errs);process.exit(1)}await b.close()})();
