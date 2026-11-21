const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1133,height:744},deviceScaleFactor:2});
await p.goto('file:///home/claude/aslsk_3-exp1/index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S24';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
const V={now:'',A:600,B:400,C:300};
for(const kind of ['ssr','vic'])for(const k of Object.keys(V)){
 await p.evaluate(([kind,w])=>{var st=document.getElementById('smpThin');if(!st){st=document.createElement('style');st.id='smpThin';document.head.appendChild(st);}st.textContent=w?'#nmScnTxt div[style*="font-size:19px"]{font-weight:'+w+'!important;'+(w==300?'font-family:AppFont,"Noto Sans CJK JP",sans-serif!important':'')+'}':'';nmScnTxtPop(kind);},[kind,V[k]]);
 await p.waitForTimeout(500);
 const r=await p.evaluate(()=>{var e=document.querySelector('#nmScnTxt>div').getBoundingClientRect();return {x:e.left,y:e.top,width:e.width,height:e.height};});
 await p.screenshot({path:'hd_'+kind+'_'+k+'.png',clip:r});}
await b.close();})();
