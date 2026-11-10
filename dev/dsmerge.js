// dsUni の2〜7/8〜12 結合: 複数ユニットでも自分の行とだけ結合する
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1148,height:798}});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);
const r=await p.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));var rm=document.getElementById('btRm')||document.createElement('div');rm.id='btRm';if(!rm.parentNode)document.body.appendChild(rm);
var h='';for(var u=0;u<4;u++){h+='<div class="rmIt"><div class="x">'+[2,3,4,5,6,7].map(v=>'<button>'+v+'</button>').join('')+'</div></div><div class="rmIt"><div class="x">'+[8,9,10,11,12].map(v=>'<button>'+v+'</button>').join('')+'</div></div>';}
rm.innerHTML=h;await W(800);return [].map.call(rm.querySelectorAll('.dsRow'),x=>[].map.call(x.children,c=>c.textContent).join(',')).join(' | ');});
console.log(r,JSON.stringify(E));await b.close();})();
