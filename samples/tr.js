const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1133,height:744},deviceScaleFactor:2});
await p.goto('file:///home/claude/aslsk_3-exp1/index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S24';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
const X="html"+":not(#_nmTr)".repeat(8)+":root".repeat(40)+" ";
const C=X+'#nmAbBd{background:#000b!important;border:1px solid #404040!important}'+X+'#nmFtMn{background:#000b!important;background-image:none!important;border:1px solid #404040!important}';
await p.evaluate(async()=>{await btEnsureGraph();var A=BTG.nodes[187],B=BTG.nodes[169];S_LOS.pxA={x:A.x,y:A.y};S_LOS.pxB={x:B.x,y:B.y};LosRunPixel();Draw();await new Promise(r=>setTimeout(r,800));});
for(const k of ['now','tr']){await p.evaluate((c)=>{var e=document.getElementById('smpTr');if(!e){e=document.createElement('style');e.id='smpTr';document.head.appendChild(e);}e.textContent=c;},k==='tr'?C:'');
 await p.evaluate(async()=>{var m=document.getElementById('nmFtMn');if(m)m.remove();var A=BTG.nodes[187],B=BTG.nodes[169];S_LOS.pxA={x:A.x,y:A.y};S_LOS.pxB={x:B.x,y:B.y};LosRunPixel();Draw();await new Promise(r=>setTimeout(r,900));});
 const r=await p.evaluate(()=>{var q=document.getElementById('nmAbBd').getBoundingClientRect();return {x:q.left-30,y:q.top-60,width:q.width+60,height:q.height+90};});await p.screenshot({path:'tr_bar_'+k+'.png',clip:r});
 await p.evaluate(async(k)=>{var b=document.getElementById('nmFtMenuB');nmFtMenu(b);await new Promise(r=>setTimeout(r,400));if(k==='tr'){var m=document.getElementById('nmFtMn');m.style.setProperty('background','#000b','important');m.style.setProperty('border','1px solid #404040','important');m.__bgOk='#000b';}await new Promise(r=>setTimeout(r,200));},k);
 const r2=await p.evaluate(()=>{var q=document.getElementById('nmFtMn').getBoundingClientRect();return {x:q.left-20,y:q.top-10,width:q.width+40,height:Math.min(q.height+20,620)};});await p.screenshot({path:'tr_mn_'+k+'.png',clip:r2});}
await b.close();})();
