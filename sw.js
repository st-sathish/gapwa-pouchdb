var filesToCache = [
  '/',
  '/index.html',
  '/add_health_seeker.html',
  '/edit_health_seeker.html',
  '/offline_hs_datatable.html',
  '/add_health_information.html',
  '/edit_health_information.html',
  '/hs_datatable.html',
  '/online_hs_datatable.html',
  '/css/bootstrap/bootstrap.css',
  '/css/bootstrap/bootstrap-grid.css',
  '/css/bootstrap/bootstrap-reboot.css',
  '/css/font-awesome/font-awesome.css',
  '/css/bootstrap.css',
  '/css/lightgallery.min.css',
  '/css/responsive.css',
  '/css/style.css',
  '/fonts/fontawesome-webfont.eot',
  '/fonts/fontawesome-webfont.svg',
  '/fonts/fontawesome-webfont.ttf',
  '/fonts/fontawesome-webfont.woff',
  '/fonts/fontawesome-webfont.woff2',
  '/fonts/lg.eot',
  '/fonts/lg.svg',
  '/fonts/lg.ttf',
  '/fonts/lg.woff',
  '/images/11.png',
  '/images/hello-icon-128.png',
  '/images/hello-icon-144.png',
  '/images/hello-icon-152.png',
  '/images/hello-icon-192.png',
  '/images/hello-icon-256.png',
  '/images/hello-icon-512.png',
  '/templates/sync.tpl',
  '/assets/css/simple-sidebar.css',
  '/assets/lib/css/jquery-ui.css',
  '/assets/lib/async.min.js',
  '/assets/lib/jquery.dataTables.min.js',
  '/assets/lib/jquery.jqote2.js',
  '/assets/lib/jquery-3.4.1.min.js',
  '/assets/lib/pouchdb.find.js',
  '/assets/lib/pouchdb.find.js',
  '/assets/lib/pouchdb.relational-pouch.js',
  '/assets/lib/pouchdb.relational-pouch.js',
  '/assets/lib/pouchdb.upsert.js',
  '/assets/lib/pouchdb-7.1.1.js',
  '/assets/vendor/bootstrap/css/bootstrap.css',
  '/assets/vendor/bootstrap/css/bootstrap-grid.css',
  '/assets/vendor/bootstrap/css/bootstrap-reboot.css',
  '/assets/vendor/bootstrap/js/bootstrap.bundle.js',
  '/assets/vendor/bootstrap/js/bootstrap.js',
  '/assets/vendor/jquery/jquery.js',
  '/assets/vendor/jquery/jquery.js',
  '/assets/vendor/jquery/jquery.min.map',
  '/assets/vendor/jquery/jquery.slim.js',
  '/assets/vendor/jquery/jquery.slim.js',
  '/assets/vendor/jquery/jquery.slim.min.map',
  '/assets/api.js',
  '/assets/db.js',
  '/assets/hs.api.js',
  '/assets/hs.datatable.js',
  '/assets/hs.info.ui.js',
  '/assets/hs.presenter.js',
  '/assets/hs.ui.js',
  '/assets/main.js',
  '/assets/offline.hs.datatable.js',
  '/assets/online.hs.datatable.js',
  '/assets/storage.js'
];

/* Start the service worker and cache all of the app's content */
const version = "0.6.18";
const cacheName = `growayu-assist`;
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
