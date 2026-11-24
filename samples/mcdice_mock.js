const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const V=process.argv[2]||'A';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});
p.on('console',m=>console.log(m.text().slice(0,200)));p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file:///home/claude/aslsk_3-exp1/index.html');await p.waitForTimeout(1500);
await p.evaluate(async(V)=>{S.scen.sel='S29';NAVTAB('scen');NAVTAB('los');LOS_PAGE();BTG=null;await btEnsureGraph();var d=btNewState();for(var k in d)BT[k]=d[k];BT.on=true;BT.sc=btScId();BT.fastApp=true;BT.cam=false;btInitCtl();btSetupSides().forEach(btAppSetupGen);BT.app='GER';BtStart();
await new Promise(r=>setTimeout(r,4500));
['nmTv','nmScV','btSuPop'].forEach(i=>{var e=document.getElementById(i);if(e)e.remove();});[...document.querySelectorAll('div')].filter(x=>getComputedStyle(x).position==='fixed'&&/おまかせ編成/.test(x.textContent)&&x.textContent.length<2000).forEach(x=>x.remove());
var img=function(side,nm,s){var im=btVcUnitImg(side,{nm:nm,s:s||'ok',id:'m'});return im&&im.src?'<img src="'+im.src+'" style="width:46px;height:46px;border-radius:3px">':nm;};
var die=function(n,rd){return '<span style="display:inline-flex;width:30px;height:30px;border-radius:6px;background:'+(rd?'#c62828':'#f4f4f4')+';color:'+(rd?'#fff':'#111')+';align-items:center;justify-content:center;font-size:18px;font-weight:900;box-shadow:0 2px 4px #000a">'+n+'</span>';};
var nd='<span style="display:inline-flex;width:30px;height:30px;border-radius:6px;border:2px dashed #5a6676;color:#5a6676;align-items:center;justify-content:center;font-size:16px">?</span>';
var row=function(side,nm,mor,drm,dd,res,rc,cur,sN){return '<div style="display:flex;align-items:center;gap:12px;padding:7px 10px;border-radius:8px;margin-top:6px;background:'+(cur?'#2a2410':'#0f141b')+';border:1px solid '+(cur?'#ffd060':'#2c3644')+'">'+img(side,nm,sN)+'<div style="min-width:120px"><b style="font-size:15px">'+nm+'</b><div style="font-size:12px;color:#9fb0c3">士気 <b style="color:#fff">'+mor+'</b>'+(drm?' ・ DRM <b style="color:#fff">'+drm+'</b>':'')+'</div></div><span style="display:flex;gap:5px;align-items:center">'+(dd?die(dd[0],1)+die(dd[1],0)+'<span style="font-size:15px;margin-left:4px">= '+(dd[0]+dd[1])+(dd[2]?' '+dd[2]:'')+'</span>':nd+nd)+'</span><span style="flex:1"></span><b style="font-size:20px;color:'+rc+'">'+(res||'')+'</b></div>';};
var box=function(title,sub,col,body,foot){return '<div style="position:fixed;z-index:9500;left:50%;top:50%;transform:translate(-50%,-50%);width:min(640px,94vw);background:#141a22f5;border:2px solid '+col+';border-radius:14px;box-shadow:0 14px 44px #000d;color:#e8eef4;font-family:AppFont,AppJP,monospace;padding:12px 16px 14px"><div style="font-size:19px;font-weight:900;color:'+col+'">'+title+'</div><div style="font-size:12.5px;color:#9fb0c3;margin-top:3px">'+sub+'</div>'+body+'<div style="display:flex;gap:10px;align-items:center;margin-top:12px">'+foot+'</div></div>';};
var btnY=function(t){return '<div style="display:inline-flex;align-items:center;font:inherit;height:48px;padding:0 22px;border-radius:12px;font-weight:900;font-size:17px;background:linear-gradient(#ffdf7a,#e0a800);color:#1b1500;border:0;box-shadow:0 0 16px #e0a80066">'+t+'</div>';};
var btnG=function(t){return '<button style="font:inherit;height:40px;padding:0 16px;border-radius:10px;font-size:14px;background:#1c2430;color:#cfe3f5;border:1px solid #3a4658">'+t+'</button>';};
var gn=[];BT.stacks.forEach(s=>{if(s.side==='GER')s.u.forEach(u=>{if(gn.indexOf(u.nm)<0)gn.push(u.nm);});});console.log(gn.join(','));var G1=gn.filter(x=>/^4-6-7/.test(x))[0]||'4-6-7',G2=gn.filter(x=>/^4-4-7/.test(x))[0]||'4-4-7';var h;
if(V==='A'){h=box('🎲 1MC — あなたの部隊が判定','独軍の射撃 P5 → O7 の結果 1MC。指揮官から順に、1つずつダイスを振ってください','#ffd060',
 row('SOV','8-1',8,'+1',[2,3,'+1 = 6'],'成功','#60e060')+row('SOV','7-4-7[E]',7,'+1 −1',[4,4,'+0 = 8'],'混乱','#ff8040',false,'br')+row('SOV','7-4-7[E]',7,'+1 −1',null,'','',true)
 ,btnY('🎲 7-4-7 のMCを振る')+'<span style="font-size:12px;color:#9fb0c3">残り 1</span><span style="flex:1"></span>');}
else{h=box('相手(独軍・AI)の判定 — 2MC','あなたの射撃 O7 → P5 の結果 2MC。AIが振ったダイスを1つずつ表示します','#8fd0ff',
 row('GER','8-0',8,'+2',[3,2,'+2 = 7'],'成功','#60e060')+row('GER',G1,7,'+2 +0',[5,1,'+2 = 8'],'混乱','#ff8040',false,'br')+row('GER',G2,7,'+2 +0',null,'','',true)
 ,btnY('次へ ▶')+btnG('全部見る')+'<span style="flex:1"></span><span style="font-size:12px;color:#9fb0c3">残り 1</span>');}
var el=document.createElement('div');el.innerHTML='<div style="position:fixed;inset:0;z-index:9490;background:rgba(5,7,10,.45)"></div>'+h;document.body.appendChild(el);},V);
await p.waitForTimeout(600);await p.screenshot({path:'/tmp/fz/mc_'+V+'.png'});await b.close();})();
