// サンプル: MC・PTC パネルのダイスボタン(2〜12)の横幅を増やす3案。引数=出力名(例 /tmp/sample-dicew)
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(2000);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';S.nmMode='judge';S.nmScReg={};await btEnsureGraph();try{Draw();}catch(x){}await new Promise(r=>setTimeout(r,800));S.turn=S.turn||{};S.turn.phase='pfph';});
await p.waitForTimeout(6000);const P=process.argv[2]||'/tmp/sample-dicew';
await p.evaluate(()=>{nmHqOpen();var x=[...document.querySelectorAll('#nmHq button')].filter(x=>/MC|士気/.test(x.textContent))[0];x.click();});await p.waitForTimeout(600);
await p.evaluate(()=>{for(var i=0;i<2;i++){var b=[...document.querySelectorAll('#nmCcSc .nmScRegBox button')].filter(x=>/nmScRegQ/.test(x.getAttribute('onclick'))&&/＋/.test(x.textContent))[0];b.click();}});
await p.evaluate(()=>nmScGo());await p.waitForTimeout(1200);
await p.evaluate(()=>{var q=t=>[...document.querySelectorAll('#btRm button')].filter(x=>x.textContent.trim()===t)[0];var a=q('2MC');if(a)a.click();});await p.waitForTimeout(500);
await p.evaluate(()=>{var q=[...document.querySelectorAll('#btRm button')].filter(x=>/\(2\)/.test(x.textContent))[0];if(q)q.click();});await p.waitForTimeout(600);
await p.evaluate(()=>{document.querySelectorAll('.toast,#btToast').forEach(x=>x.style.display='none');var r=document.getElementById('btRm');if(r){r.style.maxHeight='94vh';r.style.height='94vh';}});await p.waitForTimeout(400);
const Q='html:root:root:root:root #btRm.rmFull .rmBox ';
const css={
 A:Q+'.rmIt:has(.dsRow){flex-wrap:wrap!important}'+Q+'.rmIt .dsRow.dsLb,'+Q+'.rmIt:has(.dsRow) .dsRow{flex:1 1 100%!important;width:100%!important;max-width:100%!important;margin:4px 0 0 0!important}'+Q+'.dsRow>button.dsb.dsb:not(.zz){height:46px!important;font-size:18px!important}',
 B:Q+'.rmIt:has(.dsRow){flex-wrap:wrap!important}'+Q+'.rmIt .dsRow.dsLb,'+Q+'.rmIt:has(.dsRow) .dsRow{flex:1 1 100%!important;width:100%!important;max-width:100%!important;margin:4px 0 0 0!important;flex-wrap:wrap!important}'+Q+'.dsRow>button.dsb.dsb:not(.zz){flex:1 1 15%!important;min-width:60px!important;height:50px!important;font-size:20px!important;border-bottom:1px solid #232a36!important}',
 C:Q+'.rmIt:has(.dsRow){flex-wrap:wrap!important}'+Q+'.rmIt .dsRow.dsLb,'+Q+'.rmIt:has(.dsRow) .dsRow{flex:1 1 100%!important;width:100%!important;max-width:100%!important;margin:4px 0 0 0!important;gap:4px!important;border:0!important;background:none!important;overflow:visible!important}'+Q+'.dsRow>button.dsb.dsb:not(.zz){height:54px!important;font-size:22px!important;border:1px solid #2c3440!important;border-radius:8px!important;background:#151a22!important}'+Q+'.dsRow>button.dsb.dsb.on:not(.zz),'+Q+'.dsRow>button.dsb.dsb.dsOn:not(.zz){background:linear-gradient(#f2c244,#c8941c)!important}'
};
await p.screenshot({path:P+'_0.png'});
for(const k of Object.keys(css)){await p.evaluate((c)=>{var o=document.getElementById('sampDw');if(o)o.remove();var s=document.createElement('style');s.id='sampDw';s.textContent=c;document.head.appendChild(s);},css[k]);await p.waitForTimeout(400);
 console.log(k,await p.evaluate(()=>{var r=document.querySelector('#btRm .dsRow');if(!r)return 'no dsRow';var q=r.getBoundingClientRect(),f=r.children[0].getBoundingClientRect();return Math.round(q.width)+'px row, btn '+Math.round(f.width)+'x'+Math.round(f.height);}));
 await p.screenshot({path:P+'_'+k+'.png'});}
console.log(JSON.stringify(e));await b.close();})();
