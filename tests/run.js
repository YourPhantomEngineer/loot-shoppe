// Runs every *.test.js in this folder and reports which ones need a look.
// A test fails if it exits with an error, the game throws a page error, or its output contains FAIL or "!!".
const {execFileSync}=require('child_process');const fs=require('fs');const path=require('path');
const only=process.argv[2];
const files=fs.readdirSync(__dirname).filter(f=>f.endsWith('.test.js')&&(!only||f.includes(only))).sort();
let bad=0;
for(const f of files){
  let out="",ok=true;
  try{out=execFileSync(process.execPath,[path.join(__dirname,f)],{encoding:'utf8',timeout:300000,stdio:['ignore','pipe','pipe']})}
  catch(e){out=(e.stdout||"")+(e.stderr||"")+"\n"+e.message;ok=false}
  const problems=out.split('\n').filter(l=>/\bFAIL\b|!!|(page )?errors:? \[\s*['"]/.test(l));
  if(problems.length)ok=false;
  console.log(`${ok?"PASS":"FAIL"}  ${f}`);
  if(!ok){bad++;console.log((problems.length?problems:out.split('\n').slice(-15)).map(l=>"      "+l).join('\n'))}
  if(process.env.VERBOSE)console.log(out.split('\n').map(l=>"      "+l).join('\n'));
}
console.log(`\n${files.length-bad}/${files.length} test files passed.`);
process.exit(bad?1:0);
