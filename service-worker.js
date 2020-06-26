const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';
const URLSTOCACHE = [
    "http://localhost/KhoaLuan2020_SV/Content/",
    "http://localhost/KhoaLuan2020_SV/Script/",
    "http://mapping.vnu.edu.vn:8882/mapping",
    "http://mapping.vnu.edu.vn:8882/subjectSemester/getIds/"
];

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
    'http://localhost/KhoaLuan2020_SV/index.html',
    'http://localhost/KhoaLuan2020_SV/Index.html',
    'http://localhost/KhoaLuan2020_SV/', // Alias for index.html

    'http://localhost/KhoaLuan2020_SV/View/Home.html',
    'http://localhost/KhoaLuan2020_SV/View/StudentRegister.html',
    'http://localhost/KhoaLuan2020_SV/View/RegisterResult.html',
    'http://localhost/KhoaLuan2020_SV/View/ErrorPage.html',

    'http://localhost/KhoaLuan2020_SV/View/home.html',
    'http://localhost/KhoaLuan2020_SV/View/studentregister.html',
    'http://localhost/KhoaLuan2020_SV/View/registerresult.html',
    'http://localhost/KhoaLuan2020_SV/View/errorpage.html',

    'http://localhost/KhoaLuan2020_SV/Script/Common/SW_setup.js',
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
    CreateIDB();
    event.waitUntil(
        caches.open(PRECACHE)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(self.skipWaiting())
    );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        }).then(() => self.clients.claim())
    );
    SetIBDConnect();
});
var idb;
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
    if(typeof listAPIServer == "undefined") {
        SetIBDConnect();
    }
    AddRequestLog("TotalRequest", event.request.clone().url)

    if (event.request.mode === 'navigate') {
        AddRequestLog("CacheHitRequest", event.request.clone().url)
        event.respondWith(caches.match(event.request.url));
    }
    let cacheFlag = false;
    URLSTOCACHE.forEach(function (prefUrl) {
        if (event.request.url.startsWith(prefUrl)) {
            cacheFlag = true;
        }
    })

    if (cacheFlag) {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    AddRequestLog("CacheHitRequest", event.request.clone().url)
                    return cachedResponse;
                }
                return caches.open(RUNTIME).then(cache => {
                    return fetch(event.request).then(response => {
                        // Put a copy of the response in the runtime cache.
                        return cache.put(event.request, response.clone()).then(() => {
                            return response;
                        });
                    });
                });
            })
        );
    }
});


function CreateIDB() {
    if (!('indexedDB' in self)) {
        console.log('This browser doesn\'t support IndexedDB');
    } else {
        let request = self.indexedDB.open("MyDatabase", 1);

        request.onupgradeneeded = function(event) {
            db = event.target.result;

            db.createObjectStore("TotalRequest", { autoIncrement : true });
            db.createObjectStore("CacheHitRequest", { autoIncrement : true });
        };
    }
}

function AddRequestLog(objectName, url) {
    let transaction = idb.transaction([objectName], "readwrite");
    let objectStore = transaction.objectStore(objectName);
    let request = objectStore.add(url);
    request.onerror = function(event) {
        console.log("error with " + objectName + "  " + url)
    };
}

function SetIBDConnect() {
    if (!('indexedDB' in self)) {
        console.log('This browser doesn\'t support IndexedDB');
    } else {
        let request = self.indexedDB.open("MyDatabase", 1);
        request.onsuccess = function(event) {
            idb = event.target.result;
        };
    }

}