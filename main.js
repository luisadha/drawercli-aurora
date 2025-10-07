// main.js
if (navigator.serviceWorker) {
        navigator.serviceWorker.register (
          '/drawercli-aurora/service-worker.js',
          {scope: '/drawercli-aurora/'}
        )
}
