// Chapter hand-off from the Journal, Chapter 1's sleep, the fainting pop-up, item info and the attack buff by HP.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.join(__dirname,'..','index.html'));await p.evaluate(()=>localStorage.clear());await p.reload();
await p.addScriptTag({content:fs.readFileSync(path.join(__dirname,'helpers.js'),'utf8')});
const r=await p.evaluate(()=>{const out={},ov=()=>document.querySelector('#ov:not([hidden]) .ovcard')?.textContent||"";
  const okTip=()=>{const b=document.querySelector('#ov [data-act=tipOk]');if(b)b.click()};
  // --- Chapter 1: finish every goal, then Wren says to sleep ---
  T.through();T.delve(0);const R=S.run;R.steps=5;let g=0;while(!R.stairs&&g<300){R.hp=9999;explore();T.through();T.win();g++}
  T.home();T.sellAbove("dagger");S.mats.scrap=4;craft(RECIPES.findIndex(x=>x.out==="pick"));T.through();
  // make sure the last goal is finished here, by levelling up
  if(goalDone("c1lv2")){delete S.story.goals.c1lv2;delete S.story.flags.ch1done;delete S.story.tips.t_ch1done;S.xp=0}
  tab="town";render();S.xp=xpFor(2)-1;addXp(5);
  while(scn)scnGo("next");while(tipOpen&&tipOpen!=="t_ch1done")okTip();
  out.ch1prompt=tipOpen==="t_ch1done"&&/sleep/i.test(ov());okTip();
  out.ch1hlTab=!!app.querySelector('.hl[data-t="journal"]');app.querySelector('[data-t="journal"]').click();
  out.sleepHl=!!app.querySelector('.hl[data-act=sleep]');out.stillCh1=S.story.ch===1;
  const day=S.day;app.querySelector('[data-act=sleep]').click();
  out.letter=scn&&scn.id==="1.7"&&S.day===day+1;T.through();out.ch2=S.story.ch===2;
  // --- Chapter 2: finishing doesn't move on until the Journal button ---
  S.gold+=9999;T.through();for(const gl of chGoals(2))S.story.goals[gl.id]=S.day;S.story.built.well=S.day;S.story.flags.pipHired=1;
  checkChapter();playNext();out.ch2Waits=S.story.ch===2&&!S.story.flags.mine;
  out.ch2prompt=tipOpen==="t_chdone2";okTip();tab="town";render();
  app.querySelector('.hl[data-t="journal"]')?.click();const nb=app.querySelector('[data-act=nextCh]');out.nextBtn=!!nb&&nb.classList.contains("hl")&&/Chapter 3/.test(nb.textContent);
  nb.click();out.ch3=S.story.ch===3&&!!S.story.flags.mine;T.through();
  // --- Fainting pops up, even with a highlight waiting ---
  hlSet("h_mine");startDelve(0);T.through();S.run.hp=1;S.run.fight=null;S.run.ev=null;
  let k=0;while(S.run&&k<200){if(!S.run.fight){explore();while(scn)scnGo("next");while(tipOpen&&!/fainted/.test(ov()))okTip()}else{S.run.hp=1;attack()}k++}
  out.faintPopup=/You fainted/.test(ov())&&/lost/.test(ov());okTip();T.through();
  // --- Item info ---
  tab="town";S.inv.push("quartz","herb");render();app.querySelector('[data-act=info][data-k=quartz]').click();out.quartzInfo=/Found in the Mossy Cellar/.test(ov());document.querySelector('#ov [data-act=infoOk]').click();
  tab="work";S.mats={};render();const before=S.inv.length;app.querySelector(`[data-act=craft][data-i="${RECIPES.findIndex(x=>x.out==="bomb")}"] [data-act=info]`).click();
  out.bombInfo=/Combat only/.test(ov())&&/Workshop/.test(ov())&&S.inv.length===before;document.querySelector('#ov [data-act=infoOk]').click();
  out.lockedCraftIgnored=(app.querySelector(`[data-act=craft][data-i="0"]`).click(),S.inv.length===before);
  // --- Attack buff next to HP ---
  startDelve(0);T.through();S.run.atkB=1.25;render();const hpStat=[...app.querySelectorAll('.stat')].find(s=>/HP/.test(s.textContent));
  out.buffByHp=/Attack \+25%/.test(hpStat.textContent)&&!/attack \+25%/.test(app.querySelector('.dhint').textContent);
  return out});
const bad=Object.entries(r).filter(([k,v])=>v!==true).map(([k])=>k);
console.log(JSON.stringify(r));if(bad.length||errs.length){console.log("FAIL",bad.join(", "),"errors:",errs);process.exit(1)}
await b.close()})();
