// returns css string
module.exports=function(){
var P='radial-gradient(circle,#000000aa 1px,transparent 1.35px) 0 0/4px 4px,radial-gradient(circle at 50% 70%,#ffffff14 1px,transparent 1.4px) 0 0/4px 4px,#1c1f27',
B='radial-gradient(circle,#000000aa .9px,transparent 1.25px) 0 0/4px 4px,radial-gradient(circle at 50% 70%,#ffffff10 .9px,transparent 1.3px) 0 0/4px 4px,linear-gradient(#131313 0%,#0d0d0d 50%,#080808 100%)',
SH='0 4px 0 #0e0e0c,0 5px 2px #0000008c,inset 0 1px 0 #ffffff1f,inset 1px 0 0 #ffffff0f,inset -1px 0 0 #0000002e,inset 0 -2px 0 #00000038',
RV='radial-gradient(circle 1.6px at 5px 5px,#3e4335 99%,transparent 100%),radial-gradient(circle 1.6px at calc(100% - 5px) 5px,#3a3f1f 99%,transparent 100%),radial-gradient(circle 1.6px at 5px calc(100% - 5px),#423c10 99%,transparent 100%),radial-gradient(circle 1.6px at calc(100% - 5px) calc(100% - 5px),#43474b 99%,transparent 100%)',
R='html:root ',PN=[R+'#nmCcSc .ccBox',R+'#nmCcp .ccpBox',R+'#nmDcp .dcBox',R+'#nmRaq .rqBox'],
BT=function(suf){return ['#nmCcSc','#nmCcp','#nmDcp','#nmRaq'].map(function(i){return R+i+' .b'+(suf||'');}).join(',');},
css=PN.join(',')+'{background:'+P+'!important;border:1px solid #4a5566!important;border-radius:10px!important;box-shadow:0 8px 24px #000c!important;color:#ccddee!important}'
+['#nmCcSc','#nmCcp','#nmDcp','#nmRaq'].map(function(i){return R+i+' div[style*="background:#0e131b"],'+R+i+' div[style*="background:#121822"]';}).join(',')+'{background:#12151b!important;border-radius:8px!important}'
+BT('.sm:not([style*="background"]):not(.on),')+BT('.big:not([style*="background"]):not(.on)').replace(/^/,'')+'{background:'+B+'!important;border:0!important;border-radius:3px!important;box-shadow:'+SH+'!important;color:#ccddee!important;position:relative}'
+BT('[style*="background"]')+'{border-radius:3px!important;box-shadow:'+SH+';position:relative}'
+BT('')+'{position:relative}'
+BT('::before')+'{content:""!important;position:absolute;inset:0;pointer-events:none;background-image:'+RV+'!important;background-repeat:no-repeat!important}'
+BT(':active')+'{transform:translateY(2px)}'
+BT('.on')+'{background:linear-gradient(#e0b84a,#b88a1e)!important;color:#1a1200!important;font-weight:700;box-shadow:0 4px 0 #6a4a00,inset 0 1px 0 #ffffff40!important;border:0!important}';
return css;};
