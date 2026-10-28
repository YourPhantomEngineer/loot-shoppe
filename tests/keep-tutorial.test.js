// Chapter 1: back from the first delve, Wren explains For sale and Keep between the Market Today tip and the
// Open the shop prompt, highlighting the buttons on the first Stock item. Saves already past that moment skip it.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const b=await chromium.launch();const errs=[];const H=fs.readFileSync(path.join(__dirname,'helpers.js'),'utf8');
const open=async(save)=>{const p=await b.newPage({viewport:{width:390,height:844}});p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+path.join(__dirname,'..','index.html'));await p.evaluate(s=>{localStorage.clear();if(s)localStorage.setItem(KEY,s)},save);await p.reload();
  await p.addScriptTag({content:H});return p};
const p=await open();
const r=await p.evaluate(()=>{const o={},order=[];T.through();
  T.delve(0);S.run.bag=(S.run.bag||[]);S.inv.push("dagger");leaveDungeon(); // come home with something in stock
  let n=0;while((scn||tipOpen||S.story.hl)&&n<40){
    if(scn)scnGo("next");
    else if(tipOpen){order.push(tipOpen);if(tipOpen==="t_keep")o.text=/two buttons, For sale and Keep/.test(document.querySelector('#ov').textContent)&&/won't go out on the floor/.test(document.querySelector('#ov').textContent);document.querySelector('#ov [data-act=tipOk]').click()}
    else{const id=S.story.hl;if(id==="t_keep"){tab="town";render();const hl=[...app.querySelectorAll('.hl')];o.hl=hl.length===1&&hl[0].classList.contains("keeppick")&&hl[0]===app.querySelector('.keeppick');
        hl[0].querySelector('[data-v="1"]').click();o.tapEnds=S.story.hl!=="t_keep"&&isKept(hl[0].querySelector('[data-k]').dataset.k);playNext()}
      else if(id==="h_shop"){order.push("h_shop");break}else{hlClear();playNext()}}
    n++}
  const i=k=>order.indexOf(k);o.order=i("t_market")>=0&&i("t_market")<i("t_keep")&&i("t_keep")<i("h_shop");o.seq=order.join(",");
  return o});
// a save already past Scene 1.3 that predates this prompt
const old=await p.evaluate(()=>{const st=S.story;delete st.flags.tut5;delete st.tips.t_keep;st.tipQ=[];st.hl=null;save();return localStorage.getItem(KEY)});
const p2=await open(old);
r.oldSkips=await p2.evaluate(()=>!!S.story.tips.t_keep&&tipOpen!=="t_keep"&&!S.story.tipQ.includes("t_keep"));
console.log(JSON.stringify(r));const bad=Object.entries(r).filter(([k,v])=>v===false||v===null||v===undefined).map(([k])=>k);
if(bad.length||errs.length||!("text" in r)||!("hl" in r)){console.log("FAIL",bad.join(", "),errs);process.exit(1)}await b.close()})();
