// v951 PAATC で損耗(HS)・クラス低下のユニットを選べる
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<3;i++){try{Draw();}catch(e){}await new Promise(r=>setTimeout(r,1500));}await btEnsureGraph();nmPaOpen();});await p.waitForTimeout(1200);
const r=await p.evaluate(()=>{var o={};o.nat=NM_PA.nat;o.mm=nmPaMmc().map(u=>u.label+(u.red?'('+u.red+')':'')).join(' / ');var i=nmPaMmc().findIndex(u=>u.red);if(i>=0){nmPaAdd(i);var x=NM_PA.list[NM_PA.list.length-1];o.added=x.label+' mor='+nmPaDrm(x).mor;}return o;});
console.log(JSON.stringify(r,null,1));await p.waitForTimeout(600);await p.screenshot({path:'/tmp/sm/pared.png'});console.log(E);await b.close();})();
