# R1 Reaction Timer ⚡

A simple and fun reaction time testing game for the R1 device.

## 📥 Download to R1 Device

Scan this QR code with your R1 device to download and install the app:

![Reaction Timer QR Code](./reaction-timer-r1-qr.png)

**✅ VERIFIED WORKING:** This QR code uses the correct format that R1 devices actually expect - direct JSON manifest encoding (no intermediate web pages).

## How to Play

1. **Press START** to begin the game
2. **Wait** for the screen to turn from RED to GREEN
3. **React quickly** - Press the PTT button as soon as the screen turns GREEN
4. **See your reaction time** displayed in milliseconds
5. **Beat your best time** and try to improve!

## Features

- **Precise Timing**: Measures reaction time in milliseconds
- **Visual Feedback**: Screen changes colors to guide the game
- **Best Time Tracking**: Saves your personal best score
- **Anti-Cheat**: Detects if you press too early
- **Cross-Platform**: Works on R1 device and in browsers

## Game States

- **Ready**: Press START to begin
- **Waiting**: Screen is RED - don't press yet!
- **Ready**: Screen is GREEN - PRESS NOW!
- **Result**: Shows your reaction time

## Controls

- **R1 Device**: Use the PTT (Push-to-Talk) button
- **Browser**: Press the SPACEBAR for testing

## Tips

- Stay focused and relaxed
- Don't anticipate - wait for the green screen
- Practice regularly to improve your reaction time
- Average human reaction time is around 200-250ms

## Technical Details

- Built for R1's 240×282px display
- Uses high-precision timing with `performance.now()`
- Saves best times to persistent storage
- Hardware-accelerated CSS for smooth animations
