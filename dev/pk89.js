// カウンター選択(pkG)を7列にした4案のサンプル画像
const {chromium}=require('playwright');
const P='html:root:root:root:root #nmIj ';
const BASE=P+'.pkG{grid-template-columns:repeat(7,1fr)!important;}';
const BB=P+'.pkG{gap:7px!important}'+P+'.pkC{position:relative!important;padding:10px 2px 8px!important;gap:4px!important}'+P+'.pkC>small:not([style]){position:absolute!important;top:4px!important;right:6px!important;background:#222a36!important;color:#c9d6e4!important;border-radius:9px!important;padding:0 6px!important;font-size:11px!important;font-weight:800!important}'+P+'.pkS b{font-size:22px!important;min-width:26px!important;color:#8fa6bd!important}'+P+'.pkC.on .pkS b{color:#ffd34a!important}'+P+'.pkC.on{background:#1b2a3a!important;box-shadow:0 0 0 2px #4fd8ff inset,0 0 10px #4fd8ff55!important}'+P+'.pkS button{width:32px!important;height:36px!important}';
const V={B8:P+'.pkG{grid-template-columns:repeat(8,1fr)!important}'+BB+P+'.pkG{grid-template-columns:repeat(8,1fr)!important}'+P+'.pkS button{width:28px!important;height:34px!important}'+P+'.pkS b{font-size:20px!important;min-width:22px!important}',
 B9:P+'.pkG{grid-template-columns:repeat(9,1fr)!important}'+BB+P+'.pkG{grid-template-columns:repeat(9,1fr)!important;gap:5px!important}'+P+'.pkS{gap:3px!important}'+P+'.pkS button{width:25px!important;height:32px!important;font-size:15px!important}'+P+'.pkS b{font-size:18px!important;min-width:18px!important}'+P+'.pkC>small:not([style]){font-size:10px!important;padding:0 4px!important}'};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1148,height:798},deviceScaleFactor:1.5});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
const r=await p.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await W(1500);}await btEnsureGraph();var N=BTG.nodes,id=nm=>N.findIndex(n=>n.nm===nm);var o=[];
try{try{nmModeSet('judge');}catch(e){}await W(1500);var A=N[id('tT9')],B=N[id('tO10')];S_LOS.pxA={x:A.x,y:A.y};S_LOS.pxB={x:B.x,y:B.y};LosRunPixel();await W(4000);nmIjOpen();await W(1500);var best=null,bn=0;nmSuNats().forEach(function(k){var l=(nmSuOb(k)||[]).filter(function(x){return x.kind!=='afv'&&x.kind!=='gun'&&x.kind!=='veh';}).length;if(l>bn){bn=l;best=k;}});o.push('nat '+best+' '+bn);nmIjSet('nat',best);NM_IJ.cp=1;nmIjDraw();await W(1500);
NM_IJ.cs={'mmc|x':0};var c=document.querySelectorAll('#nmIj .pkC');o.push('cells '+c.length);}catch(e){o.push(String(e));}return o;});
console.log(JSON.stringify(r),JSON.stringify(E));
for(const k of Object.keys(V)){await p.evaluate((css)=>{var s=document.getElementById('pkv');if(!s){s=document.createElement('style');s.id='pkv';document.head.appendChild(s);}s.textContent=css;},V[k]);
 /* 2つ選択済みの見た目も見せる */
 await p.evaluate(()=>{var c=document.querySelectorAll('#nmIj .pkC');[0,2].forEach(function(i,j){if(c[i]){c[i].classList.add('on');var b=c[i].querySelector('.pkS b');if(b)b.textContent=j?'1':'3';}});});
 await p.waitForTimeout(400);await p.screenshot({path:process.argv[2]+'/sample-pk89-'+k+'.png'});}
await b.close();})();
