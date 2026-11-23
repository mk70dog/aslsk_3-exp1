// 自己対戦: node sp.js S6 [maxMin] [seed]
const {chromium}=require('playwright');
const sc=process.argv[2]||'S6',maxMin=+(process.argv[3]||8),shot=process.argv[4]||'';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const e=[];p.on('pageerror',x=>e.push(String(x.stack||x).slice(0,600)));
p.on('console',m=>{const t=m.text();if(/Error|error|undefined/.test(t)&&!/favicon/.test(t))e.push('console:'+t.slice(0,200));});
await p.goto('file://'+(process.env.APP||'/tmp/w/idx_sp.html'),{timeout:180000});await p.waitForTimeout(4000);
await p.evaluate((sc)=>{S.scen=S.scen||{};S.scen.sel=sc;NAVTAB('scen');NAVTAB('los');try{LOS_PAGE();}catch(x){}},sc);await p.waitForTimeout(3000);
await p.evaluate((w)=>{if(w){var c=BT_SCFG[btScId()];c.aiw=Object.assign({},c.aiw||{},JSON.parse(w));}},process.env.AIW||'');
await p.evaluate((w)=>{if(w){var o=JSON.parse(w);for(var k in o)BT_AIW[k]=o[k];}},process.env.BAIW||'');
if(process.env.DBG)await p.evaluate(()=>{window.BT_DBG=[];});
// 監査(AUD=1): どちらの軍がどの行動を何回したかを数える(アプリのロジックは変えず、関数を包んで数えるだけ)
if(process.env.AUD)await p.evaluate(()=>{var A=window.BT_AUD={};function inc(k,side,n){var key=(side||'?')+'|'+k;A[key]=(A[key]||0)+(n==null?1:n);}
 function sid2side(id){var s=btStackById(id);return s&&s.side;}function mvSide(){return BT.mv&&BT.mv.side;}
 function wrap(nm,f){var o=window[nm];if(typeof o!=='function'){inc('関数なし:'+nm,'-');return;}window[nm]=function(){var a=arguments;var pre=f.pre?f.pre.apply(null,a):null;var r=o.apply(this,a);try{f.post(a,r,pre);}catch(e){}return r;};}
 wrap('btMoveStart',{post:function(a,r){if(r)return;var sd=sid2side(BT.mv&&BT.mv.sid);var op=a[2]||{};inc('歩兵の移動',sd);if(op.dt)inc('駆け足',sd);if(op.assault)inc('警戒移動',sd);}});
 wrap('btVMoveStart',{post:function(a,r){if(r)return;inc('車両の移動',sid2side(a[0]));}});
 wrap('btSmokeGrenade',{pre:mvSide,post:function(a,r,sd){if(typeof r!=='string')inc('発煙手榴弾',sd);else inc('発煙手榴弾(不可)',sd);}});
 wrap('btVehSmoke',{pre:mvSide,post:function(a,r,sd){inc('車両の発煙',sd);}});
 wrap('btDCPlace',{pre:mvSide,post:function(a,r,sd){if(typeof r!=='string')inc('DC設置'+(a[1]?'(車両へ)':''),sd);}});
 wrap('btAdvance',{pre:function(id){return sid2side(id);},post:function(a,r,sd){if(!r)inc('突撃(前進)',sd);}});
 wrap('btVExit',{pre:mvSide,post:function(a,r,sd){if(!r)inc('車両の退出',sd);}});
 wrap('btIExit',{pre:mvSide,post:function(a,r,sd){if(!r)inc('歩兵の盤外退出',sd);}});
 wrap('btUnbog',{post:function(a){inc('ボグ解消の試み',a[0]&&a[0].side);}});
 wrap('btLeaderCreate',{post:function(a,r){if(r)inc('指揮官の誕生',a[0]);}});
 wrap('btAIReactDFF',{post:function(a,r){inc('臨機射撃の検討',a[0]);if(r&&r.length)inc('臨機射撃',a[0],r.length);}});
 wrap('btRallySide',{pre:function(side,isAtt,log){return log.length;},post:function(a,r,n0){var L=a[2].slice(n0),sd=a[0];L.forEach(function(t){t=String(t);if(/自己回復/.test(t))inc('自己回復',sd);if(/を回復/.test(t))inc('指揮官による回復',sd);if(/修理/.test(t))inc('修理',sd);if(/回収/.test(t))inc('SW回収',sd);});inc('回復フェイズの処理',sd);}});
 wrap('btRoutSide',{pre:function(side,log){return log.length;},post:function(a,r,n0){var L=a[1].slice(n0);inc('潰走フェイズの処理',a[0]);L.forEach(function(t){t=String(t);if(/潰走/.test(t))inc('潰走',a[0]);if(/阻止/.test(t))inc('阻止',a[0]);if(/除去/.test(t))inc('潰走で除去',a[0]);});}});
 wrap('btShockRecover',{post:function(a){inc('ショック回復判定',a[0]||'両軍');}});
 wrap('btCCHex',{post:function(a){inc('白兵戦のヘクス',btSideNow());}});
 // ルールの実行時検査(違反は '違反:…' で数え、例を BT_AUDV に残す)
 var V=window.BT_AUDV=[];function viol(k,side,txt){inc('違反:'+k,side);if(V.length<400)V.push('T'+BT.turn+(BT.half?'裏':'表')+' '+btPhId()+' '+k+' '+txt);}
 var PHS={PF:'PFPh',AF:'AFPh',DFF:'MPh',SFF:'MPh',FPF:'MPh',FF:'DFPh',BFF:'MPh'};
 function nm(n){return n!=null&&n>=0&&BTG.nodes[n]?BTG.nodes[n].nm:String(n);}
 function chkFirer(tag,side,ph,s,u,tgtN){var att=btSideNow();var exp=(ph==='PF'||ph==='AF'||ph==='BFF')?att:btOpp(att);
   if(side!==exp)viol(tag+'の軍',side,ph+' '+side+'≠'+exp);if(PHS[ph]&&btPhId()!==PHS[ph])viol(tag+'のフェイズ',side,ph+' in '+btPhId());
   if(s){if(s.mel&&s.n!==tgtN)viol(tag+'白兵戦中に外へ射撃',side,nm(s.n));if(tgtN!=null&&s.n!==tgtN&&btEnemyAt(s.n,side))viol(tag+'自ヘクスに敵がいるのに外へ射撃',side,nm(s.n)+'→'+nm(tgtN));
     if(tgtN!=null&&s.n!==tgtN&&!btLOS(s.n,tgtN,false).ok)viol(tag+'LOSなし',side,nm(s.n)+'→'+nm(tgtN));}
   if(u){var I=btI(u,side);if((I.kind==='mmc'||I.kind==='smc')&&u.s==='br')viol(tag+'混乱ユニットの射撃',side,u.nm);}}
 wrap('btFireExec',{pre:function(fd,ev){try{(ev.parts||[]).forEach(function(p){chkFirer('射撃',fd.side,fd.ph,p.s,null,fd.tgtN);});(ev.usedU||[]).forEach(function(x){chkFirer('射撃',fd.side,fd.ph,null,x.u,fd.tgtN);});
   var key=BT.turn+'|'+BT.half+'|'+fd.ph+'|'+fd.tgtN;window.__fgk=window.__fgk||{};(ev.parts||[]).forEach(function(p){var k2=key+'|'+p.s.id;var mmc=(ev.usedU||[]).some(function(x){return x.s===p.s&&btI(x.u,fd.side).kind==='mmc';});var fresh=(ev.usedU||[]).some(function(x){return x.s===p.s&&!x.u.fire;});if(mmc&&fresh&&fd.ph!=='DFF'&&fd.ph!=='SFF'&&fd.ph!=='FPF'){if(window.__fgk[k2])viol('同じヘクスから同じ目標へ別々に射撃(義務的FG)',fd.side,nm(p.s.n)+'→'+nm(fd.tgtN)+' '+fd.ph+' 前回['+window.__fgk[k2]+'] 今回['+(ev.usedU||[]).map(function(x){return x.u.nm+':'+(x.u.fire||'-');}).join(',')+'] 残り['+BT.stacks.filter(function(x){return x.side===fd.side&&x.n===p.s.n;}).map(function(x){return x.u.map(function(u){return u.nm+':'+(u.fire||'-')+':'+u.s;}).join(',');}).join('|')+']');window.__fgk[k2]=(ev.usedU||[]).map(function(x){return x.u.nm+':'+(x.u.fire||'-');}).join(',');}});}catch(e){viol('検査エラー',fd.side,String(e));}},post:function(){}});
 wrap('btFireOrd',{pre:function(o){try{if(!btOrdEval(o).ok)return;var s=o.w&&o.w.s;var side=s&&s.side;chkFirer('砲撃',side,o.ph,s,null,o.tgtN);
   var g=o.w&&o.w.gd;if(g&&g.thType==='area'&&g.attBands&&s&&BTG.nodes[s.n].bldgT)viol('迫撃砲を建物から射撃(3.1)',side,nm(s.n));}catch(e){viol('検査エラー','?',String(e));}},post:function(){}});
 wrap('btMoveStep',{pre:function(to){try{var mv=BT.mv;if(!mv)return;var s=btStackById(mv.sid);if(!s)return;if(btPhId()!=='MPh'||mv.side!==btSideNow())viol('移動の軍/フェイズ',mv.side,btPhId());if(s.mel)viol('白兵戦中のユニットの移動',s.side,nm(s.n));
   s.u.forEach(function(u){if(mv.uids&&mv.uids.indexOf(u.id)<0)return;var I=btI(u,s.side);if(I.kind!=='mmc'&&I.kind!=='smc')return;if(u.s==='br')viol('混乱ユニットの移動',s.side,u.nm);if(u.s==='pn')viol('釘付けユニットの移動',s.side,u.nm);if(u.fire==='P')viol('準備射撃したユニットの移動',s.side,u.nm);});
   if(BT.stacks.some(function(x){return x.side!==s.side&&x.n===to&&btInf(x).length;}))viol('歩兵が敵のいるヘクスへ移動',s.side,nm(to));}catch(e){}},post:function(a,r){try{var mv=BT.mv;if(mv&&mv.mfUsed>mv.mfMax+(mv.road?1:0))viol('MF超過',mv.side,mv.mfUsed+'/'+mv.mfMax);}catch(e){}}});
 wrap('btAdvance',{pre:function(sid,uids,to){try{var s=btStackById(sid);if(!s)return;if(btPhId()!=='APh'||s.side!==btSideNow())viol('突撃の軍/フェイズ',s.side,btPhId());if(btDist(s.n,to)!==1)viol('突撃が1ヘクスでない',s.side,nm(s.n)+'→'+nm(to));if(s.mel)viol('白兵戦中のユニットの突撃',s.side,nm(s.n));
   s.u.forEach(function(u){if(uids&&uids.indexOf(u.id)<0)return;var I=btI(u,s.side);if(I.kind!=='mmc'&&I.kind!=='smc')return;if(u.s==='br')viol('混乱ユニットの突撃',s.side,u.nm);if(u.s==='pn')viol('釘付けユニットの突撃',s.side,u.nm);});}catch(e){}},post:function(){}});
 wrap('btRallySide',{pre:function(side,isAtt,log){return log.length;},post:function(a,r,n0){var L=a[2].slice(n0),k=0;L.forEach(function(t){if(/自己回復\(MMC1つ\)/.test(String(t)))k++;});if(!a[1]&&k)viol('防御側のMMCが自己回復',a[0],k);if(a[1]&&k>1)viol('攻撃側のMMCの自己回復が2つ以上',a[0],k);}});
 wrap('btFireExec',{pre:function(fd,ev){try{(ev.usedU||[]).forEach(function(x){var f=x.u.fire||'',d=btDist(x.s.n,fd.tgtN),I=btI(x.u,fd.side);
   if(fd.ph==='AF'&&f)viol('前進射撃で射撃済みのユニットが撃つ',fd.side,x.u.nm+' '+f);
   if(fd.ph==='AF'&&I.kind==='mg'&&x.u.mv&&I.type!=='LMG')viol('移動したMMG/HMGの前進射撃',fd.side,x.u.nm);
   if(fd.ph==='PF'&&f&&f!=='R')viol('準備射撃で射撃済みが撃つ',fd.side,x.u.nm+' '+f);
   if(fd.ph==='FF'&&(f==='F2'||(f==='F1'&&d>1)))viol('最終射撃の印のルール',fd.side,x.u.nm+' '+f+' d'+d);
   if(fd.ph==='DFF'&&f&&f!=='R')viol('臨機射撃で射撃済みが撃つ',fd.side,x.u.nm+' '+f);
   if(fd.ph==='SFF'&&f!=='F1'&&I.kind!=='mg')viol('再射撃の印',fd.side,x.u.nm+' '+f);
   if(fd.ph==='FPF'&&d>1)viol('FPFが隣接でない',fd.side,x.u.nm+' d'+d);
   if((fd.ph==='DFF'||fd.ph==='SFF'||fd.ph==='FPF')&&!(BT.mv&&btStackById(BT.mv.sid)&&btStackById(BT.mv.sid).n===fd.tgtN))viol('臨機射撃が移動中のユニット以外',fd.side,nm(fd.tgtN));});}catch(e){viol('検査エラー2',fd.side,String(e));}},post:function(){}});
 wrap('btPhaseLeave',{pre:function(id){try{
   if(id==='MPh'||id==='APh'||id==='RtPh'){var seen={};BT.stacks.forEach(function(s){if(s.n==null||s.n<0)return;var k=s.n+s.side;if(seen[k])return;seen[k]=1;var cur=[];BT.stacks.forEach(function(x){if(x.n===s.n&&x.side===s.side)cur=cur.concat(x.u);});var q=btSqEq(cur,s.side);if(q.m>3||q.l>4)viol('スタック制限超過('+id+'の終わり)',s.side,nm(s.n)+' 分隊'+q.m+' 単'+q.l);
     if(id==='MPh'){var vv=cur.filter(function(u){return btI(u,s.side).kind==='afv'&&!btIsWreck(u);}).length;if(vv>1)viol('同じヘクスに味方車両2両以上',s.side,nm(s.n));}});}
   if(id==='RtPh'){BT.stacks.forEach(function(s){if(s.n==null||s.n<0||s.mel)return;s.u.forEach(function(u){if(u.s!=='br'||!btIsInfK(btI(u,s.side).kind))return;var bad=BT.stacks.some(function(e){return e.side!==s.side&&e.n!=null&&e.n>=0&&btDist(e.n,s.n)<=1&&e.u.some(function(x){var k=btI(x,e.side).kind;return (btIsInfK(k)&&x.s!=='br')||(k==='afv'&&!btIsWreck(x));})&&(e.n===s.n||btLOS(e.n,s.n,true).ok);});if(bad)viol('潰走フェイズ後も混乱ユニットが敵に隣接',s.side,u.nm+'@'+nm(s.n));});});}
 }catch(e){viol('検査エラー3','?',String(e));}},post:function(){}});
 wrap('btIExit',{pre:function(){try{var mv=BT.mv,s=mv&&btStackById(mv.sid);if(s)s.u.forEach(function(u){if(u.s==='br')viol('混乱ユニットの退出',s.side,u.nm);});}catch(e){}},post:function(){}});
});
const r0=await p.evaluate(async()=>{BTG=null;await btEnsureGraph();
  window.BT_SELFPLAY=true;var d=btNewState();for(var k in d)BT[k]=d[k];BT.on=true;BT.sc=btScId();BT.fastApp=true;BT.cam=false;btInitCtl();
  if(btScId()==='S26'){btAppSetupSOV();BT.gerPlan={t1:'g2',t2:'g1'};}else btSetupSides().forEach(function(sd){btAppSetupGen(sd);});
  window.btHumanCanReact=function(){return false;};
  var orig=window.btAppTick;window.__ticks=0;
  window.btAppTick=function(){window.__ticks++;try{if(BT.started&&!BT.finished){var att=btSideNow(),ph=btPhId();BT.app=(ph==='DFPh')?btOpp(att):att;if(ph==='RPh'&&BT.rph&&BT.rph.on){try{BT.rph.ask=null;BtRphAuto();BtRphEnd();}catch(x){console.log('rphErr '+(x.stack||x));}}if(BT.pend==='react'){BT.pend=null;}}}catch(x){console.log('wrapErr '+x);}return orig.apply(this,arguments);};
  BT.app=btFirst();BtStart();
  return {bl:btBldgs().map(b=>b.id+':'+b.hexes.join('/')+'='+(BT.ctl[b.id]||'-')),stacks:BT.stacks.length,setup:(BT.setupLog||[]).length,n:BTG.nodes.length};});
console.log(JSON.stringify(r0));
const t0=Date.now();let last='';
while(Date.now()-t0<maxMin*60000){await p.waitForTimeout(3000);
 const st=await p.evaluate(()=>({t:BT.turn,h:BT.half,ph:btPhId(),fin:BT.finished,ticks:window.__ticks,mv:!!BT.mv,pend:BT.pend,n:BT.stacks.length}));
 const k=JSON.stringify(st);if(k!==last){last=k;console.log(k);}
 if(st.fin)break;
 if(!BT_ALIVE_CHECK(st))0;
 await p.evaluate(()=>{if(!BT_TICK)btKick(50);});
}
function BT_ALIVE_CHECK(){return 1;}
const fin=await p.evaluate(()=>{var vc=btVicCount();return {fin:BT.finished,turn:BT.turn,vc:vc,win:BT.finished?btCfgWinner():null,ger:BT.stacks.filter(s=>s.side==='GER').reduce((a,s)=>a+s.u.length,0),sov:BT.stacks.filter(s=>s.side==='SOV').reduce((a,s)=>a+s.u.length,0),log:(BT.log||[]).slice(-12).map(x=>String(x.t||x).slice(0,150))};});
console.log(JSON.stringify(fin,null,1));try{require('fs').appendFileSync('/tmp/w/res_'+(process.env.CFG||'x')+'.txt',JSON.stringify({tag:process.env.TAG||'',win:fin.win,turn:fin.turn,vc:fin.vc,ger:fin.ger,sov:fin.sov,err:e.length,bl:await p.evaluate(()=>btBldgs().map(b=>b.id+':'+b.hexes.join('/')+'='+(BT.ctl[b.id]||'-'))),afv:await p.evaluate(()=>BT.stacks.filter(s=>s.side==='GER'&&s.afv&&s.n!=null&&s.n>=0).map(s=>s.u.filter(u=>btI(u,'GER').kind==='afv').map(u=>u.nm+(u.imm?'(imm)':'')).join('+'))),fin:await p.evaluate(()=>BT.stacks.filter(s=>s.n!=null&&s.n>=0&&btInf(s).length).map(s=>s.side.charAt(0)+BTG.nodes[s.n].nm+':'+btInf(s).map(u=>u.nm.replace(/\[.*$/,'')+(u.s!=='ok'?'('+u.s+')':'')).join('/')))})+'\n');}catch(x){}require('fs').writeFileSync('/tmp/w/log_'+sc+'_'+(process.env.TAG||'x')+'.txt',(await p.evaluate(()=>(BT.log||[]).map(x=>String(x.t||x)).join('\n'))));
if(shot){await p.evaluate(()=>{BT.app=null;Draw();});await p.waitForTimeout(1500);await p.screenshot({path:shot});}
if(process.env.AUD){require('fs').writeFileSync('/tmp/w/aud_'+(process.env.TAG||'x')+'.json',JSON.stringify(await p.evaluate(()=>window.BT_AUD||{})));require('fs').writeFileSync('/tmp/w/audv_'+(process.env.TAG||'x')+'.txt',(await p.evaluate(()=>window.BT_AUDV||[])).join('\n'));}
if(process.env.DBG)require('fs').writeFileSync('/tmp/w/dbg_'+(process.env.TAG||'x')+'.json',JSON.stringify(await p.evaluate(()=>window.BT_DBG||[])));
console.log('ERRORS',e.length,JSON.stringify(e.slice(0,15)));await b.close();})();
