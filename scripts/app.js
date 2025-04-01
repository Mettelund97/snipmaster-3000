// app.js - Application entry point

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // First migrate data from localStorage to IndexedDB
        await SnippetStorage.migrateFromLocalStorage();
        
        // Initialize the UI modules
        await SnippetUI.init();
        SyncUI.init();
        
        console.log('SnipMaster 3000 initialized successfully');
    } catch (error) {
        console.error('Error initializing application:', error);
    }
});

// Register the Service Worker
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful with scope:', 
                                registration.scope);
                })
                .catch(error => {
                    console.error('ServiceWorker registration failed:', error);
                });
        });
    } else {
        console.log('Service Workers not supported in this browser.');
    }
}

// Call the registration function
registerServiceWorker();