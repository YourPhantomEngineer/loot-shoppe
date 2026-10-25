// Chapter 1 from a new save, driven by real taps on the page. Logs every prompt and what it highlights.
const {chromium}=require('playwright');
(async()=>{
const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];
p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+require('path').join(__dirname,'..','index.html'));
await p.evaluate(()=>localStorage.clear());await p.reload();
const guide=await p.evaluate(()=>({introCards:SCN["1.1"].cards.length,combatTip:TIPS.t_combat.t}));
if(guide.introCards!==3||!guide.combatTip.includes("don't attack that turn")||!guide.combatTip.includes("70% less damage"))throw new Error("Tutorial copy regression: "+JSON.stringify(guide));
const out=await p.evaluate(()=>{
  const L=[];let lastKey="";
  const desc=e=>e.dataset.t?`tab:${e.dataset.t}`:e.dataset.act?`${e.dataset.act}${e.dataset.i!==undefined?":"+e.dataset.i:""}${e.dataset.k?":"+e.dataset.k:""}`:e.id?`#${e.id}`:"."+e.className.split(" ")[0];
  const oRender=render;render=function(){oRender();const h=S.story.hl;const els=[...app.querySelectorAll(".hl")];
    if(h&&els.length){const k=h+" -> "+els.map(desc).join(",")+(app.querySelector(".tutcall")?" +callout":"");if(k!==lastKey){L.push("  HL "+k);lastKey=k}}};
  const oDraw=drawOv;drawOv=function(){oDraw();if(tipOpen&&!scn){const k="TIP "+tipOpen+": "+TIPS[tipOpen].t;if(L[L.length-1]!==k)L.push(k)}};
  const ovClick=()=>{const bt=document.querySelector("#ov button");if(!bt)return false;if(scn&&!L.includes("SCN "+scn.id))L.push("SCN "+scn.id);bt.click();return true};
  const drain=()=>{let n=0;while(ovClick()&&n<200)n++};
  const tap=sel=>{const e=app.querySelector(sel);if(!e)return L.push("!! missing "+sel);e.click();drain()};
  const tapHl=()=>{const e=app.querySelector(".hl");if(!e)return L.push("!! no highlight");L.push("  tap "+desc(e));e.click();drain()};
  const tapBlank=()=>{L.push("  tap blank");app.querySelector("header h1")?.click();drain()};
  drain();                       // 1.1 + Journal prompt
  tapHl();                       // Journal tab
  tapHl();                       // Town tab (Mossy Cellar is on Town)
  tapHl();                       // Mossy Cellar
  let g=0;const want=()=>["t_combat","t_hit","t_loot","t_floor"].every(t=>S.story.tips[t]);
  while(S.run&&g<300){S.run.hp=Math.max(S.run.hp,60);
    if(S.run.fight)tap("[data-act=attack]");
    else if(S.run.ev)tap("[data-act=ev]:last-child");
    else if(S.run.stairs&&want())break;
    else tap("[data-act=explore]");
    g++}
  L.push("-- floor 1 done, heading home");
  tap("[data-act=leave]");       // Return to town -> 1.3 -> Market prompt
  tapBlank();                    // any tap ends the Market Today highlight
  S.inv.push("dagger","dagger","ring");render();
  tapHl();                       // Open the shop
  let guard=0;const haggled={done:false};
  while(S.shop&&guard<40){const c=S.shop.cur;guard++;
    if(!c){tap("[data-act=close]");break}
    if(app.querySelector(".hl")){tapBlank();continue}
    if(!S.sold){tap("[data-act=acceptOffer]");continue}
    if(!haggled.done&&c.phase==="offer"){c.k="dagger";c.max=val("dagger")*2;tap("[data-act=haggle]");S.shop.pct=125;render();tap("[data-act=offer]");haggled.done=true;continue}
    if(c.phase==="offer")tap("[data-act=acceptOffer]");else tap("[data-act=refuse]")}
  L.push("-- shop day over");
  tapHl();                       // Workshop tab
  tapHl();                       // Upgrades tab
  tap('[data-t="work"]');S.mats.scrap=(S.mats.scrap||0)+4;render();
  tap(`[data-act=craft][data-i="${RECIPES.findIndex(r=>r.out==="pick")}"]`);
  tapHl();                       // Town tab
  S.inv.push("herb");render();L.push("  tap equip herb");tap("[data-act=equip][data-k=herb]");
  tapBlank();
  L.push("-- second delve for the belt");
  tap('[data-act=delve][data-i="0"]');
  g=0;while(S.run&&!S.story.tips.t_belt&&g<300){
    if(S.run.fight){S.run.hp=Math.min(S.run.hp,10);const u=app.querySelector("#usepanel [data-act=use]:not([disabled])");if(u){L.push("  tap use belt");u.click();drain();continue}tap("[data-act=attack]")}
    else if(S.run.ev)tap("[data-act=ev]:last-child");else tap("[data-act=explore]");
    g++}
  if(app.querySelector(".hl"))tapBlank();
  g=0;while(S.run&&S.run.fight&&g<200){S.run.hp=999;tap("[data-act=attack]");g++}
  if(S.run&&S.run.ev)tap("[data-act=ev]:last-child");
  if(S.run)tap("[data-act=leave]");
  L.push("   ch1done flag="+fl("ch1done")+" day="+S.day);
  L.push("-- next day: the letter");

  // end another day to trigger 1.7
  S.inv.push("dagger");render();tap("[data-act=shop]");let k=0;while(S.shop&&k<20){if(app.querySelector(".hl"))tapBlank();else if(S.shop.cur)tap("[data-act=refuse]");else tap("[data-act=close]");k++}
  tapHl();                       // Skills tab
  tapHl();                       // Journal tab (Pay is there)
  tapBlank();
  return {L,ch:S.story.ch,goals:chGoals(1).map(g=>g.id+(goalDone(g.id)?"✓":"·")).join(" "),hl:S.story.hl,q:S.story.tipQ};
});
console.log(out.L.join("\n"));console.log("ch",out.ch,"| ch1 goals",out.goals,"| hl",out.hl,"| queue",out.q.join(","));
// Reload: tutorial state shouldn't replay
const after=await p.evaluate(()=>{save();return JSON.stringify(S.story.tips)});
await p.reload();
const re=await p.evaluate(()=>({tipOpen,scn:scn&&scn.id,hl:S.story.hl,q:S.story.tipQ}));
console.log("after reload",JSON.stringify(re));
console.log("errors",errs);await b.close()})();
