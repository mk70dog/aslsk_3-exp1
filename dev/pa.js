const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820},deviceScaleFactor:2});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
const r=await p.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await W(1500);}await btEnsureGraph();var o=[];
try{nmPaOpen();await W(1200);nmPaNat(nmSuNats()[1]);await W(500);nmPaAdd(1);await W(300);nmPaAdd(4);await W(600);nmPaDo(1,5);await W(800);var bx=document.querySelector('#btRm .rmBox');o.push(bx?bx.scrollHeight+' '+bx.clientHeight:'no');}catch(e){o.push(String(e));}return o;});
await p.screenshot({path:process.argv[2]});console.log(E,r);await b.close();})();
