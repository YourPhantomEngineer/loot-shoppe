const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+require('path').join(__dirname,'..','index.html'));
const r=await p.evaluate(()=>{
  const expected={
    c2rat:'Mossy Cellar',c2slime:'Mossy Cellar',
    c3wurm:'Sunken Mine',c3fore:'Sunken Mine',
    c4knight:'Ember Vault',c4col:'Ember Vault',
    c5golem:'Starfall Spire',c5wyrm:'Starfall Spire',
    c6exec:'Hollow Heart',c6voss:'Hollow Heart'
  };
  const goals=Object.values(CH).filter(Boolean).flatMap(ch=>ch.goals||[]);
  const missing=Object.entries(expected).filter(([id,place])=>{const g=goals.find(x=>x.id===id);return !g||typeof g.t!=='string'||!g.t.includes(place)}).map(([id,place])=>`${id}:${place}`);
  const unnamed=goals.filter(g=>typeof g.t==='string'&&g.t.startsWith('Defeat ')&&!/Mossy Cellar|Sunken Mine|Ember Vault|Starfall Spire|Hollow Heart/.test(g.t)).map(g=>g.id);
  return {checked:Object.keys(expected).length,missing,unnamed};
});
if(errs.length||r.missing.length||r.unnamed.length)throw new Error(JSON.stringify({r,errs}));
console.log(JSON.stringify(r));await b.close()})();
