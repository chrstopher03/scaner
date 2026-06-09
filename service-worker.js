const CACHE_NAME = "scanner-productos-v1";

const archivos = [
    "./",
    "./index.html",
    "./manifest.json",
    "./300.jpeg",
    "./JsBarcode.all.min.js",
    "./quagga.min.js"
];

self.addEventListener(
    "install",
    e=>{

        e.waitUntil(

            caches.open(CACHE_NAME)
            .then(cache=>{

                return cache.addAll(
                    archivos
                );

            })

        );

    }
);

self.addEventListener(
    "fetch",
    e=>{

        e.respondWith(

            caches.match(
                e.request
            ).then(resp=>{

                return (
                    resp ||
                    fetch(e.request)
                );

            })

        );

    }
);