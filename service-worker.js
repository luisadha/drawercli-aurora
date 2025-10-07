// Drawercli Aurora Service Worker
// Cache halaman agar tetap bisa jalan offline & menjalankan JS (termasuk tombol Bagikan)

const CACHE = "drawercli-offline-v1";
importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js");

// Aktifkan update cepat
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

// Strategi cache utama
workbox.routing.registerRoute(
  new RegExp("/*"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE,
  })
);

// Pastikan halaman tetap bisa diakses offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => caches.match("/index.html"))
      );
    })
  );
});
