// サンプル: MC・PTC のユニットを実カウンターで。引数=出力名
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(2000);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';S.nmMode='judge';S.nmScReg={};await btEnsureGraph();try{Draw();}catch(x){}await new Promise(r=>setTimeout(r,800));S.turn=S.turn||{};S.turn.phase='pfph';});
await p.waitForTimeout(6000);const P=process.argv[2]||'/tmp/sample-mcctr';
await p.evaluate(()=>{nmHqOpen();var x=[...document.querySelectorAll('#nmHq button')].filter(x=>/MC|士気/.test(x.textContent))[0];x.click();});await p.waitForTimeout(600);
await p.evaluate(()=>{for(var i=0;i<2;i++){var b=[...document.querySelectorAll('#nmCcSc .nmScRegBox button')].filter(x=>/nmScRegQ/.test(x.getAttribute('onclick'))&&/＋/.test(x.textContent))[0];b.click();}});
await p.waitForTimeout(500);
// 画像1: シナリオのユニット選択(登録ユニットに実カウンター)
await p.evaluate(()=>{var nat='SOV';[...document.querySelectorAll('#nmCcSc *')].filter(x=>x.children.length===0&&/^\d-\d-\d\[[^\]]+\]\(HS\)\s*\(登録\)/.test((x.textContent||'').trim())).forEach(function(x){var m=/^(\d-\d-\d\[[^\]]+\]\(HS\))/.exec(x.textContent.trim());var id=nmCtrUid(nat,m[1]),c=id&&nmCtrChip(id,44);if(!c)return;var w=document.createElement('span');w.style.cssText='display:flex;align-items:center;gap:10px';w.innerHTML=c;x.parentNode.insertBefore(w,x);w.appendChild(x);});});
await p.waitForTimeout(500);await p.screenshot({path:P+'_1.png'});
await p.evaluate(()=>nmScGo());await p.waitForTimeout(1200);
await p.evaluate(()=>{var q=t=>[...document.querySelectorAll('#btRm button')].filter(x=>x.textContent.trim()===t)[0];var a=q('2MC');if(a)a.click();});await p.waitForTimeout(600);
// 画像2: ②チェックするユニットを実カウンターに
await p.evaluate(()=>{document.querySelectorAll('#btRm button').forEach(function(x){var m=/^✓?(\d-\d-\d\[[^\]]+\]\(HS\))/.exec(x.textContent.trim());if(!m)return;var id=nmCtrUid('SOV',m[1]);var c=id&&nmCtrChip(id,52);if(!c)return;x.innerHTML='<span style="display:flex;flex-direction:column;align-items:center;gap:3px">'+c+'<span style="font-size:12px">'+m[1]+'</span></span>';x.style.height='auto';x.style.padding='6px 12px';});});
await p.waitForTimeout(500);await p.screenshot({path:P+'_2.png'});console.log(JSON.stringify(e));await b.close();})();
