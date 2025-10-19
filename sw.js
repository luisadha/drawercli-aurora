self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('drawercli-apps').then((cache) => cache.addAll([
      '/drawercli-aurora/index.html',
      '/drawercli-aurora/index.js',
      '/drawercli-aurora/assets/style.css',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
