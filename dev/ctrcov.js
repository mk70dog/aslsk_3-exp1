// 全シナリオのユニット(歩兵・指揮官・SW・クラス低下/損耗・車両・砲・軽対戦車兵器)で実カウンター画像が無いものを数える
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);
const scs=await p.evaluate(()=>{var o=[];try{(SCEN_LIST||[]).forEach(s=>o.push(s.id));}catch(e){}if(!o.length){try{o=Object.keys(SCENS);}catch(e){}}return o;});
const ids=scs.length?scs:Array.from({length:80},(_,i)=>'S'+(i+1));const miss={};
for(const sc of ids){const r=await p.evaluate(sc=>{S.scen=S.scen||{};S.scen.sel=sc;var out=[];var ok=id=>id&&VASL_CTR_MAP[id]&&VASL_CTR_IMG[VASL_CTR_MAP[id]];var ns=[];try{ns=nmSuNats();}catch(e){}
 ns.forEach(nat=>{try{nmCcScOb(nat).forEach(x=>{if(!ok('u:'+nat+'|'+x.label))out.push(nat+' '+x.label+(x.tag?'('+x.tag+')':''));});}catch(e){}
  try{nmSuOb(nat).forEach(x=>{if(x.kind==='sw'&&!ok('u:SW|'+x.id))out.push(nat+' SW '+x.label);});}catch(e){}
  try{nmIjVehs(nat).forEach(v=>{if(!ok(v.id))out.push(nat+' '+v.kind+' '+v.nm+' ('+v.id+')');});}catch(e){}
  try{nmLwNatList(nat).forEach(w=>{if(!ok(w.id))out.push(nat+' LATW '+w.lbl);});}catch(e){}});return ns.length?out:null;},sc);
 if(r)r.forEach(x=>{(miss[x]=miss[x]||[]).push(sc);});}
console.log('scen',ids.length);Object.keys(miss).sort().forEach(k=>console.log(k+'  ['+miss[k].slice(0,6).join(',')+(miss[k].length>6?'…':'')+']'));await b.close();})();
