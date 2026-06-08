"use strict";

/* Service Worker cho Cấp Cứu 101.
   Toàn bộ là asset cục bộ nên precache hết -> chạy offline 100%,
   đặc biệt quan trọng cho Chế độ Hoảng loạn khi mất mạng. */

const CACHE_VERSION = "capcuu101-v12";
const APP_SHELL_CACHE = `${CACHE_VERSION}:app-shell`;

const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./sound.js",
  "./app.js",
  "./manifest.json",
  "./icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./screenshots/home.png",
  "./screenshots/game.png",
  "./screenshots/og.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(APP_SHELL_CACHE)
      .then((cache) => Promise.allSettled(APP_SHELL.map((a) => cache.add(a))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => !k.startsWith(CACHE_VERSION)).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  // Điều hướng trang: ưu tiên mạng, rớt mạng thì trả index từ cache.
  if (request.mode === "navigate") {
    event.respondWith(networkFirstPage(request));
    return;
  }

  // Còn lại: cache trước, đồng thời cập nhật ngầm.
  event.respondWith(staleWhileRevalidate(request, APP_SHELL_CACHE));
});

async function networkFirstPage(request) {
  const cache = await caches.open(APP_SHELL_CACHE);
  try {
    const response = await fetch(request);
    cache.put("./", response.clone());
    return response;
  } catch {
    return (await cache.match(request))
      || (await cache.match("./"))
      || (await cache.match("./index.html"));
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fresh = fetch(request)
    .then((response) => {
      if (response && (response.ok || response.type === "opaque")) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);
  return cached || fresh;
}
