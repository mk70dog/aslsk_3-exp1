// LLTCは全員の士気チェック後に(v913)
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1500);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';await btEnsureGraph();});
const r=await p.evaluate(()=>{S.nmAutoOff=false;var slot=nmGeFreeSlot(),nat=nmSuNats()[0],ob=nmSuOb(nat);
 var ld=ob.filter(x=>x.kind==='smc').sort((a,b)=>0)[0];nmGeAddCore(slot,nat,'smc',ld.label);var m=ob.filter(x=>x.kind==='mmc')[0];nmGeAddCore(slot,nat,'mmc',m.label);nmGeAddCore(slot,nat,'mmc',m.label);
 var items=nmGeList(slot).items;var L=items[0];var te={grp:slot};
 NM_MC={key:'t',r:'MC',res:{}};var M=NM_MC;M.res[L.pid]={dr:12,fin:12,ok:false,txt:'混乱'};M.ll=[{k:'LLTC',rev:0,mor:99,lbl:L.label,pid:L.pid,done:{}}];
 var P=nmMcParse?1:0;
 function html(){var it=[];try{nmMcSection(it,0,te,'MC','t','nmMcpRe',{});}catch(x){return 'ERR '+x;}return JSON.stringify(it);}
 var h1=html();var pend=/終わってから/.test(h1),hasLl=/全員のLLTC/.test(h1);
 items.slice(1).forEach(x=>{M.res[x.pid]={dr:5,fin:5,ok:true,txt:'合格'};});
 var h2=html();return {err:/^ERR/.test(h1)?h1:null,pend:pend,hasLlBefore:hasLl,hasLlAfter:/全員のLLTC/.test(h2),pendAfter:/終わってから/.test(h2)};});
console.log(JSON.stringify(r));console.log('errors',JSON.stringify(e));await b.close();})();
