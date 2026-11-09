// sample: 白兵戦(シナリオのユニット)にクラス低下・損耗ユニット / 組のボタンを実カウンター
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S24';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
await p.evaluate(async()=>{await btEnsureGraph();nmCcScOpen();});await p.waitForTimeout(800);
console.log(await p.evaluate(()=>{var C=NM_CCS;return 'an='+C.an+' a='+nmCcScOb(C.an).map(x=>x.label+(x.tag?'('+x.tag+')':'')).join(',');}));
await p.evaluate(()=>{var b=document.querySelector('#nmCcSc .ccBox');b.scrollTop=200;});await p.waitForTimeout(400);await p.screenshot({path:'/tmp/sm/ccctr-1.png'});
await p.evaluate(()=>{var C=NM_CCS;var A=nmCcScOb(C.an),D=nmCcScOb(C.dn);var ax=A.find(x=>x.tag),a2=A.find(x=>x.kind==='mmc'&&!x.tag);nmCcScCnt('a',ax.kind+'|'+ax.id,1);nmCcScCnt('a',a2.kind+'|'+a2.id,1);var dx=D.find(x=>x.kind==='mmc');nmCcScCnt('d',dx.kind+'|'+dx.id,1);var L=D.find(x=>x.kind==='smc');if(L)nmCcScCnt('d',L.kind+'|'+L.id,1);nmCcScGo();});await p.waitForTimeout(1500);
console.log(await p.evaluate(()=>{var el=document.querySelector('#nmIj')||document.getElementById('btRm');var imgs=el?el.querySelectorAll('button img,button svg image').length:0;return 'panel='+(el&&el.id)+' btnImgs='+imgs;}));
await p.evaluate(()=>{var b=[...document.querySelectorAll('button')].find(x=>/攻撃する組|かんたん/.test(x.textContent)&&/かんたん/.test(x.textContent));var t=[...document.querySelectorAll('*')].find(x=>x.children.length<3&&/攻撃する組/.test(x.textContent));if(t)t.scrollIntoView({block:'center'});});await p.waitForTimeout(500);
await p.screenshot({path:'/tmp/sm/ccctr-2.png'});console.log(JSON.stringify(e));await b.close();})();
