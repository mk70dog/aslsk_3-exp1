// sample: ライト版 軽対戦車兵器: 兵器+操作する兵士 → 地図 → タップ → 判定(その兵器)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S26';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
await p.evaluate(async()=>{await btEnsureGraph();S_LOS.friendHexes=[];S_LOS.enemyHexes=[];S_LOS.pxA=null;Draw();nmHqOpen();});await p.waitForTimeout(800);
await p.evaluate(()=>{var b=[...document.querySelectorAll('[onclick]')].find(x=>/nmLwOpen/.test(x.getAttribute('onclick')||'')&&/軽対戦車/.test(x.textContent));b.click();});await p.waitForTimeout(800);
await p.evaluate(()=>{var b=[...document.querySelectorAll('#nmNu button')].find(x=>/NM_NU.lw=/.test(x.getAttribute('onclick')||''));b.click();});await p.waitForTimeout(500);
await p.screenshot({path:'/tmp/sm/lwlite-1.png'});
const st=await p.evaluate(()=>{var lw=NM_NU.lw,nat=NM_NU.lwNat;var b=[...document.querySelectorAll('#nmNu button')].find(x=>{var o=x.getAttribute('onclick')||'';return /NM_NU.sel=\d/.test(o)&&o.indexOf("'"+nat+"'")>=0;});b.click();return 'lw='+lw+' nat='+nat+' banner='+((document.getElementById('nmPickBn')||{}).textContent||'')+' pre='+NM_LW_PRE;});
console.log(st);await p.waitForTimeout(600);await p.screenshot({path:'/tmp/sm/lwlite-2.png'});
const q=await p.evaluate(()=>{var N=BTG.nodes,c=-1,bd=1e9;N.forEach((z,i)=>{var q=nmClientOfNode(i);if(!q)return;var d=Math.hypot(q.x-500,q.y-330);if(d<bd){bd=d;c=i;}});return nmClientOfNode(c);});
await p.mouse.click(q.x,q.y);await p.waitForTimeout(1500);
console.log(await p.evaluate(()=>'NM_LW wid='+(NM_LW&&NM_LW.wid)+' sub='+NM_RM_SUB+' :: '+((document.getElementById('btRm')||{}).innerText||'').replace(/\s+/g,' ').slice(0,200)));
await p.screenshot({path:'/tmp/sm/lwlite-3.png'});console.log(JSON.stringify(e));await b.close();})();
