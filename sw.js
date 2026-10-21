// De app is verhuisd naar https://ltadeurs.github.io/fc-trainer/. Deze service worker ruimt de oude
// offline-kopie op en schakelt zichzelf uit, zodat de pagina "verhuisd" zichtbaar wordt.
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    // Alleen de caches van de oude app; de nieuwe app (fc-trainer-…) staat op hetzelfde domein.
    for (const k of await caches.keys()) if (k.startsWith('fcz-trainer-')) await caches.delete(k)
    await self.registration.unregister()
    for (const c of await self.clients.matchAll({ type: 'window' })) c.navigate(c.url)
  })())
})
