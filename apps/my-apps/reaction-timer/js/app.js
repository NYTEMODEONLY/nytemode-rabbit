// R1 Reaction Timer App
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const startBtn = document.getElementById('startBtn');
    const statusDiv = document.getElementById('status');
    const timerDiv = document.getElementById('timer');
    const bestTimeDiv = document.getElementById('bestTime');
    const body = document.body;

    // Game state variables
    let gameState = 'ready'; // 'ready', 'waiting', 'ready', 'result'
    let startTime = 0;
    let reactionTime = 0;
    let bestTime = null;
    let timeoutId = null;

    // Load best time from storage if available
    loadBestTime();

    // Check if running as R1 plugin
    if (typeof PluginMessageHandler !== 'undefined') {
        console.log('Running as R1 Creation');
    } else {
        console.log('Running in browser mode');
    }

    // Start button functionality
    startBtn.addEventListener('click', startGame);

    // Hardware event listeners for R1
    if (typeof window !== 'undefined') {
        // PTT button events
        window.addEventListener('sideClick', handleReaction);

        // Also listen for spacebar in browser mode for testing
        if (typeof PluginMessageHandler === 'undefined') {
            document.addEventListener('keydown', function(e) {
                if (e.code === 'Space' && gameState === 'ready') {
                    e.preventDefault();
                    handleReaction();
                }
            });
        }
    }

    function startGame() {
        if (gameState !== 'ready') return;

        gameState = 'waiting';
        startBtn.disabled = true;
        startBtn.textContent = 'WAIT...';

        statusDiv.textContent = 'Wait for GREEN...';
        timerDiv.textContent = '---';
        body.className = 'waiting';

        // Random delay between 1-4 seconds
        const delay = 1000 + Math.random() * 3000;

        timeoutId = setTimeout(() => {
            if (gameState === 'waiting') {
                gameState = 'ready';
                statusDiv.textContent = 'GO! PRESS PTT!';
                body.className = 'ready';
                startTime = performance.now();

                // Auto-fail after 2 seconds if no reaction
                setTimeout(() => {
                    if (gameState === 'ready') {
                        endGame('Too slow!', null);
                    }
                }, 2000);
            }
        }, delay);
    }

    function handleReaction() {
        if (gameState === 'waiting') {
            // Pressed too early!
            clearTimeout(timeoutId);
            endGame('Too early! Wait for GREEN.', null);
            body.className = 'too-early';

            setTimeout(() => {
                resetGame();
            }, 1500);

        } else if (gameState === 'ready') {
            // Perfect timing!
            const endTime = performance.now();
            reactionTime = Math.round(endTime - startTime);

            endGame(`Great! ${reactionTime}ms`, reactionTime);

            // Save best time if this is a new record
            if (bestTime === null || reactionTime < bestTime) {
                bestTime = reactionTime;
                saveBestTime();
                bestTimeDiv.textContent = `Best: ${bestTime}ms`;
            }

            setTimeout(() => {
                resetGame();
            }, 2000);
        }
    }

    function endGame(message, time) {
        statusDiv.textContent = message;
        if (time !== null) {
            timerDiv.textContent = `${time}ms`;
            timerDiv.classList.add('reaction-result');
        }
        gameState = 'result';
    }

    function resetGame() {
        gameState = 'ready';
        startBtn.disabled = false;
        startBtn.textContent = 'START';
        statusDiv.textContent = 'Press START to begin';
        timerDiv.textContent = '0ms';
        timerDiv.classList.remove('reaction-result');
        body.className = '';
    }

    function saveBestTime() {
        if (typeof window.creationStorage !== 'undefined') {
            // Save to R1 storage
            window.creationStorage.plain.setItem('reaction-timer-best', btoa(bestTime.toString()))
                .catch(err => console.log('Could not save best time:', err));
        } else {
            // Save to localStorage for browser testing
            localStorage.setItem('reaction-timer-best', bestTime.toString());
        }
    }

    function loadBestTime() {
        if (typeof window.creationStorage !== 'undefined') {
            // Load from R1 storage
            window.creationStorage.plain.getItem('reaction-timer-best')
                .then(data => {
                    if (data) {
                        bestTime = parseInt(atob(data));
                        bestTimeDiv.textContent = `Best: ${bestTime}ms`;
                    }
                })
                .catch(err => console.log('Could not load best time:', err));
        } else {
            // Load from localStorage for browser testing
            const saved = localStorage.getItem('reaction-timer-best');
            if (saved) {
                bestTime = parseInt(saved);
                bestTimeDiv.textContent = `Best: ${bestTime}ms`;
            }
        }
    }

    // Plugin message handler (for potential future features)
    window.onPluginMessage = function(data) {
        console.log('Received message:', data);
    };

    // Add keyboard hint for browser testing
    if (typeof PluginMessageHandler === 'undefined') {
        const instructions = document.getElementById('instructions');
        instructions.textContent = 'Wait for screen to turn GREEN, then press SPACEBAR (or PTT on R1)!';
    }
});
