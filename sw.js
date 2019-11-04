const cacheName = 'pwa-v2019-11-04';
const cacheAssets = [
  'index.html',
  '/assets/js/build.7af6b8853f094125.js',
  '/assets/js/app.a8e332a6d1a98dd2.js',
  '/assets/manifest.json',
  '/assets/fonts/intel-clear-latin.ttf',
  '/assets/fonts/intel-clear-latin.woff',
  '/assets/fonts/intel-clear-latin.woff2',
  '/assets/fonts/poppins.woff2',
  '/assets/fonts/poppins-latin.woff2',
  '/assets/fonts/poppins-latin-2.woff2',
  '/assets/images/home-bg.jpg',
  '/assets/images/floaters/Amazonwebservices.svg',
  '/assets/images/floaters/Bitbucket.svg',
  '/assets/images/floaters/Codeigniter.svg',
  '/assets/images/floaters/Cplusplus.svg',
  '/assets/images/floaters/Debian.svg',
  '/assets/images/floaters/Django.svg',
  '/assets/images/floaters/Docker.svg',
  '/assets/images/floaters/Electron.svg',
  '/assets/images/floaters/Github.svg',
  '/assets/images/floaters/Gitlab.svg',
  '/assets/images/floaters/Heroku.svg',
  '/assets/images/floaters/Javascript.svg',
  '/assets/images/floaters/Mysql.svg',
  '/assets/images/floaters/Node Js.svg',
  '/assets/images/floaters/Npm.svg',
  '/assets/images/floaters/Php.svg',
  '/assets/images/floaters/Python.svg',
  '/assets/images/floaters/Rails.svg',
  '/assets/images/floaters/Raspberry pi.svg',
  '/assets/images/floaters/Redis.svg',
  '/assets/images/floaters/Ruby.svg',
  '/assets/images/floaters/Touch id.svg',
  '/assets/images/floaters/Trello.svg',
  '/assets/images/floaters/Ubuntu.svg',
  '/assets/images/floaters/Wordpress.svg',
  '/assets/images/close.svg',
  '/assets/images/menu.svg',
  '/assets/images/ns.png',
  '/assets/images/icon/icon-512x512.png',
];

// Call Install Event
self.addEventListener('install', e => {
  // console.log('Service Worker: Installed');
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        // console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate Event
self.addEventListener('activate', e => {
  // console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            // console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener('fetch', e => {
  // console.log('Service Worker: Fetching');
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});