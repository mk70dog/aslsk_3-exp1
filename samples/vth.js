const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1133,height:744},deviceScaleFactor:2});const E=[];p.on('pageerror',x=>E.push(String(x).slice(0,200)));
await p.goto('file:///home/claude/aslsk_3-exp1/index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S24';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
await p.evaluate(async()=>{await btEnsureGraph();var a=null,bn=null;outer:for(var y=250;y<600;y+=40)for(var x=300;x<800;x+=40){var h1=losHexAtClient(x,y);if(!h1)continue;var n1=btNodeOf(h1.boardId,h1.col,h1.row);if(n1==null||n1<0)continue;for(var n2=0;n2<BTG.nodes.length;n2++){if(btDist(n1,n2)!==5)continue;var r=btLosABRaw(n1,n2);if(r&&!r.blocked&&r.hindranceDrm>=1&&BTG.nodes[n2].tem>=1){a=n1;bn=n2;break outer;}}}
 var A=nmHexOfNode(a),B=nmHexOfNode(bn);S_LOS.friendHexes=[{boardId:A.boardId,col:A.col,row:A.row,facing:0,st:{},veh:'afv_pz3n_ge'}];S_LOS.enemyHexes=[{boardId:B.boardId,col:B.col,row:B.row,facing:3,st:{},veh:'afv_sherman3a_ll_sov'}];Draw();window.__a=a;window.__b=bn;
 });
for(const st of ['now','A','B','C']){
 await p.evaluate(async(st)=>{window.NM_VFTH=st==='now'?null:st;try{BtRmClose();}catch(e){}NM_RM_HEX=nmHexOfN(window.__a);nmHqAfvOpen(window.__a,'f');await new Promise(r=>setTimeout(r,400));NM_PHU=false;nmVfSet(window.__a,'tgt',window.__b);await new Promise(r=>setTimeout(r,900));document.querySelectorAll('.nmToast,#btToast').forEach(e=>e.remove());},st);
 const rr=await p.evaluate(()=>{var e=[...document.querySelectorAll('#btRm .rmIt')].filter(x=>/命中TH#/.test(x.innerText))[0];if(!e)return null;var q=e.getBoundingClientRect();return {x:q.left-6,y:q.top-6,width:q.width+12,height:q.height+12};});
 if(!rr){await p.screenshot({path:'vth_dbg.png'});console.log('none',st);continue;}
 await p.screenshot({path:'vth_'+st+'.png',clip:rr});}
console.log(E);await b.close();})();
