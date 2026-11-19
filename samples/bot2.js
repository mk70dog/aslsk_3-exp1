const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1133,height:744}});
await p.goto('file:///home/claude/aslsk_3-exp1/index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1500);
await p.evaluate(async()=>{nmFzSet('l');SSEL('S27');NAVTAB('los');await new Promise(r=>setTimeout(r,2500));});
const X='html'+':root'.repeat(60)+' #nmFtBot ';
const V={
 now:'',
 A:X+'.ssrG{font-size:10px!important;row-gap:1px!important;line-height:1.15!important}'+X+'.ssrG>div>span:first-child{min-width:13px!important;height:13px!important;font-size:8.5px!important}'+X+'.ssrG b{font-size:10px!important}'+X+'.botVicS .t1{font-size:12px!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}'+X+'.botVicS>div:first-child>span{height:15px!important;font-size:9.5px!important}',
 B:X+'.ssrG{grid-template-columns:1fr 1fr 1fr!important;font-size:10px!important;row-gap:3px!important;column-gap:8px!important}'+X+'.ssrG>div>span:first-child{min-width:14px!important;height:14px!important;font-size:9px!important}'+X+'.ssrG b{font-size:10px!important}'+X+'.botVicS .t1{font-size:12px!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}',
 C:X+'.ssrG{font-size:9px!important;row-gap:0!important;line-height:1.1!important}'+X+'.ssrG>div>span:first-child{min-width:12px!important;height:12px!important;font-size:8px!important}'+X+'.ssrG b{font-size:9px!important}'+X+'.botVicS .t1{font-size:11px!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}'+X+'.botVicS>div:first-child>span{height:14px!important;font-size:9px!important}'};
for(const k of Object.keys(V)){await p.evaluate((c)=>{var s=document.getElementById('smpBot');if(!s){s=document.createElement('style');s.id='smpBot';document.head.appendChild(s);}s.textContent=c;},V[k]);await p.waitForTimeout(300);
await p.screenshot({path:'bot_'+k+'.png',clip:{x:0,y:684,width:860,height:60}});}
await b.close();})();
