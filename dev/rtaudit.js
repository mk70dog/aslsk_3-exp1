// 潰走ルール監査: 独立のDFS実装と nmRtPlans を多数のランダム配置で突き合わせ(SK4 3.6)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const Er=[];p.on('pageerror',x=>Er.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(a=>{window.__SC=a[0];window.__SEED=+a[1];NAVTAB('los');},[process.argv[2]||'S24',process.argv[3]||'12345']);await p.waitForTimeout(1000);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel=(window.__SC||'S24');for(var i=0;i<4;i++){try{Draw();}catch(e){}await new Promise(r=>setTimeout(r,1500));}await btEnsureGraph();});
const r=await p.evaluate(()=>{var N=BTG.nodes,seed=(window.__SEED||12345),rnd=()=>{seed=(seed*1103515245+12345)&0x7fffffff;return seed/0x7fffffff;};
 var cover=n=>N[n].cover==='bldg'||N[n].cover==='woods',tests=0,illegal=0,missRef=0,bad=[],subsetFail=0,missNear=0,withE=0;
 for(var t=0;t<260;t++){var n0=Math.floor(rnd()*N.length);if(!N[n0].nb||!N[n0].nb.length)continue;var ne=Math.floor(rnd()*3),E=[];
  for(var k=0;k<ne;k++){var cand=[n0],g=0;var q=n0;for(var s=0;s<2+Math.floor(rnd()*4);s++){var nb=N[q].nb;q=nb[Math.floor(rnd()*nb.length)];}if(q!==n0&&!E.some(e=>e.n===q))E.push({n:q,go:rnd()<0.85,rng:4,eh:null,rtGun:false,rtFac:0});}
  var sr=nmRtSearch(n0,E,6);var P=nmRtPlans(n0,E,6);tests++;if(E.length)withE++;
  // 独立実装: DFS
  var best={},los=(h,e)=>btFLOS(h,e.n).ok,occ={};E.forEach(e=>occ[e.n]=1);var pathsTo={};
  var dfs=(path,mf,a)=>{var seen=E.filter(e=>[n0].concat(path).some(h=>los(h,e)));
    N[a].nb.forEach(b=>{var ic=btInfCost(a,b);if(!ic)return;var nm=mf+ic.c;if(nm>6)return;if(occ[b]||b===n0||path.indexOf(b)>=0)return;
     var ok=true;seen.forEach(e=>{if(btDist(b,e.n)<btDist(a,e.n))ok=false;});E.forEach(e=>{if(btDist(a,e.n)<=1&&btDist(b,e.n)<=1)ok=false;});if(!ok)return;
     var np=path.concat([b]);if(best[b]==null||nm<best[b])best[b]=nm;(pathsTo[b]=pathsTo[b]||[]).push({mf:nm,path:np});dfs(np,nm,b);});};
  dfs([],0,n0);
  var adjGO=n=>E.some(e=>e.go&&btDist(e.n,n)<=1),sb=N[n0].bldg;
  var cov=Object.keys(best).map(Number).filter(n=>cover(n)&&!adjGO(n)&&!(sb&&N[n].bldg===sb));
  var K=E.filter(e=>btFLOS(n0,e.n).ok),nearK=n=>{var m=99;K.forEach(e=>m=Math.min(m,btDist(n,e.n)));return m;},d0=nearK(n0),ign=n=>K.length>0&&nearK(n)<=d0;
  var ref={},refP={};var grp=L=>{if(!L.length)return;var m=Math.min.apply(null,L.map(n=>best[n]));L.filter(n=>best[n]===m).forEach(n=>{ref[n]=1;refP[n]=(refP[n]||[]).concat((pathsTo[n]||[]).filter(pp=>pp.mf===m));});};grp(cov);grp(cov.filter(n=>!ign(n)));
  // 連鎖(参照側: 近い林・建物の隣で、その経路の続きとして合法に入れるもの)
  var key=x=>x.path.join(',');var ch=1,guard=0;while(ch&&guard++<20){ch=0;cov.forEach(q=>{Object.keys(ref).map(Number).forEach(a=>{if(a===q||N[a].nb.indexOf(q)<0)return;(refP[a]||[]).slice().forEach(pp=>{if(pp.path.indexOf(q)>=0)return;var ic=btInfCost(a,q);if(!ic||pp.mf+ic.c>6)return;var seen=E.filter(e=>[n0].concat(pp.path).some(h=>los(h,e)));var ok=true;seen.forEach(e=>{if(btDist(q,e.n)<btDist(a,e.n))ok=false;});E.forEach(e=>{if(btDist(a,e.n)<=1&&btDist(q,e.n)<=1)ok=false;});if(!ok)return;var np={mf:pp.mf+ic.c,path:pp.path.concat([q])};refP[q]=refP[q]||[];if(!refP[q].some(z=>key(z)===key(np))){refP[q].push(np);ref[q]=1;ch=1;}});});});}
  var got=P.map(x=>x.to);
  if(cov.length){var extra=got.filter(g=>!ref[g]);if(extra.length){subsetFail++;if(bad.length<5)bad.push({n:N[n0].nm,E:E.map(e=>N[e.n].nm),extra:extra.map(g=>N[g].nm)});}
    var m0=Math.min.apply(null,cov.map(n=>best[n]));var nearAll=cov.filter(n=>best[n]===m0);if(!nearAll.some(n=>got.indexOf(n)>=0)&&got.length<8){missNear++;if(bad.length<5)bad.push({n:N[n0].nm,E:E.map(e=>N[e.n].nm),miss:nearAll.map(g=>N[g].nm),got:got.map(g=>N[g].nm)});}}
  P.forEach(x=>{if(x.mf>6.0001){subsetFail++;bad.push({over:x.mf});}
   var a=n0,ok=true,mf=0;x.path.forEach((h,i)=>{var ic=btInfCost(a,h);if(!ic||occ[h])ok=false;else mf+=ic.c;var seen=E.filter(e=>[n0].concat(x.path.slice(0,i)).some(q=>los(q,e)));seen.forEach(e=>{if(btDist(h,e.n)<btDist(a,e.n))ok=false;});E.forEach(e=>{if(btDist(a,e.n)<=1&&btDist(h,e.n)<=1)ok=false;});a=h;});
   if(!ok||Math.abs(mf-x.mf)>0.001){illegal++;if(bad.length<6)bad.push({illegal:N[n0].nm,path:x.path.map(h=>N[h].nm),mf,pm:x.mf});}
   if(adjGO(x.to)){illegal++;}});
  if(cov.length){var rk=Object.keys(ref).map(Number);if(rk.length<=8&&rk.some(q=>got.indexOf(q)<0)){missRef++;if(bad.length<6)bad.push({missRef:N[n0].nm,E:E.map(e=>N[e.n].nm),ref:rk.map(q=>N[q].nm),got:got.map(q=>N[q].nm)});}}
 }
 return {tests,withE,illegal,missRef,subsetFail,missNear,bad};});
console.log(JSON.stringify(r));console.log('err',Er.length);await b.close();})();
