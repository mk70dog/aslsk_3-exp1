const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1148,height:798}});
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));
const r=await p.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));var o=[];var ids=[];for(var i=20;i<=60;i++)ids.push('S'+i);
for(const id of ids){S.scen=S.scen||{};S.scen.sel=id;try{Draw();}catch(e){}await W(500);var g=null;try{g=scenarioGunIds();}catch(e){}if(!g)continue;var ks=Object.keys(g).filter(k=>{var d=GUN_DATA[k]||nmGun(k);var gd=(typeof gunData==='function'?gunData(k):d)||{};return (((nmGun(k)||{}).ammo)||[]).some(a=>a.type==='Smoke');});if(ks.length)o.push(id+': '+ks.join(','));}return o;});
console.log(r.join('\n'));await b.close();})();
