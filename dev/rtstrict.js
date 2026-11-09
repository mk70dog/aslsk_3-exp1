// v960 ルール厳守: 阻止できる敵の条件・稜線の例外・積み重ね制限・SWの運搬(SK4 3.6)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const Er=[];p.on('pageerror',x=>Er.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await new Promise(r=>setTimeout(r,1500));}await btEnsureGraph();});
const r=await p.evaluate(()=>{var N=BTG.nodes,id=nm=>N.findIndex(n=>n.nm===nm),o={};try{if(!nmSdSet())nmSdAssign('SOV','f',true);}catch(e){}
 var sdF=nmSuSide('SOV'),sdE=sdF==='f'?'e':'f';NM_RTM=null;
 var mk=function(nat,hx,sd,opt){opt=opt||{};var H=nmHexOfNode(id(hx)),slot=nmGeFreeSlot();var u=nmSuOb(nat).filter(x=>x.kind==='mmc'&&!/HS|乗員/.test(x.label))[0];for(var k=0;k<(opt.n||1);k++)nmGeAddCore(slot,nat,u.kind,u.label);var its=nmGeList(slot).items;its.forEach(x=>{if(opt.brk)x.broken=true;if(opt.pin)x.pinned=true;if(opt.cx)x.cx=true;});
   var g=nmGeActive(slot)||nmGeSaved(slot,nat);(opt.sw||[]).forEach((sid,i)=>{var uid=sid+'_'+(90+i+Math.floor(Math.random()*900)*10);g.sw=g.sw||[];g.sw.push(uid);g.swOwner=g.swOwner||{};g.swOwner[uid]=its[0].pid;});nmGeSync(slot);var e={boardId:H.boardId,col:H.col,row:H.row,st:{},grp:slot};nmSideList(sd).push(e);return e;};
 var rngOf=e=>(nmRtEnemies(sdF).filter(q=>q.eh===e)[0]||{});
 var A=mk('GER','vO9',sdE);o.normal=rngOf(A).rng;
 var P=mk('GER','vL8',sdE,{pin:true});o.pinned=rngOf(P).rng+' '+rngOf(P).why+' go='+rngOf(P).go;
 var X=mk('GER','vP5',sdE,{cx:true});o.cx=rngOf(X).rng;
 var G=mk('GER','vQ5',sdE,{sw:['mmg512_ge']});o.mmg=rngOf(G).rng;
 var M=mk('GER','vR5',sdE);mk('SOV','vR5',sdF);o.melee=rngOf(M).rng+' '+rngOf(M).why;
 // 車両
 var vid=Object.keys(scenarioAfvIdsByVehId()||{}).find(v=>{var a=nmAfv(v);return a&&nmSuSide(a.nat)===sdE;});var H=nmHexOfNode(id('vS3'));var V={boardId:H.boardId,col:H.col,row:H.row,st:{},veh:vid,gun:null,facing:0,tca:0,ce:true};nmSideList(sdE).push(V);
 o.vehId=vid+' mg='+JSON.stringify((nmAfv(vid)||{}).mg)+' tt='+(nmAfv(vid)||{}).turretType;o.vehCE=rngOf(V).rng+' '+JSON.stringify(rngOf(V).wpn);V.ce=false;o.vehBU=rngOf(V).rng+' '+JSON.stringify(rngOf(V).wpn)+' '+rngOf(V).why;
 var vn=id('vS3'),tg=N.findIndex((z,zi)=>btDist(vn,zi)===6&&N[zi].og);if(tg>=0){var Ev=nmRtEnemies(sdF).filter(q=>q.eh===V);var res=[];for(var fk=0;fk<6;fk++){V.facing=fk;V.tca=fk;var E2=nmRtEnemies(sdF).filter(q=>q.eh===V),c=0,ck=0;N.forEach((z,zi)=>{var d=btDist(vn,zi);if(d<9||d>12||!z.og)return;var l=btLOS(vn,zi,true);if(!l.ok||l.hind||z.elev>N[vn].elev)return;var inA=btInArc(E2[0].wpn[1].caF,btAng(vn,zi));var r=!!nmRtInter(zi,E2,null);if(inA)c++;if(inA===r)ck++;else res.push('mismatch '+z.nm);});res.push('f'+fk+' inArc='+c+' consistent');}o.cmgCheck=res.slice(-8).join(' | ');V.facing=0;V.tca=0;
 o.buInArc=Ev.length&&Ev[0].wpn?Ev[0].wpn.map(w=>w.nm+':'+(w.caF==null||btInArc(w.caF,btAng(vn,tg)))).join(','):'';}V.ce=true;V.st.mv='mot';o.vehMot=rngOf(V).why;V.st={};V.facing=null;V.tca=null;o.vehNoFace=rngOf(V).why;
 // 稜線: 幾何チェック(直線上なら交わる)
 var hills=N.map((n,i)=>i).filter(i=>N[i].og&&N[i].nb.some(q=>N[q].elev<N[i].elev));o.hills=hills.length;var cs=0,cn=0;
 hills.slice(0,40).forEach(h=>{N[h].nb.filter(q=>N[q].elev<N[h].elev).forEach(pv=>{var dx=N[pv].x-N[h].x,dy=N[pv].y-N[h].y;var far=N.findIndex((z,zi)=>Math.abs((z.x-N[h].x)*dy-(z.y-N[h].y)*dx)<1&&((z.x-N[h].x)*dx+(z.y-N[h].y)*dy)>0&&btDist(zi,h)===3);if(far>=0){if(nmRtCrestSide(far,h,pv))cs++;else cn++;}
   var side=N[h].nb.find(q=>q!==pv&&btDist(q,pv)>1);});});o.crestStraight=cs+' ok / '+cn+' ng';
 // 積み重ね: vN7 に混乱分隊、vN8 に味方3分隊
 var R0=mk('SOV','vN7',sdF,{brk:true,sw:['mmg410_so','lmg26_so']});mk('SOV','vN8',sdF,{n:3});
 NM_RT={n:id('vN7'),sd:sdF,slot:R0.grp,done:null};var C=nmRtCalc();var ok=nmRtStackOK(sdF,C.br,id('vN7'));o.stackN8=ok(id('vN8'));o.stackN9=ok(id('vN9'));
 o.plansHaveN8=C.plans.some(q=>q.to===id('vN8'))||C.low.some(q=>q.to===id('vN8'));
 // SWの運搬: MMG(3PP)+LMG(1PP)、分隊IPC3 → MMGを運びLMGを落とす
 o.eqBefore=nmRtEqOf(R0.grp,C.br).map(q=>q.uid.split('_')[0]+':'+q.pp).join(',');
 if(C.plans.length){nmRtGo(id('vN7'),0);var D=NM_RT.done;o.carried=D.carried.join(',');o.dropped=D.dropped.join(',');o.srcKept=!D.gone;var dl=nmGeList(D.slot);o.dstSw=(dl.sw||[]).map(u=>u.split('_')[0]+'>'+((dl.own||{})[u]!=null)).join(',');var sl=nmGeList(R0.grp);o.srcSw=(sl.sw||[]).map(u=>u.split('_')[0]+'>'+((sl.own||{})[u]!=null)).join(',');}else o.noplan=1;
 return o;});
console.log(JSON.stringify(r,null,1));console.log('err',Er.length,Er.slice(0,2));await b.close();})();
