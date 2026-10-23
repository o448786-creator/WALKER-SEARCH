const CACHE_NAME = 'walker-search-v1';
const ASSETS = [
  './index.html',
  './manifest.json'
];

// Instala o Service Worker e guarda os arquivos essenciais
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Ativa o Service Worker na rede
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Gerencia as requisições de páginas
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});


// REGISTRO DO SERVICE WORKER (PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Protocolo PWA Ativo!', reg))
            .catch(err => console.log('Falha PWA:', err));
    });
}
