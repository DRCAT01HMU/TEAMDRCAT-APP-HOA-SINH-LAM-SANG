const CACHE_NAME = 'tdc-hoasinh-v2.1';
const urlsToCache = [
  './', 
  './index.html', 
  './pdf-viewer.html', 
  './manifest.json', 
  'https://cdn.tailwindcss.com', 
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', 
  'https://cdn-icons-png.flaticon.com/512/3004/3004458.png', 
  'https://unpkg.com/react@18/umd/react.production.min.js', 
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js', 
  'https://unpkg.com/@babel/standalone/babel.min.js', 
  './daicuonghetk.html',
  './hoasinh_case_1.html',
  './hoasinh_case_2.html',
  './hoasinh_case_3.html',
  './hoasinh_case_4.html',
  './hoasinh_case_5.html',
  './hoasinh_case_6.html',
  './hoasinh_case_7.html',
  './hoasinh_case_8.html',
  './hoasinh_case_9.html',
  './hoasinh_case_10.html',
  './hoasinh_case_11.html',
  './hoasinh_case_12.html',
  './hoasinh_case_13.html',
  './hoasinh_case_14.html',
  './hoasinh_case_15.html',
  './hoasinh_case_16.html',
  './hoasinh_case_17.html',
  './hoasinh_case_18.html',
  './hoasinh_case_19.html',
  './hoasinh_case_20.html'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
          });
        }
        return networkResponse;
      }).catch(err => {});
      return cachedResponse || fetchPromise;
    })
  );
});
