// v942 潰走・阻止のライブ表示(決定なし)。S24 で 逃 vN7、敵 vO9,vL8,vN5
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
await p.evaluate(async()=>{try{localStorage.removeItem('nmRtmPos');localStorage.removeItem('nmRtmPenPos');}catch(e){}S.scen=S.scen||{};S.scen.sel='S24';try{Draw();}catch(e){}await new Promise(r=>setTimeout(r,1500));await btEnsureGraph();for(var i=0;i<6;i++){try{Draw();}catch(e){}await new Promise(r=>setTimeout(r,1500));}nmRtmStart();});await p.waitForTimeout(800);
const r=await p.evaluate(()=>{var N=BTG.nodes,id=nm=>N.findIndex(n=>n.nm===nm),nm=i=>N[i].nm;var tap=n=>{window.__H=nmHexOfNode(n);window.losHexAtClient=()=>window.__H;return nmRtmTap(1,1);};var o={};
 tap(id('vN7'));o.s1=NM_RTM.step+' rt:'+!!NM_RT+' plans0:'+nmRtCalc().plans.length;
 ['vO9','vL8','vN5','vS9'].forEach(x=>tap(id(x)));o.e4=NM_RTM.E.length;tap(id('vS9'));o.e3=NM_RTM.E.length;
 o.plans=nmRtCalc().plans.map(P=>nm(P.to)).join(',');nmRtmMode('r');tap(id('vR7'));o.pick=NM_RTM.pick&&NM_RTM.pick.path.map(nm).join('>')+' no='+NM_RTM.pick.no+' inter='+NM_RTM.pick.inter.map(nm);
 o.bn=document.getElementById('nmRtmBn').textContent;o.dec=/決定/.test(o.bn);return o;});
console.log(JSON.stringify(r,null,1));
console.log('pre',await p.evaluate(()=>nmRtCalc().E.length+' '+nmRtCalc().plans.length+' sd='+NM_RT.sd+' f='+nmSideList('f').length+' e='+nmSideList('e').length));await p.evaluate(()=>{try{BtRmClose();}catch(e){}Draw();});await p.waitForTimeout(1500);console.log('d1',await p.evaluate(()=>nmSideList('e').length));try{await p.evaluate(()=>{LosFitHeight();});}catch(e){}await p.waitForTimeout(1500);console.log('post',await p.evaluate(()=>nmRtCalc().E.length+' '+nmRtCalc().plans.length+' sd='+NM_RT.sd+' f='+nmSideList('f').length+' e='+nmSideList('e').length));await p.screenshot({path:'/tmp/sm/rtlive.png'});
await p.evaluate(()=>nmRtmCancel());console.log('tmp left',await p.evaluate(()=>nmSideList('f').concat(nmSideList('e')).filter(e=>e.ccTmp||e.ijTmp).length));
console.log(E);await b.close();})();
