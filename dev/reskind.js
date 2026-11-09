const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657}});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);
console.log(await p.evaluate(()=>['PSK (88mm)→vY10 シャーマンIII TH#4 DR5+1=6 ミス','PSK→vY10 TH#4 DR3=3 命中','主砲 TH#10 DR6 命中','LMG → No Effect'].map(t=>nmResKind(t)).join(',')));
console.log(await p.evaluate(()=>{nmResImgShow({t:'PSK (88mm)→vY10 シャーマンIII TH#4 DR5+1=6 ミス',nat:'GER'});var o=document.getElementById('nmResImg');return o?o.innerText.replace(/\s+/g,' ')+' | '+[...o.querySelectorAll('*')].map(x=>getComputedStyle(x).color).filter(c=>/\(\d+, ?(1\d\d|2\d\d), ?\d+\)/.test(c)).slice(0,3).join(';'):'none';}));
console.log(JSON.stringify(e));await b.close();})();
