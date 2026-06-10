/* ==================================
   SERVICE WORKER - SCANNER PRODUCTOS
   CAMBIAR SOLO LA VERSIÓN
================================== */

const VERSION = "v3";

const CACHE_NAME = `scanner-productos-${VERSION}`;

const archivos = [
    "./",
    "./index.html",
    "./manifest.json",
    "./300.jpeg",
    "./JsBarcode.all.min.js",
    "./quagga.min.js"
];

/* ==================================
   INSTALAR
================================== */

self.addEventListener("install", event => {

    console.log("Instalando SW:", VERSION);

    self.skipWaiting();

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(archivos))

    );

});

/* ==================================
   ACTIVAR
================================== */

self.addEventListener("activate", event => {

    console.log("Activando SW:", VERSION);

    event.waitUntil(

        caches.keys().then(cacheNames => {

            return Promise.all(

                cacheNames.map(cache => {

                    if (cache !== CACHE_NAME) {

                        console.log(
                            "Eliminando caché antigua:",
                            cache
                        );

                        return caches.delete(cache);

                    }

                })

            );

        })

    );

    self.clients.claim();

});

/* ==================================
   FETCH
================================== */

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
        .then(response => {

            if (response) {
                return response;
            }

            return fetch(event.request)
            .then(networkResponse => {

                return networkResponse;

            });

        })
        .catch(() => {

            return caches.match("./index.html");

        })

    );

});

/* ==================================
   MENSAJE DE ACTUALIZACIÓN
================================== */

self.addEventListener("message", event => {

    if (event.data === "SKIP_WAITING") {

        self.skipWaiting();

    }

});