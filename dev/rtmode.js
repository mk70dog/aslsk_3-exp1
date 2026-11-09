// v966: 「経路」ボタンだけで(Drawを呼ばずに)いけないヘクスが暗くなるか
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700}});const Er=[];p.on('pageerror',x=>Er.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S26';for(var i=0;i<4;i++){try{Draw();}catch(e){}await new Promise(r=>setTimeout(r,1500));}await btEnsureGraph();nmRtmStart();});await p.waitForTimeout(800);
const cnt=()=>p.evaluate(()=>[...document.querySelectorAll('svg polygon')].filter(x=>x.getAttribute('fill')==='#3aa0ff').length);
await p.evaluate(async()=>{var N=BTG.nodes,id=nm=>N.findIndex(n=>n.nm===nm);window.__H=nmHexOfNode(id('tX5'));window.losHexAtClient=()=>window.__H;nmRtmTap(1,1);await new Promise(r=>setTimeout(r,300));nmRtmDecide();});await p.waitForTimeout(1200);
const a=await cnt();await p.evaluate(()=>{var b=[...document.querySelectorAll('#nmRtmBn button')].find(x=>/経路/.test(x.textContent));b.click();});await p.waitForTimeout(800);const c=await cnt();
console.log('bright before='+a+' after 経路='+c);console.log('err',Er.length);await b.close();})();
