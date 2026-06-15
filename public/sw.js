const CACHE_NAME = 'Tanverse-cache-v1'
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css',
  '/manifest.json',
  '/favicon.ico'
]

// Install Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE)
    })
  )
})

// Activate Service Worker & flush old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key)
          }
        })
      )
    })
  )
})

// Fetch interception with Cache-First strategy fallback
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }
      return fetch(e.request).then((networkResponse) => {
        // Cache newly fetched assets
        if (networkResponse && networkResponse.status === 200) {
          const cacheCopy = networkResponse.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, cacheCopy)
          })
        }
        return networkResponse
      }).catch(() => {
        // Offline fallback if network fails
        return caches.match('/')
      })
    })
  )
})
