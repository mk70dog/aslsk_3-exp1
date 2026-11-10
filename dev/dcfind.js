const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1148,height:798}});
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));
const r=await p.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));var o=[];for(var i=20;i<=60;i++){var id='S'+i;S.scen=S.scen||{};S.scen.sel=id;try{Draw();}catch(e){}await W(400);try{nmSuNats().forEach(n=>{var d=nmSuOb(n).filter(x=>x.kind==='dc');if(d.length)o.push(id+' '+n+' '+d.map(x=>x.label+'x'+x.n).join());});}catch(e){}}return o;});
console.log(r.join('\n'));await b.close();})();
