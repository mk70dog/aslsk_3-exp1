const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1133,height:744},deviceScaleFactor:2});p.on('console',m=>{if(m.text().startsWith('dbg'))console.log(m.text().slice(0,600));});const E=[];p.on('pageerror',x=>E.push(String(x).slice(0,200)));
await p.goto('file:///home/claude/aslsk_3-exp1/index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S24';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
console.log(await p.evaluate(async()=>{await btEnsureGraph();var a=null,bn=null;outer:for(var y=250;y<600;y+=40)for(var x=300;x<800;x+=40){var h1=losHexAtClient(x,y);if(!h1)continue;var n1=btNodeOf(h1.boardId,h1.col,h1.row);if(n1==null||n1<0)continue;for(var n2=0;n2<BTG.nodes.length;n2++){if(btDist(n1,n2)!==3)continue;var r=btLosABRaw(n1,n2);if(r&&!r.blocked&&!r.hindranceDrm){a=n1;bn=n2;break outer;}}}var A=nmHexOfNode(a),B=nmHexOfNode(bn);
var sv=nmGeSaved('A','GER');sv.pickerNat='GER';['4-4-7[2]','4-4-7[2]','4-4-7[2]'].forEach(l=>nmGeAddCore('A','GER','mmc',l));var sv2=nmGeSaved('B','SOV');sv2.pickerNat='SOV';['9-1','6-2-8[E]','4-4-7[1]'].forEach(l=>nmGeAddCore('B','SOV',l==='9-1'?'smc':'mmc',l));
S_LOS.friendHexes=[{boardId:A.boardId,col:A.col,row:A.row,st:{},grp:'A'}];S_LOS.enemyHexes=[{boardId:B.boardId,col:B.col,row:B.row,st:{},grp:'B'}];Draw();
S_LOS.pxA={x:BTG.nodes[a].x,y:BTG.nodes[a].y};S_LOS.pxB={x:BTG.nodes[bn].x,y:BTG.nodes[bn].y};LosRunPixel();await new Promise(r=>setTimeout(r,800));window.__a=a;window.__b=bn;
return a+'>'+bn;}));
await p.evaluate(async()=>{nmIjOpen();await new Promise(r=>setTimeout(r,1200));});
const X="html"+":root".repeat(40)+" ";
for(const [k,w] of [['now',0],['p1',1],['p07',0.7],['p05',0.5]]){await p.evaluate(([c])=>{var e=document.getElementById('smpIjB');if(!e){e=document.createElement('style');e.id='smpIjB';document.head.appendChild(e);}e.textContent=c;},[w?X+'#nmIj .ijFrm{border-width:'+w+'px!important}':'']);await p.waitForTimeout(300);
 const r=await p.evaluate(()=>{var q=document.querySelector('#nmIj .ijFa').getBoundingClientRect(),q2=document.querySelector('#nmIj .ijFb').getBoundingClientRect();return {x:q.left-8,y:q.top-14,width:q2.right-q.left+16,height:300};});await p.screenshot({path:'ijb_'+k+'.png',clip:r});}
console.log(E);await b.close();})();
