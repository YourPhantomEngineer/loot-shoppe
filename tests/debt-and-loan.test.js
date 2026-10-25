// Maribel's debt grows by chapter (1,000 / 5,000 / 15,000 / 40,000) and the startup loan scales with the story, with interest.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.join(__dirname,'..','index.html'));await p.evaluate(()=>localStorage.clear());await p.reload();
await p.addScriptTag({content:fs.readFileSync(path.join(__dirname,'helpers.js'),'utf8')});
const r=await p.evaluate(()=>{const o={};T.toCh3();const st=S.story;
  o.ch1Balance=st.journal.some(e=>/Balance: 61,000G/.test(e.text));
  o.firstPaid=st.debtPaid===1&&st.journal.some(e=>/Payment 1 of 4 to the Celestials: 1,000G\. Balance: 60,000G/.test(e.text));
  o.goal3=/5,000G/.test(R_(chGoals(3).find(g=>g.id==="c3pay").t));
  tab="journal";render();o.payBtn=/Pay 5,000G/.test(app.querySelector('[data-act=payDebt]').textContent);
  // startup loan in Chapter 3, from the Celestials: 1,500G cash, 2,250G owed
  st.loan=0;S.gold=0;doReopen();T.through();o.ch3Loan=S.gold===1500&&st.loan===2250&&st.loanRate===.5;
  render();o.loanRow=/2,250G left/.test(document.getElementById("loanrow").textContent)&&/borrowed 1,500G at 50% interest/.test(document.getElementById("loanrow").textContent);
  // after Marlo's Mutual opens (Scene 4.4), Chapter 5: 10,000G cash, 12,500G owed
  st.loan=0;st.ch=5;st.seen["4.4"]=S.day;doReopen();T.through();o.ch5Mutual=S.gold===10000&&st.loan===12500&&/Hollowmere Mutual/.test(st.loanFrom);
  return o});
// an old save with an old 300G loan keeps it
await p.evaluate(()=>{const o=JSON.parse(JSON.stringify(S));o.story.loan=300;delete o.story.loanCash;localStorage.setItem(KEY,JSON.stringify(o))});await p.reload();
r.oldLoan=await p.evaluate(()=>S.story.loan===300&&(render(),true));
console.log(JSON.stringify(r));const bad=Object.entries(r).filter(([k,v])=>v!==true).map(([k])=>k);
if(bad.length||errs.length){console.log("FAIL",bad.join(", "),errs);process.exit(1)}await b.close()})();
