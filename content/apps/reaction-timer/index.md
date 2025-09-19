---
title: Reaction Timer
description: Test your reflexes with precision timing on the Rabbit R1
---

# Reaction Timer

A precision reaction time testing app for the Rabbit R1 device. Test your reflexes with millisecond accuracy and track your best times.

## 🎮 How to Play

1. **Ready**: Press the PTT button when you see the ready screen
2. **Wait**: Screen turns red - get ready but don't press yet!
3. **React**: When screen turns green, press PTT as fast as possible
4. **Results**: See your reaction time and compare with your best

## 🎯 Features

- **Millisecond Precision**: Accurate timing down to milliseconds
- **Best Time Tracking**: Persistent storage of your fastest reaction
- **Hardware Integration**: Optimized for R1 PTT button and scroll wheel
- **Visual Feedback**: Full-screen color changes for clear state indication
- **Cross-Platform**: Works on R1 and in browsers with keyboard fallbacks

## 🚀 Try It Live

[🎯 Play Reaction Timer](/reaction-timer/)

*Use Spacebar when testing in browser.*

## 📥 Download to R1

Scan this QR code with your R1 device to install:

![Reaction Timer R1 QR Code](/reaction-timer-r1-qr.png)

*Generated with our verified QR format for R1 compatibility.*

## 📁 Source Code

```bash
# Clone the repository
git clone https://github.com/nytemode/r1-creations-sdk.git
cd r1-creations-sdk/apps/my-apps/reaction-timer

# Files:
# index.html - Main HTML structure
# js/app.js - Game logic and R1 integration
# css/styles.css - R1-optimized responsive styles
```

## 🛠️ Technical Details

### Hardware Integration

```javascript
// PTT Button for reaction input
window.addEventListener('sideClick', () => {
  handleReaction();
});

// Keyboard fallback for development
if (!isR1Device) {
  window.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
      event.preventDefault();
      window.dispatchEvent(new CustomEvent('sideClick'));
    }
  });
}
```

### State Management

```javascript
const GameStates = {
  READY: 'ready',
  WAITING: 'waiting',
  ACTIVE: 'active',
  RESULT: 'result'
};

let gameState = {
  current: GameStates.READY,
  startTime: null,
  reactionTime: null,
  bestTime: null
};
```

### Storage API

```javascript
// Save best time using R1 storage
async function saveBestTime(time) {
  if (window.creationStorage) {
    const data = btoa(JSON.stringify({ bestTime: time }));
    await window.creationStorage.plain.setItem('reaction_timer_data', data);
  } else {
    localStorage.setItem('reaction_timer_data', JSON.stringify({ bestTime: time }));
  }
}
```

## 🎨 UI Design

- **Responsive**: Optimized for R1's 240×282px display
- **High Contrast**: Clear visual feedback with full-screen colors
- **Touch Optimized**: Large touch targets for R1's interface
- **Performance**: Hardware-accelerated CSS animations

## 🔧 Customization

The app is built with standard web technologies, making it easy to customize:

- Modify timing parameters
- Change color schemes
- Add sound effects
- Implement different game modes
- Add statistics tracking

## 📚 Related Documentation

- [Building R1 Apps Guide](/docs/building-r1-apps)
- [Hardware Integration](/docs/hardware)
- [QR Code Generation](/docs/qr-codes)
- [Deployment Guide](/docs/deployment)
