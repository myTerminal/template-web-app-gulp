/* global caches fetch skipWaiting */

var cacheName = '#sw-cache-string#',
    origin = '#sw-origin#';

this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(
                [
                    origin,
                    origin + 'index.html',
                    origin + 'styles/vendor/bootstrap/css/bootstrap.min.css',
                    origin + 'styles/vendor/font-awesome/css/font-awesome.min.css',
                    origin + 'styles/styles.css',
                    origin + 'scripts/scripts.js',
                    origin + 'images/pencils.jpg',
                    origin + 'styles/vendor/font-awesome/fonts/fontawesome-webfont.woff2?v=4.7.0',
                    origin + 'fonts/OpenSans-Light.ttf'
                ]
            );
        }).catch(function (err) {
            console.log(err);
        })
    );
});

this.addEventListener('fetch', function (event) {
    var urlWithoutQueryParams = event.request.url.split('?')[0];

    event.respondWith(caches.match(urlWithoutQueryParams).then(function (response) {
        if (response) {
            return response;
        }

        return fetch(event.request);
    }));
});

this.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(keyList => Promise.all(keyList.map(key => {
            if (key !== cacheName) {
                return caches.delete(key);
            } else {
                return null;
            }
        })))
    );
});

this.addEventListener('message', messageEvent => {
    if (messageEvent.data === 'skipWaiting') {
        return skipWaiting();
    } else {
        return null;
    }
});
