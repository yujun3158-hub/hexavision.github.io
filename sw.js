/* ══════════════════════════════════════════════════
   HexaVision — Service Worker
   캐시 전략: Network First (백엔드 API는 항상 네트워크)
   ══════════════════════════════════════════════════ */

const CACHE_NAME = 'hexavision-v1';
const STATIC_ASSETS = [
  '/hexavision.github.io/',
  '/hexavision.github.io/index.html',
  '/hexavision.github.io/manifest.json',
  '/hexavision.github.io/icon-192.png',
  '/hexavision.github.io/icon-512.png',
  '/hexavision.github.io/logo-mark.svg',
  '/hexavision.github.io/logo-mark.png',
];

/* ── Install: 정적 파일 캐시 ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

/* ── Activate: 이전 캐시 삭제 ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* ── Fetch: API는 네트워크 우선, 나머지는 캐시 폴백 ── */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // 백엔드 API 요청 → 항상 네트워크 (캐시 안 함)
  if (url.hostname !== location.hostname) {
    event.respondWith(fetch(event.request));
    return;
  }

  // 정적 리소스 → 캐시 우선, 없으면 네트워크
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        // 성공 응답만 캐시에 저장
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    }).catch(() => caches.match('/hexavision.github.io/index.html'))
  );
});
