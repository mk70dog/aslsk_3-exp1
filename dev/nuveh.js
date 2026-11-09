// ライト版: 車両も選ぶとすぐ地図(仮に置くヘクスのタップ)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S25';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
await p.evaluate(async()=>{await btEnsureGraph();S_LOS.friendHexes=[];S_LOS.enemyHexes=[];Draw();});
for(const fn of ['nmHqAfvOpen','nmHqGunOpen']){const r=await p.evaluate(fn=>{nmHqAtA(fn);var nu=document.getElementById('nmNu');var btns=nu?[...nu.querySelectorAll('button')].map(x=>x.textContent.trim()):[];var b=nu&&[...nu.querySelectorAll('button')].find(x=>/NM_NU.sel=0/.test(x.getAttribute('onclick')||''));if(b)b.click();var r=fn+' btns=['+btns.join('|')+'] after: nu='+!!document.getElementById('nmNu')+' banner='+((document.getElementById('nmPickBn')||{}).textContent||'');try{nmNuPlEnd(0);}catch(x){}return r;},fn);console.log(r);}
console.log(JSON.stringify(e));await b.close();})();
