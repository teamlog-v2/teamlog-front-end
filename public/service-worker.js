// /* pusher test */
// importScripts("https://js.pusher.com/beams/service-worker.js");
// /* pusher test */

// const CACHE_NAME = 'teamlog-cache-v2';

// const FILES_TO_CACHE = [
//     'offline.html',
// ];

// self.addEventListener('install', (evt) => {
//     evt.waitUntil(
//         caches.open(CACHE_NAME).then((cache) => {
//             console.log('install');
//             return cache.addAll(FILES_TO_CACHE);
//         }),
//     );
// });

// self.addEventListener('activate', (evt) => {
//     evt.waitUntil(
//         caches.keys().then((keyList) => Promise.all(keyList.map((key) => {
//             if (key !== CACHE_NAME) {
//                 console.log('Removing old cache', key);
//                 return caches.delete(key);
//             }
//         }))),
//     );
// });

// self.addEventListener('fetch', (evt) => {
//     // caches.open(CACHE_NAME).then((cache) => {
//     //     return cache.match(evt.request)
//     //     .then((response) => {
//     //         return response || fetch(evt.request);
//     //     });
//     // });

//     if (evt.request.mode !== 'navigate') {
//         return;
//     }
//     evt.respondWith(
//         fetch(evt.request)
//             .catch(() => caches.open(CACHE_NAME)
//                 .then((cache) => cache.match('offline.html'))),
//     );
// });