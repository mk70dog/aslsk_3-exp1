#!/usr/bin/env python3
# 版上げ: python3 dev/rel.py "履歴文"   (リポジトリのルートで実行。番号は今の版+1)
# index.html の シリーズvNNN・APP_VERSION(ASLSK3M-v12.0NN)・APP_VERSION_HIST_vNNN、sw.js、manifest.webmanifest を更新する
import re,sys,os
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
p=lambda f:os.path.join(root,f)
s=open(p('index.html'),encoding='utf-8').read()
m=re.search(r'APP_VERSION="ASLSK3M-v12\.(\d{3})"',s);old=800+int(m.group(1));new=old+1
hist=sys.argv[1] if len(sys.argv)>1 else ''
if not hist.startswith('v%d('%new):hist='v%d(%s'%(new,hist) if not hist.startswith('(') else 'v%d%s'%(new,hist)
h='var APP_VERSION_HIST_v%d="v%d('%(old,old);assert s.count(h)==1,'HIST行が見つからない'
assert '"' not in hist,'履歴文に " は使えない'
s=s.replace('シリーズv%d'%old,'シリーズv%d'%new).replace('APP_VERSION="ASLSK3M-v12.%03d"'%(old-800),'APP_VERSION="ASLSK3M-v12.%03d"'%(new-800))
s=s.replace(h,'var APP_VERSION_HIST_v%d="%s";\n'%(new,hist)+h)
open(p('index.html'),'w',encoding='utf-8').write(s)
for f,a,b in [('sw.js','v12.%03d'%(old-800),'v12.%03d'%(new-800)),('manifest.webmanifest','v%d'%old,'v%d'%new)]:
  t=open(p(f),encoding='utf-8').read();assert a in t,(f,a);open(p(f),'w',encoding='utf-8').write(t.replace(a,b))
print('v%d -> v%d'%(old,new))
