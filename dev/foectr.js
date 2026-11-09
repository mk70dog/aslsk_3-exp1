// sample: 主砲の「シナリオの相手から選ぶ」を実カウンター
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S25';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
await p.evaluate(async()=>{await btEnsureGraph();S_LOS.friendHexes=[];S_LOS.enemyHexes=[];Draw();nmHqAtA('nmHqGunOpen');});await p.waitForTimeout(600);
await p.evaluate(()=>{var b=[...document.querySelectorAll('#nmNu button')].find(x=>/NM_NU.sel=0/.test(x.getAttribute('onclick')||''));b.click();});await p.waitForTimeout(500);
const q=await p.evaluate(()=>{var c=-1,bd=1e9;BTG.nodes.forEach(function(N,i){var q=nmClientOfNode(i);if(!q)return;var d=Math.hypot(q.x-450,q.y-400);if(d<bd){bd=d;c=i;}});return nmClientOfNode(c);});
await p.mouse.click(q.x,q.y);await p.waitForTimeout(1500);
await p.evaluate(()=>{var b=[...document.querySelectorAll('#btRm [onclick]')].find(x=>/nmVfOpen/.test(x.getAttribute('onclick')||''));if(b)b.click();});await p.waitForTimeout(1000);
await p.screenshot({path:'/tmp/sm/foectr.png'});console.log(await p.evaluate(()=>(document.getElementById('btRm')||{}).innerText.replace(/\s+/g,' ').slice(0,300)));console.log(JSON.stringify(e));await b.close();})();
