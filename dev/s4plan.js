// S4 のサンプル: 米軍(アプリ)の初期配置と独軍の進入待ちを撮る。node dev/s4plan.js [出力png]
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const e=[];p.on('pageerror',x=>e.push(String(x).slice(0,300)));
await p.goto('file:///home/claude/aslsk_3-exp1/index.html',{timeout:180000});await p.waitForTimeout(4000);
await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S4';NAVTAB('scen');NAVTAB('los');try{LOS_PAGE();}catch(x){}});await p.waitForTimeout(3000);
const r=await p.evaluate(async()=>{BTG=null;await btEnsureGraph();var d=btNewState();for(var k in d)BT[k]=d[k];BT.on=true;BT.sc=btScId();btInitCtl();
 btSetupSides().forEach(function(sd){btAppSetupGen(sd);});
 var ob=btObItems().map(o=>o.side+':'+o.name+'×'+o.total+'/'+btGroupOf(o)+'/'+btI({nm:o.name},o.side).kind);
 var st=BT.stacks.filter(s=>s.side==='SOV').map(s=>BTG.nodes[s.n].nm+':'+s.u.map(u=>u.nm).join('/'));
 S_LOS.zoom=0.75;Draw();var P=BT.stacks.filter(s=>s.side==='SOV').map(s=>{var q=btCamPt(s.n);return q&&[Math.round(q.x),Math.round(q.y)];});return {ob:ob.length,st,setupSides:btSetupSides(),act:btActive(),P,svgN:document.querySelectorAll('#losSvg image, svg image').length};});
console.log(JSON.stringify(r,null,1));await p.waitForTimeout(1500);
await p.evaluate(()=>{[...document.querySelectorAll('div')].filter(d=>getComputedStyle(d).position==='fixed'&&/アプリの軍/.test(d.innerText)&&d.innerText.length<2000).forEach(d=>d.style.display='none');});
await p.waitForTimeout(500);await p.screenshot({path:process.argv[2]||'/tmp/t/s4a.png'});console.log('ERR',e);await b.close();})();
