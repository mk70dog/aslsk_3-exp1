const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1133,height:744},deviceScaleFactor:2});const E=[];p.on('pageerror',x=>E.push(String(x).slice(0,200)));
await p.goto('file:///home/claude/aslsk_3-exp1/index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S24';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
await p.evaluate(async()=>{await btEnsureGraph();var sv2=nmGeSaved('B','SOV');sv2.pickerNat='SOV';['9-1','4-4-7[1]','4-2-6[C]'].forEach(l=>nmGeAddCore('B','SOV',l==='9-1'?'smc':'mmc',l));var n=200,H=nmHexOfNode(n);S_LOS.enemyHexes=[{boardId:H.boardId,col:H.col,row:H.row,st:{},grp:'B'}];Draw();window.__n=n;});
for(const k of ['now','A','B']){await p.evaluate(async(k)=>{window.NM_EDTILE=false;window.NM_GRPST=k==='now'?null:k;if(k!=='now'){var it=nmGeList('B').items;it[1].broken=true;}try{BtRmClose();}catch(e){}NM_RM_HEX=nmHexOfN(window.__n);btRmReopen(window.__n);await new Promise(r=>setTimeout(r,700));document.querySelectorAll('.nmToast,#btToast,[id*=Toast]').forEach(e=>e.remove());},k);
 const r=await p.evaluate(()=>{var q=document.querySelector('#btRm .rmBox').getBoundingClientRect();return {x:q.left,y:q.top,width:q.width,height:Math.min(q.height,640)};});await p.screenshot({path:'gst_'+k+'.png',clip:r});
 console.log(k,await p.evaluate(()=>document.getElementById('btRm').innerText.replace(/\s+/g,' ').slice(0,200)));}
console.log(E);await b.close();})();
