# Building Working R1 Apps - Complete Guide

**Based on reverse engineering successful Rabbit Intern apps**

This guide contains verified patterns and techniques discovered by analyzing working R1 applications that successfully scan and run on Rabbit R1 devices.

## 🔍 Key Discoveries

### **QR Code Format - BREAKTHROUGH**

After analyzing working Rabbit Intern apps, we discovered the **exact QR code format** that R1 devices expect:

**❌ What Doesn't Work:**
```
QR Code contains: https://example.com/qr-handler?data=eyJ0aXRsZSI6...
Result: "not a valid creation code" error
```

**✅ What Actually Works:**
```json
QR Code contains: {"title":"Quick Tap R1","url":"https://hollow-brown-otter.intern.rabbitos.app/apps/app/dist/index.html","description":"Test your reflexes with precision timing game","iconUrl":"https://hollow-brown-otter.intern.rabbitos.app/apps/app/dist/icon.png","themeColor":"0xFF4CDD7A"}
Result: Successfully scans and installs on R1
```

## 🏗️ App Architecture Patterns

### **1. Modern Build System**

Working apps use **Vite** for production builds:

```json
{
  "name": "app",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

**Vite Config:**
```javascript
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  }
})
```

### **2. State Machine Pattern**

```javascript
const GameStates = {
  READY: 'ready',
  WAITING: 'waiting', 
  ACTIVE: 'active',
  RESULT: 'result',
  PENALTY: 'penalty'
};

let gameState = {
  current: GameStates.READY,
  // ... other state
};

function setState(newState) {
  clearAllTimeouts();
  
  const app = document.getElementById('app');
  const prevState = gameState.current;
  gameState.current = newState;
  
  // Update CSS classes for visual states
  app.classList.remove(`state-${prevState}`);
  app.classList.add(`state-${newState}`);
  
  updateUI();
}
```

### **3. Comprehensive Hardware Integration**

```javascript
// PTT Button
window.addEventListener('sideClick', () => {
  handleReaction();
});

// Scroll Wheel
window.addEventListener('scrollUp', () => {
  console.log('Scroll up detected');
});

window.addEventListener('scrollDown', () => {
  console.log('Scroll down detected');
});

// Long Press Support
window.addEventListener('longPressStart', () => {
  console.log('Long press started');
});

window.addEventListener('longPressEnd', () => {
  console.log('Long press ended');
  // Optional: Reset functionality
});
```

### **4. Development Fallbacks**

```javascript
// Detect R1 vs Browser
const isR1Device = typeof PluginMessageHandler !== 'undefined';

// Add keyboard fallbacks for development
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
}
```

## 🎨 UI/UX Best Practices

### **1. Viewport-Based Responsive Design**

```css
html, body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-size: 4vw; /* Scales with viewport */
}

.game-title {
  font-size: 6vw;
}

.timer {
  font-size: 12vw; /* ~48px equivalent */
}

.status-text {
  font-size: 5vw;
}
```

### **2. Color-Coded App States**

```css
/* Full-screen background changes for clear state indication */
.state-ready {
  background: #000 !important;
}

.state-waiting {
  background: #8B0000 !important; /* Dark Red */
  animation: pulse-red 1s ease-in-out infinite;
}

.state-active {
  background: #006400 !important; /* Dark Green */
  animation: flash-green 0.2s ease-in-out;
}

.state-penalty {
  background: #FF4500 !important; /* Orange-Red */
}
```

### **3. Hardware-Accelerated Animations**

```css
#app {
  transition: background-color 0.1s ease;
  will-change: background-color; /* GPU acceleration hint */
}

@keyframes pulse-red {
  0%, 100% { background: #8B0000; }
  50% { background: #A52A2A; }
}

@keyframes flash-green {
  0% { background: #8B0000; }
  100% { background: #006400; }
}
```

### **4. Proper HTML Structure**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=240, height=282, user-scalable=no, initial-scale=1.0">
    <title>R1 App Name</title>
</head>
<body>
    <div id="app">
        <header class="game-header">
            <h1 class="game-title">R1 App Name</h1>
        </header>
        
        <main class="game-container">
            <!-- App content -->
        </main>
    </div>
</body>
</html>
```

## 💾 Storage Implementation

### **Proper R1 Storage Usage**

```javascript
const STORAGE_KEY = 'r1_app_data';

async function loadData() {
  try {
    if (window.creationStorage) {
      const stored = await window.creationStorage.plain.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(atob(stored));
      }
    } else {
      // Fallback for browser testing
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    }
  } catch (e) {
    console.error('Error loading data:', e);
  }
  return null;
}

async function saveData(data) {
  try {
    if (window.creationStorage) {
      const encoded = btoa(JSON.stringify(data));
      await window.creationStorage.plain.setItem(STORAGE_KEY, encoded);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  } catch (e) {
    console.error('Error saving data:', e);
  }
}
```

## 📱 QR Code Generation

### **Correct QR Code Format**

Use our verified generator:

```bash
node utils/generate-r1-qr.js "app-name" png
```

This generates QR codes with **direct JSON manifest encoding**:

```json
{
  "title": "App Name",
  "url": "https://your-domain.com/apps/app/dist/index.html",
  "description": "App description", 
  "iconUrl": "https://your-domain.com/apps/app/dist/icon.png",
  "themeColor": "#FFD700"
}
```

### **Critical Requirements:**
1. **Direct JSON**: No URL wrapping or base64 encoding
2. **Accessible URLs**: All URLs must be publicly accessible
3. **PNG Icons**: Icon files must be PNG format
4. **Hex Colors**: Use standard hex color format `#FFFFFF`

## 🚀 Deployment Checklist

### **Before Publishing:**

1. **✅ Build for Production**
   ```bash
   npm run build
   # Ensure dist/ folder is generated
   ```

2. **✅ Test QR Code Format**
   ```bash
   node utils/generate-r1-qr.js "your-app" png
   zbarimg --quiet --raw your-app-r1-qr.png
   # Should output clean JSON (no URLs or base64)
   ```

3. **✅ Verify All URLs**
   - App URL loads correctly
   - Icon URL returns PNG file
   - No 404 errors

4. **✅ Test on R1 Device**
   - QR code scans successfully
   - App installs and runs
   - All hardware interactions work

5. **✅ Validate HTML**
   - Proper viewport meta tag
   - No console errors
   - Responsive design works

## 🔧 Troubleshooting

### **"Not a valid creation code" Error**
- **Cause**: QR code contains URL instead of direct JSON
- **Fix**: Use `generate-r1-qr.js` with direct JSON encoding

### **App Won't Load**
- **Check**: All URLs in manifest are accessible
- **Check**: CORS headers allow R1 device access
- **Check**: HTTPS (if required by hosting platform)

### **Hardware Events Not Working**
- **Check**: Proper event listeners for R1 events
- **Check**: Fallback keyboard controls for testing
- **Check**: Event handler function exists and is bound

### **Storage Not Persisting**
- **Check**: Using `window.creationStorage` API correctly
- **Check**: Base64 encoding for stored data
- **Check**: Proper error handling for storage operations

## 📚 Example Project Structure

```
your-r1-app/
├── src/
│   ├── main.js           # Main game logic
│   ├── style.css         # Responsive styles
│   └── lib/              # Optional: helper modules
├── dist/                 # Built files (generated)
│   ├── index.html
│   ├── assets/
│   └── icon.png
├── index.html            # Development HTML
├── package.json          # Vite build config
├── vite.config.js        # Vite configuration
└── your-app-r1-qr.png    # Generated QR code
```

## 🎯 Success Metrics

A working R1 app should:
- ✅ Generate QR codes that scan without "not a valid creation code" errors
- ✅ Load instantly on R1 device after QR scan
- ✅ Respond to all R1 hardware inputs (PTT, scroll, long press)
- ✅ Use full-screen visual feedback for state changes
- ✅ Persist data between sessions using R1 storage APIs
- ✅ Provide smooth, hardware-accelerated animations
- ✅ Scale properly on R1's 240×282px display

---

**This guide is based on reverse engineering successful Rabbit Intern applications that are verified working on R1 devices. Follow these patterns for the highest chance of success.**
