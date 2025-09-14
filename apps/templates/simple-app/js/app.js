// Simple R1 App Template
document.addEventListener('DOMContentLoaded', function() {
    const testBtn = document.getElementById('testBtn');
    const output = document.getElementById('output');

    // Check if running as R1 plugin
    if (typeof PluginMessageHandler !== 'undefined') {
        console.log('Running as R1 Creation');
        output.textContent = '✅ Connected to R1 SDK';
    } else {
        console.log('Running in browser mode');
        output.textContent = '🌐 Running in browser - limited functionality';
    }

    // Test button functionality
    testBtn.addEventListener('click', function() {
        const timestamp = new Date().toLocaleTimeString();
        output.textContent = `Button clicked at ${timestamp}`;

        // Example: Send message to LLM (only works on R1)
        if (typeof PluginMessageHandler !== 'undefined') {
            PluginMessageHandler.postMessage(JSON.stringify({
                message: "Hello from my R1 app!",
                useLLM: true
            }));
        }
    });

    // Hardware event listeners (only work on R1)
    if (typeof window !== 'undefined') {
        // Scroll wheel events
        window.addEventListener('scrollUp', () => {
            output.textContent = '⬆️ Scroll Up detected';
        });

        window.addEventListener('scrollDown', () => {
            output.textContent = '⬇️ Scroll Down detected';
        });

        // PTT button events
        window.addEventListener('sideClick', () => {
            output.textContent = '🔘 PTT Button pressed';
        });
    }

    // Plugin message handler
    window.onPluginMessage = function(data) {
        console.log('Received message:', data);
        if (data.message) {
            output.textContent = `🤖 LLM Response: ${data.message}`;
        }
    };
});
