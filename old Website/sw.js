var CACHE_NAME = 'pinkfry-v2';
var urlsToCache = [
    "/",
    "services.html",
    '/team.html',
    'portfolio.html',
    'products.html',
    'index.html',
    'about-us.html',
    'contact-us.html',
    "offline.json",
    '/images/tech_stack.webp',
    '/images/okgoogle.webp',
    'images/home/10.webp',
    '/images/home/11.webp',
    '/images/home/12.webp',
    '/images/home/13.webp',
    '/images/home/14.webp',
    '/images/home/15.webp',
    '/images/home/16.webp',
    '/images/home/17.webp',
    '/images/home/18.webp',
    '/images/home/22.webp',
    '/images/home/33.webp',
    '/images/home/anant.webp',
    '/images/home/naughty.webp',
    '/images/home/pinkfry.tech.webp',
    '/images/home/shubham.webp',
    '/images/home/piyush.webp',
    '/images/icons/invoice.webp',
    '/images/icons/offline.webp',
    '/images/icons/networking.webp',
    '/images/icons/trainer.webp',
    '/images/icons/stewardness.webp',
    '/images/icons/laptop.webp',
    '/images/inner-page/4.webp',
    '/images/inner-page/5.webp',
    '/images/inner-page/6.webp',
    '/images/inner-page/7.webp',
    '/images/pink.webp',
    '/images/pinkfry.webp',
    '/images/pinkfry_one.webp',
];

self.addEventListener('install', function(event) {
    console.log('installing...')
        // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log(cache);
            cache.addAll(urlsToCache);
        })
    );
});
self.addEventListener('fetch', function(event) {

    const parsedUrl = new URL(event.request.url)

    // if (parsedUrl.host == "pinkfry.tech" && !navigator.onLine) {
    //     event.respondWith(fetch("offline.json"));
    // } else {

    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }

            return fetch(event.request).then(
                function(response) {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // IMPORTANT: Clone the response. A response is a stream
                    // and because we want the browser to consume the response
                    // as well as the cache consuming the response, we need
                    // to clone it so we have two streams.
                    var responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(function(cache) {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }
            );
        })
    );
    // }
});

self.addEventListener('activate', function(event) {
    const cacheWhitelist = ["pinkfry-v2"]
    event.waitUntil(
        caches.keys()
        .then(names => {
            Promise.all(names.map(cachename => {
                if (cacheWhitelist.indexOf(cachename) === -1) {
                    return caches.delete(cachename)
                }
            }))
        })
    )
})