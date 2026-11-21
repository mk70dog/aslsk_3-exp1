const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1133,height:744},deviceScaleFactor:2});const E=[];p.on('pageerror',x=>E.push(String(x).slice(0,200)));
await p.goto('file:///home/claude/aslsk_3-exp1/index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S24';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
for(const [k,h] of [['now','tP9'],['A','tP9'],['B','tP9'],['B2','tO9']]){await p.evaluate(async([k,h])=>{await btEnsureGraph();window.NM_TERRPOP=k==='now'?null:k.replace('2','');var n=BTG.nodes.findIndex(x=>x.nm===h);nmRmInfo(n);await new Promise(r=>setTimeout(r,500));},[k,h]);
 const r=await p.evaluate(()=>{var q=document.querySelector('#btPop>div').getBoundingClientRect();return {x:q.left-4,y:q.top-4,width:q.width+8,height:q.height+8};});await p.screenshot({path:'tp_'+k+'.png',clip:r});}
console.log(E);await b.close();})();
