// Shared test helpers injected into the page.
window.T={
  seenLog:[],
  tipsSeen:[],
  through(choice){ // click through every queued scene (taking `choice` on choice cards) and dismiss every pop-up
    let n=0;while((scn||tipOpen||(S.story&&S.story.hl)||(typeof chReady==='function'&&chReady()&&!S.run&&!S.shop))&&n<400){
      if(!scn&&!tipOpen&&!S.story.hl){T.chStarted=(T.chStarted||0)+1;nextChapter();n++;continue}
      if(!scn&&!tipOpen){const id=S.story.hl,H=hlSpec();T.hlSeen=(T.hlSeen||[]);
        if(H){const inTown=!S.run&&!S.shop;if(H.tab&&inTown)tab=H.tab;render();T.hlSeen.push(id+(S.story.hl!==id?":DROPPED":hlShown?":ok":H.town&&!inTown?":waiting":":notshown"))}
        if(H&&H.town&&(S.run||S.shop)){break}
        hlClear();playNext();n++;continue}
      if(scn){const c=cardAt(scn.id,scn.i);const id=scn.id;
        if(c.c){scnGo(c.c[Math.min(choice||0,c.c.length-1)][1])}else scnGo("next");
        if(!scn||scn.id!==id)T.seenLog.push(id)}
      else{T.tipsSeen.push(tipOpen);document.querySelector('#ov [data-act=tipOk]').click()}
      n++}
  },
  delve(d,opts={}){ // enter, reach stairs on floor 1, optionally fight bosses, leave
    startDelve(d);T.through();
    const R=S.run;R.hp=99999;
    return R;
  },
  win(){const R=S.run;let g=0;while(R.fight&&g<500){R.hp=99999;attack();T.through();g++}},
  boss(){const R=S.run;R.floor=DUN[R.d].floors;challengeBoss();T.through();T.win();T.through()},
  mini(){const R=S.run;R.floor=Math.ceil(DUN[R.d].floors/2);R.ev={type:"mini"};evChoice("fight");T.through();T.win();T.through()},
  home(){if(S.run)leaveDungeon();T.through()},
  day(){endDay();T.through()},
  goals(){return chGoals(S.story.ch).map(g=>(goalDone(g.id)?"✓":"·")+g.id).join(" ")},
  sellAbove(k="dagger"){S.inv.push(k);openShop();T.through();let c=S.shop.cur;
    if(!c){endDay();return false}
    c.k=k;c.max=val(k)*2;startHaggle();S.shop.pct=130;offer();T.through();if(S.shop)endDay();T.through();return true}
};
T.toCh3=function(){ // fast-forward a new game through Ch1-2
  T.through();T.delve(0);const R=S.run;R.steps=5;let g=0;while(!R.stairs&&g<300){R.hp=9999;explore();T.through();T.win();g++}
  S.xp=30;addXp(1);T.home();T.sellAbove("dagger");S.mats.scrap=(S.mats.scrap||0)+2;craft(RECIPES.findIndex(r=>r.out==="pick"));T.through();
  T.day();T.day();T.delve(0);T.mini();T.boss();T.home();S.gold+=5000;payDebt();T.through();S.mats.fiber=(S.mats.fiber||0)+9;repair("well");T.through();
};
T.rich=function(){S.gold+=50000;for(const m of ["fiber","gel","scrap","ore","ember","dust"])S.mats[m]=(S.mats[m]||0)+50};
T.reopen=function(){askReopen();T.through(0);T.through()}; // choose "Close up shop", click through reopening cards
T.snap=function(){return {ch:S.story.ch,gold:S.gold,inv:S.inv.length,lvl:lvl(),gear:S.gear.blade,mats:Object.values(S.mats).reduce((a,b)=>a+b,0),belt:S.belt.length,skills:Object.keys(S.skills).length,loan:S.story.loan,paid:S.story.debtPaid,built:Object.keys(S.story.built).length,crew:S.crew.join("+"),items:Object.keys(S.story.items).join("+"),reopens:S.story.reopens,stars:S.legacy.stars,seen:Object.keys(S.story.seen).length}};
T.lockedTry=function(){const g0=S.gold,p0=S.story.debtPaid,r0=S.story.reopens;S.gold+=5000;payDebt();askReopen();T.through(0);const r={paidChanged:S.story.debtPaid!==p0,reopened:S.story.reopens!==r0,tip:S.story.tipQ.map(id=>TIPS[id].t).pop()||""};T.through();S.gold=g0;return r};
T.payOff=function(){S.gold+=S.story.loan;payLoan(true)};
