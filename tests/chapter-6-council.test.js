// Chapter 6: the war council waits for its Journal button; Wren's and Bram's prompts appear once with their highlights;
// the forge only works with every material; old saves past the council don't replay it. Also: the Spoon Man is the
// first collector after the Market Square opens, including for a save already in Chapter 4.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const b=await chromium.launch();const errs=[];const H=fs.readFileSync(path.join(__dirname,'helpers.js'),'utf8');
const open=async(save)=>{const p=await b.newPage({viewport:{width:390,height:844}});p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+path.join(__dirname,'..','index.html'));await p.evaluate(s=>{localStorage.clear();if(s)localStorage.setItem(KEY,s)},save);await p.reload();
  await p.addScriptTag({content:H});return p};
const p=await open();
const r=await p.evaluate(()=>{const o={},ov=()=>document.querySelector('#ov:not([hidden]) .ovcard')?.textContent||"";
  const ok=()=>document.querySelector('#ov [data-act=tipOk]')?.click();
  // jump to the end of Chapter 5
  T.through();const st=S.story;for(let c=1;c<=5;c++){for(const g of chGoals(c))st.goals[g.id]=S.day;st.flags["ch"+c+"done"]=S.day;if(c<5)st.flags["ch"+c+"ended"]=S.day}
  for(const id of Object.keys(SCN))if(/^[1-5]\\./.test(id))st.seen[id]=S.day;for(const t in TIPS)st.tips[t]=st.tips[t]||S.day;delete st.tips.t_council;delete st.tips.t_forge;delete st.tips.h_heart;
  st.ch=5;st.items.shard1=st.items.shard2=S.day;for(const k of ["well","tavern","apothecary","smithy","market","watch","obs"])st.built[k]=S.day;st.tipQ=[];st.queue=[];hlClear();
  tab="journal";render();app.querySelector('[data-act=nextCh]').click();
  o.ch6=st.ch===6&&/call the war council from this journal/.test(st.journal.at(-1).text);
  o.prompt=tipOpen==="t_council"&&/call the war council/.test(ov());ok();tab="town";render();
  o.tabHl=!!app.querySelector('.hl[data-t="journal"]');
  endDay();T.through();o.waitsAfterDay=!seen("6.1");   // no longer plays on a new day
  // T.through cleared the highlight above; put it back to check the button highlight
  hlSet("t_council");tab="journal";render();const btn=app.querySelector('[data-act=council]');o.btnHl=!!btn&&btn.classList.contains("hl");
  o.goalText=/tap its button on this goal/.test(app.querySelector('.goals').textContent)&&/made at Bram's forge in the Journal, below Ledgers/.test(app.querySelector('.goals').textContent);
  btn.click();o.councilPlays=scn&&scn.id==="6.1";while(scn)scnGo("next");
  o.forgePrompt=tipOpen==="t_forge"&&/Bram/.test(ov())&&/under the Ledgers/.test(ov());ok();render();
  const forge=document.getElementById("forge");o.forgeHl=!!forge&&forge.classList.contains("hl");
  const secs=[...app.querySelectorAll('section h2')].map(h=>h.textContent);o.belowLedgers=secs.indexOf("Bram's forge")===secs.findIndex(t=>/Ledgers/.test(t))+1;
  T.through();tab="journal";S.mats={ember:6,ore:6,dust:3};render();const fb=()=>app.querySelector('#forge [data-act=forge]');
  o.forgeLocked=fb().disabled&&/Still needed: 1 more Stardust/.test(document.getElementById("forge").textContent);
  S.mats.dust=4;render();o.forgeReady=!fb().disabled;fb().click();o.forged=!!S.story.items.weapon&&goalDone("c6weapon")&&S.mats.dust===0&&!S.story.items.shard1&&scn&&scn.id==="6.2";T.through();
  o.promptsOnce=["t_council","t_forge"].every(t=>!S.story.tipQ.includes(t));
  // the forge stays in the Journal after the blade is made, marked done like a repaired building
  tab="journal";render();const fs2=document.getElementById("forge");
  o.forgeStays=!!fs2&&/Forged/.test(fs2.textContent)&&/✓/.test(fs2.textContent)&&!fs2.querySelector('[data-act=forge]');
  // the delve screen shows the blade's attack bonus
  startDelve(0);T.through();o.delveBuff=[...app.querySelectorAll('.buff')].some(e=>e.innerHTML==="Star-forged blade:<br>Attack +50%");
  // with another attack bonus on top, it's labelled "Other:" under the blade's line
  S.run.atkB=1.3;render();const bf=[...app.querySelectorAll('.buff')].map(e=>e.innerHTML);
  o.otherBuff=bf.length===2&&bf[0]==="Star-forged blade:<br>Attack +50%"&&bf[1]==="Other:<br>Attack +30%";
  return o});
// a save already past the war council
const after=await p.evaluate(()=>{save();return localStorage.getItem(KEY)});
const p2=await open(after.replace('"tut3":','"tut3x":').replace(/"t_council":\d+,?/,"").replace(/"t_forge":\d+,?/,""));
r.oldSave=await p2.evaluate(()=>!tipOpen&&!scn&&!S.story.tipQ.includes("t_council")&&!S.story.tipQ.includes("t_forge")&&!S.story.queue.includes("6.1"));
// Spoon Man: a Chapter 4 save from before the Market Square
const p3=await open();
r.spoon=await p3.evaluate(()=>{T.toCh3();T.rich();const st=S.story;for(const g of chGoals(3))st.goals[g.id]=S.day;T.through();
  if(st.ch<4){st.ch=4;st.chDay=S.day}delete st.flags.spoonDone;delete st.tips.i_coll;
  save();return localStorage.getItem(KEY)});
const p4=await open(r.spoon);
r.spoon=await p4.evaluate(()=>{const st=S.story;T.rich();repair("market");T.through();
  let first=null,g=0;while(!first&&g<40){S.inv.push("ring","quartz","dagger");openShop();T.through();
    while(S.shop&&S.shop.cur){const c=S.shop.cur;if(CUST[c.t].k==="coll"&&!first)first=c.reg+"|"+(tipOpen||"");T.through();sell(c.offer);T.through()}if(S.shop)endDay();T.through();g++}
  return {first,introSeen:!!st.tips.i_coll,intro:TIPS.i_coll.t,portrait:sprKey("The Spoon Man")}});
r.spoonOk=r.spoon.first&&r.spoon.first.startsWith("the Spoon Man")&&r.spoon.introSeen&&/Any spoons/.test(r.spoon.intro)&&r.spoon.portrait==="coll";
console.log(JSON.stringify(r));const bad=Object.entries(r).filter(([k,v])=>v===false||v===null).map(([k])=>k);
if(bad.length||errs.length){console.log("FAIL",bad.join(", "),errs);process.exit(1)}await b.close()})();
