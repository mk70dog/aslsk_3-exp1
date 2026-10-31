// ASL SK Judge Service Worker (オフライン起動用)
// 更新のたびに APP_VERSION を index.html の APP_VERSION と同じ値に更新すること(古い版が出続けるのを防ぐ)。
var APP_VERSION='ASLSK3M-v11.673';
var CACHE='aslsk-'+APP_VERSION;
var CORE=['./index.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png','./icon-512m.png'];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){
    // index.htmlは巨大(70MB級)のため1回だけ取得する。HTTPキャッシュを避けて常に最新を保存。
    return Promise.all(CORE.map(function(u){return c.add(new Request(u,{cache:'reload'})).catch(function(){});}));
  }).then(function(){return self.skipWaiting();}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){return k.indexOf('aslsk-')===0&&k!==CACHE;}).map(function(k){return caches.delete(k);}));
  }).then(function(){return self.clients.claim();}));
});
self.addEventListener('fetch',function(e){
  var req=e.request;
  if(req.method!=='GET')return;
  var url=new URL(req.url);
  // ページ本体(ナビゲーション)は常にキャッシュ済みindex.htmlを返す(?クエリ付きでも同一)
  if(req.mode==='navigate'){
    e.respondWith(caches.match('./index.html').then(function(r){return r||fetch(req);}));
    return;
  }
  // 同一オリジンの静的ファイル: キャッシュ優先
  if(url.origin===self.location.origin){
    e.respondWith(caches.match(req).then(function(r){return r||fetch(req);}));
    return;
  }
  // Google Fonts(CSS/フォント): 取得できたら保存し、オフライン時は保存分を使う
  if(/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)){
    e.respondWith(caches.open(CACHE).then(function(c){
      return c.match(req).then(function(hit){
        var net=fetch(req).then(function(res){c.put(req,res.clone());return res;}).catch(function(){return hit;});
        return hit||net;
      });
    }));
  }
});
