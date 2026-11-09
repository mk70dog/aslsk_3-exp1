// 敵が0の時の潰走先(最寄りの林・建物)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await new Promise(r=>setTimeout(r,1500));}await btEnsureGraph();});
const r=await p.evaluate(()=>{var N=BTG.nodes,out=[],tested=0;for(var n=0;n<N.length&&tested<400;n+=7){if(!btInfCost||N[n].cover==='bldg'||N[n].cover==='woods')continue;tested++;
 var sr=nmRtSearch(n,[],6),ks=Object.keys(sr.dist).map(Number).filter(q=>q!==n);var cv=ks.filter(q=>N[q].cover==='bldg'||N[q].cover==='woods');if(!cv.length)continue;var m=Math.min.apply(null,cv.map(q=>sr.dist[q]));
 var P=nmRtPlans(n,[],6);var bad=P.filter(q=>!q.cover||q.mf>m+3);out.push({n:N[n].nm,nearest:m,plans:P.map(q=>N[q.to].nm+':'+q.mf+(q.cover?'c':'-')).join(' '),bad:bad.length});if(out.length>=6)break;}return out;});
console.log(JSON.stringify(r,null,1));console.log('err',E.length);await b.close();})();
