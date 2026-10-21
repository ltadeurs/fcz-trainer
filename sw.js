// De app is verhuisd naar https://ltadeurs.github.io/fc-trainer/. Deze service worker ruimt de oude
// offline-kopie op en schakelt zichzelf uit, zodat de pagina "verhuisd" zichtbaar wordt.
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) await caches.delete(k)
    await self.registration.unregister()
    for (const c of await self.clients.matchAll({ type: 'window' })) c.navigate(c.url)
  })())
})
