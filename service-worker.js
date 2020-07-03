const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';
const DEFAULT_APISERVER = "http://dkt.vnu.edu.vn:8080";

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
    event.waitUntil(
        fetch('http://mapping.vnu.edu.vn:8882/server/list')
            .then(response => response.json())
            .then(data => {
                let list = [];
                if (data.status == "200") {
                    data.data.forEach(function (server) {
                        list.push(server.address);
                    })
                }
                SaveAPIServerList(list)
            })
    )
    event.waitUntil(
        caches.open(PRECACHE)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(self.skipWaiting())
    );
});
var listAPIServer;
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
    // CreateIBDObject();
    SetListAPIserver();
});

// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
    if(typeof listAPIServer == "undefined") {
        SetListAPIserver();
    }

    if (event.request.mode === 'navigate') {
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
    } else {
        if(typeof listAPIServer != "undefined" && listAPIServer.length > 0) {
            if (event.request.url.startsWith(DEFAULT_APISERVER)) {
                let promiseRes;
                if (event.request.method == "GET" || event.request.method == "HEAD") {
                    promiseRes = new Promise(function (resolve) {
                        let initNewReq = {
                            method: event.request.method,
                            headers: event.request.headers,
                            mode: event.request.mode,
                            credentials: event.request.credentials,
                            cache: event.request.cache,
                            redirect: event.request.redirect,
                            referrer: event.request.referrer,
                            integrity: event.request.integrity
                        };
                        let randomAPI = listAPIServer[Math.floor(Math.random() * listAPIServer.length)];
                        let newUrl = event.request.url.replace(DEFAULT_APISERVER, randomAPI)
                        let newReq = new Request(newUrl, initNewReq);

                        fetch(newReq)
                            .then(response => {
                                resolve(response);
                            })
                    })
                } else {
                    promiseRes = new Promise(function (resolve) {
                        let body;
                        event.request.clone().json()
                            .then(function(jsonData) {
                                body = jsonData;
                                let initNewReq = {
                                    method: event.request.method,
                                    headers: event.request.headers,
                                    body: JSON.stringify(body),
                                    mode: event.request.mode,
                                    credentials: event.request.credentials,
                                    cache: event.request.cache,
                                    redirect: event.request.redirect,
                                    referrer: event.request.referrer,
                                    integrity: event.request.integrity
                                };
                                let randomAPI = listAPIServer[Math.floor(Math.random() * listAPIServer.length)];
                                let newUrl = event.request.url.replace(DEFAULT_APISERVER, randomAPI)
                                let newReq = new Request(newUrl, initNewReq);

                                fetch(newReq)
                                    .then(response => {
                                        resolve(response);
                                    })

                            });
                    })
                }

                event.respondWith(promiseRes)
            }
        }

    }
});

function SaveAPIServerList(APIServerList) {
    return new Promise(function (resolve) {
        if (!('indexedDB' in self)) {
            console.log('This browser doesn\'t support IndexedDB');
            resolve();
        } else {
            let request = self.indexedDB.open("MyDatabase", 1);

            request.onupgradeneeded = function(event) {
                db = event.target.result;

                let objectStore = db.createObjectStore("APIServerList", { autoIncrement : true });

                objectStore.transaction.oncomplete = function(event) {
                    resolve();
                };

                APIServerList.forEach(function(address) {
                    objectStore.add(address);
                });
            };
        }
    })
}

function SetListAPIserver() {
    if (!('indexedDB' in self)) {
        console.log('This browser doesn\'t support IndexedDB');
    } else {
        let request = self.indexedDB.open("MyDatabase", 1);

        request.onsuccess = function(event) {
            let idb = event.target.result;

            let transaction = idb.transaction(["APIServerList"], "readwrite");
            let objectStore = transaction.objectStore("APIServerList");
            let getReq = objectStore.getAll();
            getReq.onsuccess = function(event) {
                listAPIServer = getReq.result;
            };
        };


    }

}
