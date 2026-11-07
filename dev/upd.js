const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');let swOverride=null;
const srv=http.createServer((q,r)=>{let u=q.url.split('?')[0];if(u==='/')u='/index.html';if(u==='/sw.js'&&swOverride){r.writeHead(200,{'content-type':'text/javascript'});r.end(swOverride);return;}
 const f=path.join(root,u);fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);r.end();return;}r.writeHead(200,{'content-type':u.endsWith('.html')?'text/html':u.endsWith('.js')?'text/javascript':'application/octet-stream'});r.end(d);});}).listen(8765);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1000,height:657},serviceWorkers:'block'});const p=await ctx.newPage();const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('http://localhost:8765/index.html',{timeout:180000});await p.waitForTimeout(6000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(6000);
const P=process.argv[2];
await p.evaluate(()=>appForceUpdate());await p.waitForTimeout(1500);
console.log('same:',await p.evaluate(()=>{var t=document.getElementById('toastMsg');return t?t.innerText:'';}),await p.evaluate(()=>location.search));
await p.screenshot({path:P+'_same.png'});
swOverride="var APP_VERSION='ASLSK3M-v12.099';";
let nav=false;p.on('framenavigated',()=>{nav=true;});
await p.evaluate(()=>appForceUpdate());await p.waitForTimeout(600);
console.log('newer toast:',await p.evaluate(()=>{var t=document.getElementById('toastMsg');return t?t.innerText:'';}).catch(()=>'(navigated)'));
await p.waitForTimeout(4000);console.log('navigated:',nav,p.url());
console.log(JSON.stringify(e));await b.close();srv.close();})();
