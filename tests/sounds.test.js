// Sound effects: a chime for every enemy defeated, a shimmer when HP comes back, a coin purse when loot includes gold.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.join(__dirname,'..','index.html'));await p.evaluate(()=>localStorage.clear());await p.reload();
await p.addScriptTag({content:fs.readFileSync(path.join(__dirname,'helpers.js'),'utf8')});
const r=await p.evaluate(()=>{const o={};T.through();S.sound=true;
  // every effect plays through Web Audio without errors
  for(const k in sfx)sfx[k]();
  const calls=[];for(const k in sfx){const f=sfx[k];sfx[k]=(...a)=>{calls.push(k);return f(...a)}}
  const heard=fn=>{calls.length=0;fn();return [...calls]};
  startDelve(0);T.through();const R=S.run;R.hp=99999;
  // a regular enemy: victory chime and coin purse, never the plain loot blip
  let ok=true;for(let i=0;i<30;i++){makeFight("Cellar Rat","mob");R.fight.hp=1;const c=heard(attack);ok=ok&&c.includes("kill")&&c.includes("purse")&&!c.includes("loot")}
  o.mobWin=ok;
  // bosses keep their fanfare, and the gold jingles after it
  makeFight("Elite Slime","elite");R.fight.hp=1;let c=heard(attack);o.eliteWin=c.includes("win")&&c.includes("purse");
  // healing: a potion from the belt
  R.hp=1;S.belt=["herb"];c=heard(()=>useItem("belt",0));o.potionHeal=c.includes("heal")&&!c.includes("guard");
  // a chest with gold
  R.fight=null;R.ev={type:"chest"};c=heard(()=>openChest("You open it."));o.chestPurse=c.includes("purse")&&!c.includes("loot");
  // extras: critical hits ring, a clean escape whooshes
  const rnd0=Math.random;makeFight("Cellar Rat","mob");R.fight.hp=1e6;Math.random=()=>0;c=heard(attack);o.crit=c.includes("crit");
  c=heard(flee);Math.random=rnd0;o.fleeWhoosh=c.includes("whoosh")&&!S.run.fight;
  return o});
await b.close();
const bad=Object.entries(r).filter(([k,v])=>v!==true).map(([k])=>k);
console.log(JSON.stringify(r));if(bad.length||errs.length){console.log("FAIL",bad.join(", "),"errors:",errs);process.exit(1)}
})();
