// R1 Reaction Timer - Complete Game Implementation
// Optimized for 240×282px R1 device

// Game state machine
const GameStates = {
  READY: 'ready',
  WAITING: 'waiting', 
  ACTIVE: 'active',
  RESULT: 'result',
  PENALTY: 'penalty'
};

// Game configuration
const CONFIG = {
  MIN_DELAY: 1000,    // 1 second minimum
  MAX_DELAY: 4000,    // 4 seconds maximum
  REACTION_TIMEOUT: 2000,  // 2 second reaction window
  PENALTY_DURATION: 1500,  // 1.5 second penalty display
  RESULT_DURATION: 3000    // 3 second result display
};

// Game state
let gameState = {
  current: GameStates.READY,
  startTime: 0,
  reactionTime: 0,
  bestTime: null,
  waitingTimeout: null,
  reactionTimeout: null,
  resultTimeout: null,
  penaltyTimeout: null
};

// DOM elements
let elements = {};

// Storage key
const STORAGE_KEY = 'r1_reaction_timer_best';

// Check if running as R1 plugin
const isR1Device = typeof PluginMessageHandler !== 'undefined';

console.log(isR1Device ? 'Running as R1 Creation' : 'Running in browser mode');

// ===========================================
// Game State Management
// ===========================================

function setState(newState) {
  // Clear any existing timeouts
  clearAllTimeouts();
  
  const app = document.getElementById('app');
  const prevState = gameState.current;
  gameState.current = newState;
  
  // Remove previous state class
  app.classList.remove(`state-${prevState}`);
  
  // Add new state class
  app.classList.add(`state-${newState}`);
  
  // Update UI based on state
  updateUI();
  
  console.log(`State changed: ${prevState} → ${newState}`);
}

function clearAllTimeouts() {
  if (gameState.waitingTimeout) {
    clearTimeout(gameState.waitingTimeout);
    gameState.waitingTimeout = null;
  }
  if (gameState.reactionTimeout) {
    clearTimeout(gameState.reactionTimeout);
    gameState.reactionTimeout = null;
  }
  if (gameState.resultTimeout) {
    clearTimeout(gameState.resultTimeout);
    gameState.resultTimeout = null;
  }
  if (gameState.penaltyTimeout) {
    clearTimeout(gameState.penaltyTimeout);
    gameState.penaltyTimeout = null;
  }
}

function updateUI() {
  const statusText = elements.statusText;
  const timer = elements.timer;
  
  switch (gameState.current) {
    case GameStates.READY:
      statusText.textContent = 'Press PTT to Start';
      timer.textContent = '0.000s';
      timer.classList.remove('highlight');
      break;
      
    case GameStates.WAITING:
      statusText.textContent = 'Wait for Green...';
      timer.textContent = 'WAIT';
      timer.classList.remove('highlight');
      break;
      
    case GameStates.ACTIVE:
      statusText.textContent = 'REACT NOW!';
      timer.textContent = 'GO!';
      timer.classList.add('highlight');
      break;
      
    case GameStates.PENALTY:
      statusText.textContent = 'Too Early!';
      timer.textContent = 'PENALTY';
      timer.classList.remove('highlight');
      break;
      
    case GameStates.RESULT:
      statusText.textContent = 'Your Time:';
      timer.textContent = formatTime(gameState.reactionTime);
      timer.classList.add('highlight');
      
      // Check if it's a new best time
      if (!gameState.bestTime || gameState.reactionTime < gameState.bestTime) {
        gameState.bestTime = gameState.reactionTime;
        saveBestTime();
        updateBestTimeDisplay();
        statusText.textContent = 'NEW BEST!';
      }
      break;
  }
}

function formatTime(ms) {
  return (ms / 1000).toFixed(3) + 's';
}

// ===========================================
// Game Logic
// ===========================================

function startGame() {
  if (gameState.current !== GameStates.READY && gameState.current !== GameStates.RESULT) {
    return;
  }
  
  setState(GameStates.WAITING);
  
  // Random delay between 1-4 seconds
  const delay = CONFIG.MIN_DELAY + Math.random() * (CONFIG.MAX_DELAY - CONFIG.MIN_DELAY);
  
  gameState.waitingTimeout = setTimeout(() => {
    // Transition to active state
    setState(GameStates.ACTIVE);
    gameState.startTime = performance.now();
    
    // Set reaction timeout
    gameState.reactionTimeout = setTimeout(() => {
      // Player didn't react in time
      handleTimeout();
    }, CONFIG.REACTION_TIMEOUT);
    
  }, delay);
}

function handleReaction() {
  const currentTime = performance.now();
  
  switch (gameState.current) {
    case GameStates.READY:
    case GameStates.RESULT:
      // Start new game
      startGame();
      break;
      
    case GameStates.WAITING:
      // Too early - penalty
      handleEarlyReaction();
      break;
      
    case GameStates.ACTIVE:
      // Valid reaction - calculate time
      gameState.reactionTime = currentTime - gameState.startTime;
      setState(GameStates.RESULT);
      
      // Auto return to ready after showing result
      gameState.resultTimeout = setTimeout(() => {
        setState(GameStates.READY);
      }, CONFIG.RESULT_DURATION);
      break;
      
    case GameStates.PENALTY:
      // Ignore input during penalty
      break;
  }
}

function handleEarlyReaction() {
  setState(GameStates.PENALTY);
  
  gameState.penaltyTimeout = setTimeout(() => {
    setState(GameStates.READY);
  }, CONFIG.PENALTY_DURATION);
}

function handleTimeout() {
  // Player didn't react in time
  elements.statusText.textContent = 'Too Slow!';
  elements.timer.textContent = 'TIMEOUT';
  
  gameState.resultTimeout = setTimeout(() => {
    setState(GameStates.READY);
  }, CONFIG.RESULT_DURATION);
}

// ===========================================
// Persistent Storage
// ===========================================

async function loadBestTime() {
  try {
    if (window.creationStorage) {
      const stored = await window.creationStorage.plain.getItem(STORAGE_KEY);
      if (stored) {
        gameState.bestTime = JSON.parse(atob(stored));
      }
    } else {
      // Fallback to localStorage for browser testing
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        gameState.bestTime = JSON.parse(stored);
      }
    }
  } catch (e) {
    console.error('Error loading best time:', e);
  }
  
  updateBestTimeDisplay();
}

async function saveBestTime() {
  try {
    if (window.creationStorage) {
      const encoded = btoa(JSON.stringify(gameState.bestTime));
      await window.creationStorage.plain.setItem(STORAGE_KEY, encoded);
    } else {
      // Fallback to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState.bestTime));
    }
    console.log('Best time saved:', gameState.bestTime);
  } catch (e) {
    console.error('Error saving best time:', e);
  }
}

function updateBestTimeDisplay() {
  const bestTimeElement = elements.bestTime;
  if (gameState.bestTime) {
    bestTimeElement.textContent = formatTime(gameState.bestTime);
  } else {
    bestTimeElement.textContent = '---.---s';
  }
}

// ===========================================
// Hardware Event Handlers
// ===========================================

// Handle R1 side button (PTT) events
window.addEventListener('sideClick', () => {
  console.log('Side button clicked');
  handleReaction();
});

// Handle R1 scroll wheel events (optional - could be used for menu navigation)
window.addEventListener('scrollUp', () => {
  console.log('Scroll up detected');
});

window.addEventListener('scrollDown', () => {
  console.log('Scroll down detected');
});

// Handle long press events (optional - could reset best time)
window.addEventListener('longPressStart', () => {
  console.log('Long press started');
});

window.addEventListener('longPressEnd', () => {
  console.log('Long press ended');
  // Optional: Reset best time on long press
  // resetBestTime();
});

// ===========================================
// Plugin Message Handling (if needed)
// ===========================================

window.onPluginMessage = function(data) {
  console.log('Received plugin message:', data);
  // Handle any incoming messages if needed
};

// ===========================================
// Utility Functions
// ===========================================

function resetBestTime() {
  gameState.bestTime = null;
  saveBestTime();
  updateBestTimeDisplay();
  console.log('Best time reset');
}

// ===========================================
// Initialization
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('R1 Reaction Timer initialized!');
  
  // Cache DOM elements
  elements = {
    statusText: document.getElementById('status-text'),
    timer: document.getElementById('timer'),
    bestTime: document.getElementById('best-time')
  };
  
  // Verify all elements exist
  for (const [key, element] of Object.entries(elements)) {
    if (!element) {
      console.error(`Required element not found: ${key}`);
      return;
    }
  }
  
  // Load best time from storage
  loadBestTime();
  
  // Set initial state
  setState(GameStates.READY);
  
  // Add keyboard fallback for development (Space = side button)
  if (!isR1Device) {
    window.addEventListener('keydown', (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
        window.dispatchEvent(new CustomEvent('sideClick'));
      }
      
      // Debug keys
      if (event.code === 'KeyR' && event.ctrlKey) {
        event.preventDefault();
        resetBestTime();
      }
    });
    
    console.log('Development mode: Space = PTT button, Ctrl+R = Reset best time');
  }
  
  console.log('Game ready! Press PTT button to start.');
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  clearAllTimeouts();
});

// Export for debugging (browser only)
if (!isR1Device) {
  window.reactionTimer = {
    gameState,
    setState,
    resetBestTime,
    GameStates
  };
}