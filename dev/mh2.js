// 人力移動: SWの迫撃砲は一覧に出さない・運ぶユニットが増えると見込みが上がる
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S25';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);const P=process.argv[2]||'mh2';
console.log(await p.evaluate(()=>{nmMh2Open();var M=NM_MH2;M.nat='SOV';nmMh2Draw();var gl=[...document.querySelectorAll('#nmMh2 button')].map(x=>x.textContent.trim()).filter(t=>/M#/.test(t));
 var ob=nmSuOb('SOV');var crew=ob.find(x=>/乗員/.test(x.label)),sq=ob.find(x=>x.kind==='mmc'&&!/乗員|HS/.test(x.label));M.g=nmIjVehs('SOV').find(o=>o.kind==='gun'&&nmMhCan(o.id)).id;M.ter='wbld';var out=[];
 [0,1,2,3].forEach(function(k){M.cs={};M.cs['mmc|'+crew.id]=1;if(k)M.cs['mmc|'+sq.id]=k;var C=nmMh2Calc();out.push(k+'squads drm='+C.drm);});nmMh2Draw();return 'guns='+gl.join('/')+' | '+out.join(' ');}));
await p.evaluate(()=>{var b=document.querySelector('#nmMh2 .mh2Box,#nmMh2 > div');if(b)b.scrollTop=9999;[...document.querySelectorAll('#nmMh2 *')].forEach(x=>{if(x.scrollHeight>x.clientHeight+20)x.scrollTop=9999;});});await p.screenshot({path:P+'.png'});
console.log(JSON.stringify(e));await b.close();})();
