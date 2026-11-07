const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657}});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(2000);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';S.nmMode='judge';await btEnsureGraph();try{Draw();}catch(x){}});await p.waitForTimeout(800);
const hq=()=>p.evaluate(()=>!!document.getElementById('nmHq'));
// case1: toolbar old tab, board closed
await p.evaluate(()=>nmRmTabGo('rally'));await p.waitForTimeout(1600);
console.log('back btn',await p.evaluate(()=>!!document.getElementById('nmHqBack')));
await p.evaluate(()=>document.getElementById('nmHqBack').click());await p.waitForTimeout(1500);
console.log('case1 tab',await p.evaluate(()=>S.tab),'board',await hq());
// case2: board open then old tab
await p.evaluate(()=>{nmHqOpen();nmRmTabGo('rally');});await p.waitForTimeout(1600);
await p.evaluate(()=>document.getElementById('nmHqBack').click());await p.waitForTimeout(1500);
console.log('case2 tab',await p.evaluate(()=>S.tab),'board',await hq());
console.log(JSON.stringify(e));await b.close();})();
