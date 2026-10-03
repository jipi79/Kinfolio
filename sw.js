// Kinfolio 앱 서비스 워커: 앱 화면을 기기에 보관해 오프라인에서도 열리게 한다.
// 같은 주소의 파일은 먼저 네트워크에서 새로 받아 보고(업데이트 반영), 안 되면 보관본을 쓴다. 구글 API 요청은 건드리지 않는다.
const VERSION = "f8f2228b91";
const CACHE = "kinfolio-" + VERSION;
const SHELL = ["./", "index.html", "manifest.webmanifest", "config.js", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "icons/apple-touch-icon.png", "icons/favicon-32.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("kinfolio-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const r = e.request; if (r.method !== "GET") return;
  const u = new URL(r.url);
  if (u.origin === location.origin) {
    e.respondWith(fetch(r, { cache: "no-cache" }).then(res => {
      if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); }
      return res;
    }).catch(() => caches.match(r, { ignoreSearch: true }).then(m => m || (r.mode === "navigate" ? caches.match("index.html") : Response.error()))));
    return;
  }
  if (u.hostname === "fonts.googleapis.com" || u.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); return res; })));
  }
});
