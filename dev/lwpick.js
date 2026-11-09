// v971: 判定ボードのタイル名と、軽対戦車兵器の撃てるヘクス表示(案D)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S26';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
await p.evaluate(async()=>{await btEnsureGraph();nmHqOpen();});await p.waitForTimeout(800);
console.log('tile',await p.evaluate(()=>[...document.querySelectorAll('button,div')].filter(x=>/軽対戦車/.test(x.textContent)&&x.children.length<4).map(x=>x.textContent.trim()).slice(0,3).join(' | ')));
await p.screenshot({path:'/tmp/sm/lw-board.png'});
await p.evaluate(()=>{try{nmHqClose();}catch(x){}});
const r=await p.evaluate(async()=>{var N=BTG.nodes;var w=LATW_DATA.filter(x=>x.rng>=3)[0];var n=N.findIndex(z=>z.nm==='tX5');NM_LW={n:n,sd:'f',wid:w.id};nmLwPick(n,null);await new Promise(r=>setTimeout(r,200));for(var i=0;i<200&&NM_PICK&&NM_PICK.busy;i++)await new Promise(r=>setTimeout(r,200));Draw();
 return 'kind='+(NM_PICK&&NM_PICK.kind)+' list='+(NM_PICK&&NM_PICK.list.length)+' dark='+[...document.querySelectorAll('svg polygon')].filter(x=>x.getAttribute('fill')==='#0b0d12').length+' lime='+[...document.querySelectorAll('svg polygon')].filter(x=>x.getAttribute('stroke')==='#c8ff3c').length;});
console.log(r);await p.waitForTimeout(500);await p.screenshot({path:'/tmp/sm/lw-pick.png'});console.log(JSON.stringify(e));await b.close();})();
