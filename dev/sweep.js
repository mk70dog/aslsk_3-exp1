// マルチ判定の全項目を開き、ボタンを順に押してエラーを集める
const {chromium}=require('playwright');
const SCN=process.argv[2]||'S25',CL=+(process.argv[3]||40);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657}});const errs=[];let cur='';
p.on('pageerror',x=>errs.push(cur+' | '+String(x.stack||x).split('\n').slice(0,3).join(' / ')));
p.on('console',m=>{if(m.type()==='error')errs.push(cur+' | console: '+m.text().slice(0,200));});
p.on('dialog',d=>d.dismiss());
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);
await p.evaluate((sc)=>{S.scen=S.scen||{};S.scen.sel=sc;S.nmMode='judge';NAVTAB('los');},SCN);await p.waitForTimeout(3000);
const setup=()=>p.evaluate(async()=>{await btEnsureGraph();S_LOS.friendHexes=[];S_LOS.enemyHexes=[];S_LOS.resid={};
  var fn=nmSuNats().filter(k=>nmSuSide(k)==='f')[0],en=nmSuNats().filter(k=>nmSuSide(k)==='e')[0];
  var put=function(sd,n,o){var H=nmHexOfNode(n);var e=Object.assign({boardId:H.boardId,col:H.col,row:H.row,facing:0,st:{}},o);nmSideList(sd).push(e);return e;};
  var mk=function(nat,labs){var slot=nmGeFreeSlot();labs.forEach(function(l){nmGeAddCore(slot,nat,l[0],l[1]);});nmGeSync(slot);return slot;};
  var ob=function(nat,k){return nmSuOb(nat).filter(x=>x.kind===k);};
  var A=131,nb=(BTG.nodes[A].nb||[]).filter(x=>x!=null&&x>=0);var far=null;BTG.nodes.forEach(function(N,i){if(far==null&&N&&btDist(A,i)===3)far=i;});
  var fm=ob(fn,'mmc'),fs=ob(fn,'smc'),em=ob(en,'mmc');
  var s1=mk(fn,[['mmc',fm[0].label],['mmc',(fm[1]||fm[0]).label]].concat(fs.length?[['smc',fs[0].label]]:[]));try{nmSuDcAdd(s1,nmGeList(s1).items[0].pid);}catch(x){}
  put('f',A,{grp:s1});var s2=mk(en,[['mmc',em[0].label]]);put('e',nb[0],{grp:s2});
  var fv=nmIjVehs(fn).filter(o=>o.kind!=='gun')[0],ev=nmIjVehs(en).filter(o=>o.kind!=='gun')[0],fg=nmIjVehs(fn).filter(o=>o.kind==='gun')[0],eg=nmIjVehs(en).filter(o=>o.kind==='gun')[0];
  if(fv)put('f',nb[1],{veh:fv.id});if(ev){put('e',far,{veh:ev.id});put('e',A,{veh:ev.id});}if(fg)put('f',nb[2],{gun:fg.id});if(eg)put('e',nb[3],{gun:eg.id});
  S_LOS.resid[nmResKey(nmHexOfNode(nb[0]))]=6;Draw();return 'ok';});
const clickAll=async(lbl)=>{for(let i=0;i<CL;i++){const r=await p.evaluate((i)=>{var roots=['nmHq','btRm','nmDcp','nmCcp','nmRaq','nmMh2','nmCcSc','nmSc','nmHqPk','nmNu','nmIj','nmQk','nmAdPop','nmWrq','nmSu'];var bs=[];roots.forEach(function(id){var r=document.getElementById(id);if(r&&r.offsetParent!==null||r&&getComputedStyle(r).display!=='none'&&r.style.visibility!=='hidden')[].forEach.call(r.querySelectorAll('button,.rmIt[onclick],[onclick]'),function(b){if(b.disabled)return;var t=(b.textContent||'').trim();if(/閉じる|✕|戻る|やめる|取り消す|旧タブ|リセット|削除|全部/.test(t))return;bs.push(b);});});if(!bs.length)return 'none';var b=bs[(i*7+3)%bs.length];var t=(b.textContent||'').trim().slice(0,20);try{b.click();}catch(e){return 'clickerr '+e;}return t;},i);if(r==='none')break;await p.waitForTimeout(120);}};
const tiles=['!fire','nmHqBogOpen','manh','nmHqGunOpen','raq','react','nmLwOpen','nmDcOpen','nmHqAfvOpen','nmHqMvOpen','nmMcpOpen','nmRtOpen','nmHqCcOpen','ccv','nmRlOpen','qk'];
for(const t of tiles){cur=SCN+':'+t;await setup();
  const r=await p.evaluate((t)=>{try{document.querySelectorAll('#btRm,#nmDcp,#nmCcp,#nmRaq,#nmMh2,#nmCcSc,#nmSc,#nmHqPk,#nmNu,#nmHq,#nmQk,#nmAdPop,#nmWrq').forEach(function(x){if(x.id==='btRm')try{BtRmClose();}catch(e){}else x.remove();});NM_DC=null;NM_CV=null;NM_CC=null;
    var A=BTG.nodes[131];S_LOS.pxA={x:A.x,y:A.y};S_LOS.pxB=null;
    if(t==='!fire'){var B=BTG.nodes[(BTG.nodes[131].nb||[]).filter(x=>x!=null)[0]];S_LOS.pxB={x:B.x,y:B.y};Draw();nmIjOpen();return 'ij';}
    if(t==='qk'){nmHqOpen('qk');return 'qk';}
    if(t==='raq'){var B2=BTG.nodes[(BTG.nodes[131].nb||[]).filter(x=>x!=null)[0]];S_LOS.pxB={x:B2.x,y:B2.y};nmRaqOpen();return 'raq';}
    if(t==='manh'){nmHqOpen();var x=[...document.querySelectorAll('#nmHq button')].find(b=>/人力移動/.test(b.textContent));if(x)x.click();return 'manh';}
    if(t==='react'||t==='ccv'){NM_RM_HEX=nmHexOfNode(131);BT_RM_XY={x:500,y:200};nmCvOpen(131,'f',t==='react');return t;}
    nmHqAtA(t);return 'hq';}catch(e){return 'ERR '+e.stack.slice(0,200);}},t);
  await p.waitForTimeout(500);await clickAll(t);
  console.log(t,r,'errs so far',errs.length);}
console.log('=== ERRORS ('+errs.length+')');[...new Set(errs)].forEach(e=>console.log(e));await b.close();})();
