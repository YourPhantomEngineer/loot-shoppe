// Chapter 1 first loot: Wren says "Loot, eh? Mind your pack space." (outlining the pack count), then explains pack
// space, Bigger Pack and dropping (outlining the pack items). Tapping an item twice drops it. Old saves skip the new tip.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const b=await chromium.launch();const errs=[];const H=fs.readFileSync(path.join(__dirname,'helpers.js'),'utf8');
const open=async(save)=>{const p=await b.newPage({viewport:{width:390,height:844}});p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+path.join(__dirname,'..','index.html'));await p.evaluate(s=>{localStorage.clear();if(s)localStorage.setItem(KEY,s)},save);await p.reload();
  await p.addScriptTag({content:H});return p};
const p=await open();
const r=await p.evaluate(()=>{const o={},seq=[];T.through();startDelve(0);T.through();const R=S.run;let g=0;
  while(!S.story.tips.t_loot&&g<400){R.hp=999;if(R.fight){attack()}else if(R.ev)evChoice("leave");else explore();
    let n=0;while((scn||tipOpen||S.story.hl)&&!S.story.tips.t_loot&&n<20){if(scn)scnGo("next");else if(tipOpen)document.querySelector('#ov [data-act=tipOk]').click();else{hlClear();playNext()}n++}g++}
  const ov=()=>document.querySelector('#ov').textContent;
  let n=0;while((tipOpen||S.story.hl)&&n<20){
    if(tipOpen){seq.push(tipOpen);if(tipOpen==="t_loot")o.line=/Loot, eh\? Mind your pack space\./.test(ov())&&!/Everything has a price/.test(ov());
      if(tipOpen==="t_pack")o.packText=/pack only holds so much/.test(ov())&&/Bigger Pack/.test(ov())&&/Upgrades tab/.test(ov())&&/Tap an item twice to drop it/.test(ov());
      document.querySelector('#ov [data-act=tipOk]').click()}
    else{render();const hl=app.querySelector('.hl');seq.push("hl:"+(hl?hl.id||hl.className.split(" ")[0]:"none"));app.querySelector('header h1').click();playNext()}
    n++}
  o.order=seq.join(",");o.ok=/^t_loot,hl:packcap,t_pack,hl:bag/.test(o.order);
  // tap an item twice to drop it
  const before=R.bag.length;app.querySelector('[data-act=drop]').click();const asks=/Drop /.test(app.querySelector('[data-act=drop]').textContent);
  app.querySelector('[data-act=drop]').click();o.drop=asks&&R.bag.length===before-1;
  return o});
// a save that found loot before this prompt existed
const old=await p.evaluate(()=>{const st=S.story;delete st.flags.tut6;delete st.tips.t_pack;st.tipQ=[];st.hl=null;save();return localStorage.getItem(KEY)});
const p2=await open(old);
r.oldSkips=await p2.evaluate(()=>!!S.story.tips.t_pack&&tipOpen!=="t_pack"&&!S.story.tipQ.includes("t_pack"));
console.log(JSON.stringify(r));const bad=Object.entries(r).filter(([k,v])=>v===false||v===null||v===undefined).map(([k])=>k);
if(bad.length||errs.length||!("line" in r)||!("packText" in r)){console.log("FAIL",bad.join(", "),errs);process.exit(1)}await b.close()})();
