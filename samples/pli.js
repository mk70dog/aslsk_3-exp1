const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1133,height:744},deviceScaleFactor:2});const E=[];p.on('pageerror',x=>E.push(String(x).slice(0,200)));
await p.goto('file:///home/claude/aslsk_3-exp1/index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S24';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
for(const k of ['A','B','C']){await p.evaluate(async(k)=>{await btEnsureGraph();window.NM_PLINFO=k;try{BtRmClose();}catch(e){}var n=BTG.nodes.findIndex(x=>x.nm==='tP9');NM_RM_HEX=nmHexOfN(n);nmRmVehOpen(n,'f');await new Promise(r=>setTimeout(r,600));},k);
 const r=await p.evaluate(()=>{var q=document.querySelector('#btRm .rmBox').getBoundingClientRect();return {x:q.left,y:q.top,width:q.width,height:Math.min(q.height,744-q.top)};});await p.screenshot({path:'pli_'+k+'.png',clip:r});}
console.log(E);await b.close();})();
