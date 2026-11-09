const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(2500);
const r=await p.evaluate(async()=>{var W=ms=>new Promise(r=>setTimeout(r,ms)),o=[];var sp=document.querySelector('.appVerSp');if(!sp)return ['no badge'];var rc=sp.getBoundingClientRect(),x=rc.left+rc.width/2,y=rc.top+rc.height/2;
var fire=(t,el)=>el.dispatchEvent(new PointerEvent(t,{bubbles:true,clientX:x,clientY:y,pointerType:'touch'}));
fire('pointerdown',sp);await W(50);fire('pointerup',sp);await W(200);o.push('tap1 open='+!!document.getElementById('appVerPop'));
fire('pointerdown',sp);await W(50);fire('pointerup',sp);await W(200);o.push('tap2 open='+!!document.getElementById('appVerPop'));
fire('pointerdown',sp);await W(50);fire('pointerup',sp);await W(200);o.push('tap3 open='+!!document.getElementById('appVerPop'));return o;});console.log(E,r);await b.close();})();
