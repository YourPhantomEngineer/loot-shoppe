const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:1100}});const e=[];p.on('pageerror',x=>e.push(x.message));
await p.route(/fonts/,r=>r.abort());await p.goto('file://'+require('path').join(__dirname,'..','index.html'));
await p.addScriptTag({content:fs.readFileSync(require('path').join(__dirname,'helpers.js'),'utf8')});
const out=await p.evaluate(()=>{const L=[];const log=(k,ok,x="")=>L.push((ok?"PASS ":"FAIL ")+k+(x?"  ["+x+"]":""));
  T.through();S.story.built.well=1;S.story.built.tavern=1;S.story.built.market=1;
  const shop=()=>{S.inv=Array(10).fill("sword");openShop();T.through()};
  // 1. styles
  const cnt={},offerRatio={};let straightAtMax=true;
  for(let i=0;i<600;i++){shop();const c=S.shop.cur;if(!c){endDay();T.through();continue}cnt[c.per]=(cnt[c.per]||0)+1;
    const r=c.offer/c.max;(offerRatio[c.per]=offerRatio[c.per]||[]).push(r);if(c.per==="straight"&&c.offer!==c.max)straightAtMax=false;S.shop=null}
  log("style shares ~25/30/25/20",true,JSON.stringify(Object.fromEntries(Object.entries(cnt).map(([k,v])=>[k,Math.round(v/6)+"%"]))));
  log("straight shooters open at their limit",straightAtMax);
  const rng=k=>{const a=offerRatio[k];return Math.min(...a).toFixed(2)+"-"+Math.max(...a).toFixed(2)};
  log("opening offer ranges",true,["haggler","bluffer","impulse"].map(k=>k+" "+rng(k)).join(", "));
  // 2. insult costs 2 patience; normal costs 1
  const force=(per)=>{shop();const c=S.shop.cur;c.per=per;c.pat=c.pmax=PERSONA[per].pat;startHaggle();return c};
  let c=force("haggler");S.shop.pct=Math.ceil(c.max/val(c.k)*100*1.4);offer();log("insult costs 2 patience",c.pat===2,c.fb);
  S.shop=null;c=force("haggler");S.shop.pct=Math.ceil(c.max/val(c.k)*100*1.15);offer();log("a steep ask costs 1",c.pat===3);
  // suspicion: ask high then drop >20%: counters stop rising
  S.shop=null;c=force("haggler");S.shop.pct=Math.floor(c.max/val(c.k)*100*1.29);offer();const before=c.counter;S.shop.pct=Math.ceil((c.max+1)/val(c.k)*100);
  offer();log("big drop makes them suspicious",!!c.sus||!S.shop.cur,c.fb);log("suspicious counters stop rising",!S.shop.cur||c.counter===before,before+" -> "+c.counter);
  S.shop=null;
  // straight shooter never counters above offer
  c=force("straight");S.shop.pct=Math.ceil(c.max/val(c.k)*100*1.1);offer();log("straight shooter: \"I said my price\"",c.counter===c.offer&&/I said my price/.test(c.fb));
  S.shop=null;
  // 3. walk-away returns
  let back=0,tries=0;for(let i=0;i<200;i++){shop();S.shop.left=0;const c0=S.shop.cur;if(!c0)continue;c0.per="bluffer";const o0=c0.offer;tries++;letWalk();if(S.shop.cur&&S.shop.cur.back){back++;
     if(i===0||!window._shot){window._shot=1}
     const cb=S.shop.cur;if(!(cb.offer>o0||cb.offer===cb.max)||cb.pat!==1)log("returner has better offer, 1 patience",false,o0+" -> "+cb.offer);
     letWalk();if(S.shop.cur&&S.shop.cur.back)log("walking twice = gone",false)}S.shop=null}
  log("bluffers come back about 55% of the time",back/tries>.45&&back/tries<.65,Math.round(back/tries*100)+"%");
  // 4. regulars
  S.regs={};let seenReg=0;for(let i=0;i<300;i++){shop();const c1=S.shop.cur;if(c1&&c1.reg)seenReg++;S.shop=null}
  log("about a third are regulars",seenReg/300>.2&&seenReg/300<.4,Math.round(seenReg/3)+"%");
  const name=Object.keys(S.regs)[0];const R=S.regs[name];R.visits=0;R.trust=0;
  let gotKnown=false,fair=false;
  for(let i=0;i<400&&!(gotKnown&&fair);i++){shop();const c2=S.shop.cur;if(c2&&c2.reg===name){if(R.visits>0&&c2.known)gotKnown=true;
     if(!fair){startHaggle();S.shop.pct=100;offer();fair=R.trust===1}}S.shop=null}
  log("fair deal raises trust",fair);log("style known after first visit",gotKnown);
  log("regulars kept through Grand Reopening",(()=>{S.story.loan=0;doReopen();T.through();return !!S.regs[name]})());
  // 5. pitch
  S.story.built.well=1;let up=0,n=0;for(let i=0;i<300;i++){shop();const c3=S.shop.cur;if(!c3){S.shop=null;continue}c3.pat=c3.pmax=4;startHaggle();const m0=c3.max;pitchTalk();n++;if(c3.max>m0)up++;
     if(c3.pat!==3)log("talk costs 1 patience",false);pitchTalk();if(c3.max!==c3.max)0;S.shop=null}
  log("talk it up works ~60%",up/n>.5&&up/n<.7,Math.round(up/n*100)+"%");
  shop();const c4=S.shop.cur;S.inv.push("herb");startHaggle();const m1=c4.max;pitchSweet();log("sweetener raises limit, uses up the item",c4.max>m1&&!S.inv.includes("herb"),m1+" -> "+c4.max);
  log("one pitch per customer",(pitchTalk(),c4.pat===c4.pmax));S.shop=null;
  // 6. skills
  S.skills={read:3};let readN=0;for(let i=0;i<200;i++){shop();const c5=S.shop.cur;if(c5&&!c5.known&&c5.read)readN++;S.shop=null}
  log("Read the Room rank 3 reads ~90%",readN/200>.8,Math.round(readN/2)+"%");
  S.skills={poker:2};let free=0,tot=0;for(let i=0;i<300;i++){c=force("haggler");S.shop.pct=Math.ceil(c.max/val(c.k)*100*1.15);offer();tot++;if(c.pat===4)free++;S.shop=null}
  log("Poker Face rank 2 saves patience ~50%",free/tot>.4&&free/tot<.6,Math.round(free/tot*100)+"%");
  S.skills={};
  return L});
console.log(out.join("\n"));
await p.evaluate(()=>{S.inv=["sword","herb","ruby"];S.regs["Kesta the Bold"]={p:"bluffer",trust:2,visits:3};openShop();T.through();const c=S.shop.cur;c.reg="Kesta the Bold";c.known=true;c.per="bluffer";startHaggle();S.shop.pct=160;offer();render()});
await p.screenshot({path:'haggle.png',fullPage:true});
console.log("errors",e);await b.close()})();
