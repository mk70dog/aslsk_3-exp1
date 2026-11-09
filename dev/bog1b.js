const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820},deviceScaleFactor:2});const E=[];p.on('pageerror',x=>E.push(String(x)));p.on('console',m=>{if(/bog1/.test(m.text()))E.push(m.text());});
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
const r=await p.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await W(1500);}await btEnsureGraph();var o=[];
try{nmScOpen('nmHqBogOpen');await W(1500);o.push('1 '+(NM_BOG1&&NM_BOG1.nat)+' '+!!document.querySelector('#btRm'));var ns=nmSuNats();var other=ns.filter(k=>k!==NM_BOG1.nat&&nmIjVehs(k).some(x=>x.kind==='veh'))[0];if(other){nmBog1Open(other);await W(1200);o.push('2 '+NM_BOG1.nat+' '+NM_BOG1.vid);}
var n=[S_LOS.friendHexes,S_LOS.enemyHexes].map(L=>(L||[]).filter(e=>e.ccTmp).length);o.push('tmp '+n);}catch(e){o.push(String(e));}return o;});
await p.waitForTimeout(500);await p.screenshot({path:process.argv[2]});console.log(E,r);await b.close();})();
