const CACHE = 'financeiro-horas-v2';
const ARQUIVOS = ['./', './index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ARQUIVOS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((chaves) => Promise.all(chaves.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // só usa cache para os arquivos do próprio app; Firebase e fontes vão direto pra rede
  if (url.origin === self.location.origin) {
    event.respondWith(caches.match(event.request).then((resposta) => resposta || fetch(event.request)));
  }
});
