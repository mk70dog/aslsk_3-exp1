// 射撃 6.3/6.7/6.9/7.11: 砲が目標(据え付け・サイズ)、迫撃砲→車両はATT、迫撃砲は建物から撃てない
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S25';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
await p.evaluate(async()=>{await btEnsureGraph();S_LOS.friendHexes=[];S_LOS.enemyHexes=[];Draw();});await p.waitForTimeout(2000);const P=process.argv[2]||'frl';
const setup=(kind)=>p.evaluate((kind)=>{try{S_LOS.friendHexes=[];S_LOS.enemyHexes=[];var n=131,H=nmHexOfNode(n);var e0={boardId:H.boardId,col:H.col,row:H.row,facing:0,st:{}};
  if(kind==='mtr'){var m=GUN_DATA.filter(g=>g.thType==='area'&&nmVaslSrc(g.id))[0];e0.gun=m.id;}else e0.veh=nmIjVehs('GER').filter(o=>o.kind!=='gun')[0].id;nmSideList('f').push(e0);
  var t=null;BTG.nodes.forEach(function(N,i){if(t==null&&N&&btDist(n,i)===(kind==='mtr'?4:3)&&!N.tem&&!N.bldgT)t=i;});var T0=nmHexOfNode(t);var te={boardId:T0.boardId,col:T0.col,row:T0.row,facing:0,st:{}};if(kind==='mtr'){te.veh=nmIjVehs('SOV').filter(o=>o.kind!=='gun')[0].id;te.ce=true;}else te.gun=nmScenGuns()[0].id;nmSideList('e').push(te);Draw();
  NM_RM_HEX=H;BT_RM_XY={x:500,y:200};try{nmVfOpen(n,'f');}catch(x){}NM_TGT_EH=te;nmVfSet(n,'tgt',t);var B=nmVfBuild(),o=nmVfO(B),ev=btOrdEval(o);return JSON.stringify({kind:kind,gun:e0.gun,mode:B.mode,attVeh:!!B.attVeh,th:ev.th,drm:ev.drm,dl:ev.drmL,err:ev.err});}catch(x){return 'ERR '+x.stack.slice(0,300);}},kind);
console.log(await setup('gun'));
await p.evaluate(()=>{nmVfRe(NM_VF.from);});await p.waitForTimeout(500);await p.screenshot({path:P+'_1.png'});
console.log(await setup('mtr'));
console.log(await p.evaluate(()=>{var V=NM_VF;V.a=1;V.b=2;try{nmVfTH(V.from);}catch(x){return 'TH '+x;}var R=V.res;if(!R||!R.hit)return 'nohit '+JSON.stringify(R&&{fin:R.fin,th:R.th});V.c1=2;V.c2=3;nmVfEff(V.from);return JSON.stringify({fp:R.fp,idrm:R.idrm,res2:V.res2&&V.res2.t.replace(/<[^>]*>/g,' ')});}));
await p.waitForTimeout(3300);await p.evaluate(()=>{document.querySelectorAll('[id^=nmResImg]').forEach(x=>x.remove());});await p.screenshot({path:P+'_2.png'});
console.log(await p.evaluate(()=>{var bn=null;BTG.nodes.forEach(function(N,i){if(bn==null&&N&&N.bldgT&&btDist(i,NM_VF.tgt)>=3)bn=i;});var eh=nmSideList('f')[0],B0=nmHexOfNode(bn);eh.boardId=B0.boardId;eh.col=B0.col;eh.row=B0.row;var V=NM_VF;V.from=bn;var msg='';var ot=btToast;btToast=function(m){msg=m;};try{V.a=1;V.b=2;V.res=null;nmVfTH(bn);}finally{btToast=ot;}return 'bldg: '+msg+' res='+!!V.res;}));
console.log(JSON.stringify(e));await b.close();})();
