const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
const r=await p.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await W(1500);}await btEnsureGraph();var N=BTG.nodes,from=N.findIndex(n=>n.nm==='tK6'),o={};
var t=performance.now();for(var i=0;i<5;i++)Draw();o.draw=(performance.now()-t)/5;
var cnt=0;N.forEach(function(M,x){if(M&&x!==from&&btDist(from,x)<=24)cnt++;});o.cnt24=cnt;
var A=N[from],t2=performance.now(),k=0;N.forEach(function(M,x){if(!M||x===from||btDist(from,x)>12||k>=60)return;k++;try{losCheckLOSGlobal(A.x,A.y,M.x,M.y,S_LOS.orchardSeason,S_LOS.grainSeason);}catch(e){}});o.los60=(performance.now()-t2);o.k=k;
NM_PICK={kind:'vfh',n:from,list:[],hexMode:1};var dc=0,od=Draw;Draw=function(){dc++;return od.apply(this,arguments);};var t3=performance.now();nmLosHexAsync(NM_PICK,from,14,function(){return true;});while(NM_PICK.busy){await W(20);}o.total=performance.now()-t3;o.draws=dc;o.list=NM_PICK.list.length;Draw=od;return o;});
console.log(E,JSON.stringify(r));await b.close();})();
