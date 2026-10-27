// Guarda la app en el teléfono para que abra rápido y sin señal. Los datos siempre van a la hoja de Google.
const CACHE = 'app-20261027215848';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))));
  self.clients.claim();
});

function saveCopy(request, response) {
  if (response.ok || response.type === 'opaque') {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(request, copy));
  }
  return response;
}
// Con señal trae la versión nueva; si tarda más de 4 segundos o no hay señal, usa la copia guardada.
function networkFirst(request) {
  const fromCache = () => caches.match(request, { ignoreSearch: true }).then(cached => cached || caches.match('index.html'));
  const timeout = new Promise(resolve => setTimeout(resolve, 4000)).then(fromCache);
  const network = fetch(request).then(response => saveCopy(request, response)).catch(fromCache);
  return Promise.race([network, timeout]).then(response => response || network);
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin === location.origin) event.respondWith(networkFirst(request));
  else if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => saveCopy(request, response))));
  }
});
