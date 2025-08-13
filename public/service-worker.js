const cacheName = 'ffmpegweb-cache';
const filestoCache = [
    './',
    './index.html',
    './icon.png',
    './icon.svg',
    './manifest.json',
    './assets/_commonjsHelpers.js',
    './assets/index.css',
    './assets/index.js',
    './assets/index2.js',
    './assets/index3.js',
    './assets/index4.js',
    './assets/index5.js',
    './assets/jszip.min.js',
    './assets/worker-lPYB70QI.js',
    'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.wasm',
    'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.worker.js',
    'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js',
    'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.js',
    'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.wasm',
    'https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm/ffmpeg-core.worker.js',
];
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll(filestoCache))
    );
});
self.addEventListener('activate', e => self.clients.claim());
self.addEventListener('fetch', event => {
    const req = event.request;
    if (req.url.indexOf("updatecode") !== -1 || req.url.indexOf("youtube") !== -1) event.respondWith(fetch(req)); else event.respondWith(networkFirst(req));
});
/**
 * The BroadcastChannel used to communicate with the main window
 */
const comms = new BroadcastChannel("comms");
/**
 * The Map that contains the zip file ID as the key, and the TransformStream and its writer as a value.
 */
const zipStreams = new Map();
self.addEventListener("message", (msg) => {
    switch (msg.data.action) {
        case "CreateStream": {
            const stream = new TransformStream();
            zipStreams.set(msg.data.id, {
                stream,
                writer: stream.writable.getWriter()
            });
            comms.postMessage({ action: "SuccessStream", id: msg.data.id });
            break;
        }
        case "WriteChunk": {
            const stream = zipStreams.get(msg.data.id);
            if (stream) {
                /**
                 * @type WritableStreamDefaultWriter
                 */
                const writer = stream.writer;
                writer.write(msg.data.chunk).then(() => {
                    comms.postMessage({action: "SuccessWrite", operationId: msg.data.operationId})
                });
            }
            break;
        }
        case "CloseStream": {
            const stream = zipStreams.get(msg.data.id);
            if (stream) {
                stream.writer.close();
            }
            comms.postMessage({ action: "SuccessClose", id: msg.data.id });
            break;
        }
    }
})

async function networkFirst(req) {
    const getStream = zipStreams.get(req.url.substring(req.url.lastIndexOf("/downloader?id=") + "/downloader?id=".length)); // Look if the request is tied with a local zip file. In this case, the readable stream needs to be returned.
    if (getStream) {
        return new Response(getStream.stream.readable, {
            headers: {
                "Content-Disposition": `attachment; filename="FfmpegWeb-Zip-${Date.now()}.zip"`,
                "Content-Type": "application/zip"
            }
        })
    }
    if (req.url.endsWith("/ping")) return new Response("Success.");
    try {
        const networkResponse = await fetch(req);
        const cache = await caches.open(cacheName);
        await cache.delete(req);
        await cache.put(req, networkResponse.clone());
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(req);
        return cachedResponse;
    }
}