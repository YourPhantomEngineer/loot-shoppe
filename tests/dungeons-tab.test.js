// The dungeon list lives on its own Dungeons tab (second, after Town). Prompts that point at a dungeon outline the
// Dungeons tab first. No player-facing text says "delve" or "delving". Tab labels never get cut off on phones.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const b=await chromium.launch();const errs=[];const H=fs.readFileSync(path.join(__dirname,'helpers.js'),'utf8');
const open=async(w=390)=>{const p=await b.newPage({viewport:{width:w,height:844}});p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+path.join(__dirname,'..','index.html'));await p.evaluate(()=>localStorage.clear());await p.reload();
  await p.addScriptTag({content:H});return p};
const p=await open();
const r=await p.evaluate(()=>{const o={},seen=[];
  // new game: the cellar prompt outlines the Dungeons tab, then the Mossy Cellar on it
  let n=0;while((scn||tipOpen)&&n<20){if(scn)scnGo("next");else document.querySelector('#ov [data-act=tipOk]').click();n++}
  while(S.story.hl&&S.story.hl!=="h_cellar"&&n<40){const H=hlSpec();if(H&&H.tab)tab=H.tab;render();app.querySelector('.hl')?.click();playNext();n++}
  tab="town";render();o.tabFirst=S.story.hl==="h_cellar"&&!!app.querySelector('.hl[data-act=tab][data-t="dun"]')&&!app.querySelector('[data-act=delve]');
  app.querySelector('[data-act=tab][data-t="dun"]').click();o.cellarHl=tab==="dun"&&!!app.querySelector('.hl[data-act=delve][data-i="0"]');
  o.order=[...document.querySelectorAll('.tabs button')].map(x=>x.dataset.t).slice(0,3).join()==="town,dun,work";
  o.heading=/^Dungeons/.test(app.querySelector('.town-expedition h2').textContent);
  // a later unlock highlight (Sunken Mine) also goes via the Dungeons tab
  hlClear();S.story.flags.mine=1;tab="town";hlSet("h_mine");render();o.mineTab=!!app.querySelector('.hl[data-t="dun"]');
  tab="dun";render();o.mineRow=!!app.querySelector('.hl[data-act=delve][data-i="1"]');hlClear();
  // no "delve"/"delving" anywhere the player can read: every tab, a dungeon run, item info and a staff hire
  T.rich();S.story.flags.skills=true;S.inv.push("whet","bomb","herb","dagger");S.belt=["whet"];S.story.built.tavern=1;
  const txt=[];for(const t of ["town","dun","work","upg","skills","journal"]){tab=t;render();txt.push(app.innerText)}
  for(const k of ["whet","bomb","herb","dagger","rope"]){infoK=k;drawOv();txt.push(document.getElementById("ov").innerText);infoK=null;drawOv()}
  tab="dun";render();startDelve(0);T.through();txt.push(app.innerText);
  txt.push(SCN["1.2"].title,...SCN["1.2"].cards.flatMap(c=>R_(c).s.map(x=>[].concat(x).join(" "))),SCN["1.5"]?SCN["1.5"].cards.flatMap(c=>R_(c).s.map(x=>[].concat(x).join(" "))).join(" "):"");
  for(const t in TIPS)if(TIPS[t].t)txt.push(R_(TIPS[t].t));
  txt.push(document.querySelector('meta[name=description]').content);
  const hits=txt.join("\n").match(/[^\n]{0,30}\bdelv(e|es|ing)\b[^\n]{0,20}/gi);o.noDelve=!hits;o.hits=hits?hits.slice(0,3).join(" | "):"";
  return o});
r.hits===""&&delete r.hits;
// tab labels fit at every phone width, with five and six tabs
r.fit=true;for(const w of [320,360,390,430])for(const six of [false,true]){const q=await open(w);
  const bad=await q.evaluate(six=>{T.through();S.story.flags.skills=six;tab="dun";render();return [...document.querySelectorAll('.tabs button')].some(x=>x.scrollWidth>x.clientWidth)||document.documentElement.scrollWidth>innerWidth},six);
  if(bad){r.fit=false;r.fitFail=w+"/"+(six?6:5)}await q.close()}
console.log(JSON.stringify(r));const bad=Object.entries(r).filter(([k,v])=>v===false||v===null).map(([k])=>k);
if(bad.length||errs.length){console.log("FAIL",bad.join(", "),errs);process.exit(1)}await b.close()})();
