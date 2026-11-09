// v955 全パネルのドラッグ移動(translate)テスト
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820},deviceScaleFactor:2});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<3;i++){try{Draw();}catch(e){}await new Promise(r=>setTimeout(r,1500));}await btEnsureGraph();});
const tests=[['nmHqOpen','()=>nmHqOpen()'],['nmCcScOpen','()=>nmCcScOpen()'],['nmPaOpen','()=>nmPaOpen()'],['nmSuOpen?','()=>{if(typeof nmSuOpen==="function")nmSuOpen();}'],['nmIjOpen?','()=>{if(typeof nmIjOpen==="function")nmIjOpen();}']];
for(const [nm,fn] of tests){
 await p.evaluate(eval(fn));await p.waitForTimeout(800);
 const r=await p.evaluate(()=>{ // 画面中央付近の要素で、パネルになりそうな点を探す
  var out=[];for(var y=120;y<720;y+=40){for(var x=200;x<1000;x+=60){var t=document.elementFromPoint(x,y);var P=nmGdPanel(t);if(P){out.push({x:x,y:y,id:P.el.id||P.el.className,scroll:P.scroll,top:Math.round(P.top)});break;}}if(out.length)break;}return out[0]||null;});
 console.log(nm,JSON.stringify(r));
 if(r){await p.mouse.move(r.x,r.y);await p.mouse.down();await p.mouse.move(r.x+90,r.y+50,{steps:4});await p.mouse.up();await p.waitForTimeout(200);
  console.log('  moved',await p.evaluate((r)=>{var t=document.elementFromPoint(r.x+90,r.y+50);var P=nmGdPanel(t);return P?P.el.style.translate:'(panel not under pointer)';},r));}
 await p.evaluate(()=>{['nmHq','nmCcSc','nmPa','nmSu','nmIj'].forEach(i=>{var e=document.getElementById(i);if(e)e.remove();});try{NM_CCS=null;NM_PA=null;}catch(e){}});
}
console.log(E);await b.close();})();
