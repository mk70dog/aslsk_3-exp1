// カウンター選択(pkG)を7列にした4案のサンプル画像
const {chromium}=require('playwright');
const P='html:root:root:root:root #nmIj ';
const BASE=P+'.pkG{grid-template-columns:repeat(7,1fr)!important;}';
const V={
A:BASE+P+'.pkG{gap:6px!important}'+P+'.pkC{padding:6px 2px!important;gap:2px!important}'+P+'.pkS button{width:30px!important;height:30px!important;font-size:16px!important}'+P+'.pkC small{font-size:11px!important}',
B:BASE+P+'.pkG{gap:7px!important}'+P+'.pkC{position:relative!important;padding:10px 2px 8px!important;gap:4px!important}'+P+'.pkC>small:not([style]){position:absolute!important;top:4px!important;right:6px!important;background:#222a36!important;color:#c9d6e4!important;border-radius:9px!important;padding:0 6px!important;font-size:11px!important;font-weight:800!important}'+P+'.pkS b{font-size:22px!important;min-width:26px!important;color:#8fa6bd!important}'+P+'.pkC.on .pkS b{color:#ffd34a!important}'+P+'.pkC.on{background:#1b2a3a!important;box-shadow:0 0 0 2px #4fd8ff inset,0 0 10px #4fd8ff55!important}'+P+'.pkS button{width:32px!important;height:36px!important}',
C:BASE+P+'.pkG{gap:4px 2px!important}'+P+'.pkC{border:0!important;background:none!important;padding:4px 0!important;gap:1px!important}'+P+'.pkC.on{box-shadow:none!important;background:none!important}'+P+'.pkC.on::after{content:"";height:4px;width:70%;border-radius:2px;background:#4fd8ff}'+P+'.pkC>small{display:none!important}'+P+'.pkS{background:#10151c!important;border:1px solid #2c3440!important;border-radius:16px!important;padding:2px!important;gap:2px!important}'+P+'.pkS button{border:0!important;background:none!important;width:30px!important;height:28px!important}'+P+'.pkC.on .pkS{border-color:#4fd8ff!important}'+P+'.pkC.on .pkS b{color:#ffd34a!important}',
D:BASE+P+'.pkG{gap:8px!important}'+P+'.pkC{padding:8px 0 0!important;gap:3px!important;overflow:hidden!important}'+P+'.pkC.on{box-shadow:0 0 0 2px #4fd8ff inset!important}'+P+'.pkS{width:100%!important;gap:0!important;margin-top:4px!important;border-top:1px solid #2c3440!important}'+P+'.pkS button{flex:1 1 0!important;width:auto!important;height:42px!important;border:0!important;border-radius:0!important;background:#0d1117!important;font-size:22px!important}'+P+'.pkS b{flex:0 0 36px!important;font-size:20px!important}'+P+'.pkC.on .pkS b{color:#ffd34a!important}'+P+'.pkC small{font-size:12px!important}'
};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1148,height:798},deviceScaleFactor:1.5});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
const r=await p.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await W(1500);}await btEnsureGraph();var N=BTG.nodes,id=nm=>N.findIndex(n=>n.nm===nm);var o=[];
try{try{nmModeSet('judge');}catch(e){}await W(1500);var A=N[id('tT9')],B=N[id('tO10')];S_LOS.pxA={x:A.x,y:A.y};S_LOS.pxB={x:B.x,y:B.y};LosRunPixel();await W(4000);nmIjOpen();await W(1500);var best=null,bn=0;nmSuNats().forEach(function(k){var l=(nmSuOb(k)||[]).filter(function(x){return x.kind!=='afv'&&x.kind!=='gun'&&x.kind!=='veh';}).length;if(l>bn){bn=l;best=k;}});o.push('nat '+best+' '+bn);nmIjSet('nat',best);NM_IJ.cp=1;nmIjDraw();await W(1500);
NM_IJ.cs={'mmc|x':0};var c=document.querySelectorAll('#nmIj .pkC');o.push('cells '+c.length);}catch(e){o.push(String(e));}return o;});
console.log(JSON.stringify(r),JSON.stringify(E));
for(const k of Object.keys(V)){await p.evaluate((css)=>{var s=document.getElementById('pkv');if(!s){s=document.createElement('style');s.id='pkv';document.head.appendChild(s);}s.textContent=css;},V[k]);
 /* 2つ選択済みの見た目も見せる */
 await p.evaluate(()=>{var c=document.querySelectorAll('#nmIj .pkC');[0,2].forEach(function(i,j){if(c[i]){c[i].classList.add('on');var b=c[i].querySelector('.pkS b');if(b)b.textContent=j?'1':'3';}});});
 await p.waitForTimeout(400);await p.screenshot({path:process.argv[2]+'/sample-pk7-'+k+'.png'});}
await b.close();})();
