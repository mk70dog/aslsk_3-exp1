// spot panel vs other panel button look under theme
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);const th=process.argv[2]||'4a';
await p.evaluate(th=>{S.scen=S.scen||{};S.scen.sel='S24';S.nmMode='judge';NAVTAB('los');uiThemeSet(th);},th);await p.waitForTimeout(3000);
await p.evaluate(async()=>{await btEnsureGraph();var N=BTG.nodes;S_LOS.pxA={x:N[100].x,y:N[100].y};S_LOS.pxB={x:N[104].x,y:N[104].y};try{LosRunPixel();}catch(x){}nmIjOpen();await new Promise(r=>setTimeout(r,600));});
await p.evaluate(()=>{NM_IJ.nat='SOV';NM_IJ.ea=1;nmIjDraw();});await p.waitForTimeout(400);await p.screenshot({path:'/tmp/sm/ijsty-'+th+'.png'});
await p.evaluate(()=>{nmIjClose();nmHqOpen();});await p.waitForTimeout(500);await p.screenshot({path:'/tmp/sm/hqsty-'+th+'.png'});
await p.evaluate(()=>{try{nmHqClose();}catch(e){}nmMcpOpen&&0;var b=BTG.nodes;nmMh2Open();});await p.waitForTimeout(500);await p.screenshot({path:'/tmp/sm/mh2sty-'+th+'.png'});
console.log(JSON.stringify(e));await b.close();})();
