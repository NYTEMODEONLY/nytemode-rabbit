# R1 Creations SDK

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive development toolkit for creating interactive applications on the R1 device, featuring hardware integration, LLM capabilities, and specialized UI components optimized for the R1's unique form factor.

## 🌟 Overview

The R1 Creations SDK provides developers with the tools and documentation needed to build rich, interactive experiences for the R1 device. This repository includes:

- **Plugin Demo**: Complete demonstration of R1 hardware capabilities and SDK features
- **QR Generator**: Professional QR code generation tool with custom styling
- **SDK Documentation**: Comprehensive API reference and development guides
- **Example Code**: Production-ready implementations and best practices

## 📋 Table of Contents

- [Features](#features)
- [Components](#components)
- [Quick Start](#quick-start)
- [Hardware Integration](#hardware-integration)
- [SDK Reference](#sdk-reference)
- [Development](#development)
- [Building R1 Apps Guide](#building-r1-apps-guide)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🔧 Core Capabilities
- **Hardware Control**: Direct access to scroll wheel, PTT button, and accelerometer
- **LLM Integration**: Seamless communication with R1's AI assistant
- **Persistent Storage**: Secure and plain storage APIs with encryption support
- **Real-time Sensors**: High-frequency accelerometer data streaming
- **Touch Simulation**: Programmatic touch event generation

### 🎨 UI Framework
- **Responsive Design**: Optimized for R1's 240×282px display
- **Performance Optimized**: Hardware-accelerated CSS and minimal DOM operations
- **Touch-Friendly**: 44px minimum touch targets for accessibility
- **Dark Theme**: High-contrast design for small screens

### 🛠️ Development Tools
- **Live Demo**: Interactive testing environment for all SDK features
- **QR Generator**: Custom QR code creation with advanced styling
- **Documentation**: Complete API reference and implementation guides
- **Cross-Platform**: Web technologies with native hardware integration

## 🏗️ Components

### Plugin Demo (`/plugin-demo/`)
A comprehensive demonstration application showcasing all R1 SDK capabilities:

- **Hardware Page**: Real-time accelerometer display and button event handling
- **Data Page**: LLM integration with JSON parsing and dynamic theming
- **Speak Page**: Text-to-speech output through R1's speaker system
- **Navigation**: Hamburger menu with smooth page transitions

### QR Generator (`/qr/`)
Professional QR code generation tool featuring:

- **JSON Data Encoding**: Structured data storage in QR codes
- **Custom Styling**: Themed QR codes with configurable colors and icons
- **URL Sharing**: Shareable links with embedded data
- **Download Support**: PNG export with custom branding
- **Real-time Preview**: Live JSON preview and QR code generation

## 🚀 Quick Start

### Prerequisites
- Modern web browser with JavaScript enabled
- R1 device (for hardware integration testing)
- Basic understanding of HTML/CSS/JavaScript

### Running the Plugin Demo

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rabbit-opensource/creations-sdk.git
   cd creations-sdk
   ```

2. **Serve the plugin demo:**
   ```bash
   cd plugin-demo
   # Use any static file server
   python -m http.server 8000
   # or
   npx serve .
   ```

3. **Open in browser:**
   Navigate to `http://localhost:8000` to access the demo application.

### Running the QR Generator

1. **Navigate to QR directory:**
   ```bash
   cd apps/sdk-examples/qr/final
   ```

2. **Serve the application:**
   ```bash
   python -m http.server 8001
   ```

3. **Access the generator:**
   Open `http://localhost:8001` in your browser.

### Creating Your Own Apps

1. **Use a template:**
   ```bash
   # Copy the simple app template
   cp -r apps/templates/simple-app apps/my-apps/my-first-app
   cd apps/my-apps/my-first-app
   ```

2. **Customize your app:**
   - Edit `index.html` for structure
   - Modify `css/styles.css` for styling
   - Update `js/app.js` for functionality

3. **Test locally:**
   ```bash
   python -m http.server 8000
   # Open http://localhost:8000
   ```

4. **Generate QR Code for R1 download:**
   ```bash
   # ✅ VERIFIED WORKING - Based on successful Rabbit Intern apps
   node utils/generate-r1-qr.js "my-app-name" png

   # Alternative formats
   node utils/generate-r1-qr.js "my-app-name" svg
   ```

5. **Add QR code image to your app's README.md:**
   ```markdown
   ![My App Name QR Code](./my-app-name-qr.png)
   ```

6. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Add my first R1 app with QR code"
   git push
   ```

## 🔌 Hardware Integration

### Button Events
```javascript
// Scroll wheel navigation
window.addEventListener('scrollUp', () => {
    // Handle upward scroll
});

window.addEventListener('scrollDown', () => {
    // Handle downward scroll
});

// PTT (Push-to-Talk) button
window.addEventListener('sideClick', () => {
    // Handle single press
});

window.addEventListener('longPressStart', () => {
    // Handle long press start
});
```

### Accelerometer Access
```javascript
// Start accelerometer monitoring
window.creationSensors.accelerometer.start((data) => {
    console.log('Tilt data:', data);
    // data = { x: 0.1, y: -0.2, z: 0.98 }
}, { frequency: 60 });

// Stop monitoring
window.creationSensors.accelerometer.stop();
```

### LLM Communication
```javascript
// Send message to LLM
PluginMessageHandler.postMessage(JSON.stringify({
    message: "Tell me about cats",
    useLLM: true,
    wantsR1Response: true  // Speak through R1 speaker
}));

// Handle LLM response
window.onPluginMessage = function(data) {
    if (data.data) {
        const response = JSON.parse(data.data);
        // Process structured response
    }
};
```

## 📚 SDK Reference

### Core APIs

| API | Description | Usage |
|-----|-------------|-------|
| `PluginMessageHandler` | Send structured messages to server/LLM | `PluginMessageHandler.postMessage()` |
| `CreationStorageHandler` | Persistent data storage (plain/secure) | `window.creationStorage.plain/secure` |
| `AccelerometerHandler` | Real-time motion sensing | `window.creationSensors.accelerometer` |
| `TouchEventHandler` | Simulate touch interactions | `TouchEventHandler.postMessage()` |
| `closeWebView` | Close current application | `closeWebView.postMessage()` |

### Storage Options

```javascript
// Plain storage (unencrypted)
await window.creationStorage.plain.setItem('key', btoa('value'));
const value = atob(await window.creationStorage.plain.getItem('key'));

// Secure storage (hardware-encrypted)
await window.creationStorage.secure.setItem('secret', btoa('encrypted_value'));
const secret = atob(await window.creationStorage.secure.getItem('secret'));
```

## 💻 Development

### Project Structure
```
creations-sdk/
├── apps/                 # All R1 applications
│   ├── sdk-examples/     # Official SDK examples and demos
│   │   ├── plugin-demo/  # Complete hardware integration demo
│   │   └── qr/          # QR code generator tool
│   ├── my-apps/         # Your custom R1 applications
│   │   └── [your-app-name]/
│   └── templates/       # App templates for quick starts
│       ├── simple-app/  # Basic R1 app template
│       └── advanced-app/# Advanced app template
├── LICENSE              # MIT license
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

### Design Constraints
- **Screen Size**: Fixed 240×282px viewport
- **Performance**: Hardware-accelerated CSS, minimal DOM manipulation
- **Touch Targets**: Minimum 44px for accessibility
- **Battery**: Efficient sensor polling and resource management

### QR Code Generation for R1 Downloads

**🐰 CRITICAL UPDATE:** Based on analysis of working Rabbit Intern apps, we've discovered the **correct QR code format**:

```bash
# ✅ VERIFIED WORKING - Generates QR codes in the format R1 devices actually expect
node utils/generate-r1-qr.js "app-name" png

# Alternative formats
node utils/generate-r1-qr.js "app-name" svg
```

#### **BREAKTHROUGH DISCOVERY:**

**❌ Previous Approach (Causing "not a valid creation code" errors):**
- QR codes contained URLs pointing to intermediate web pages
- Complex base64 encoding and URL parameters
- Format: `https://example.com/qr-handler?data=base64encoded...`

**✅ Working Format (Verified with Rabbit Intern apps):**
- QR codes contain **JSON manifest data directly**
- No intermediate pages or complex encoding needed
- Format: `{"title":"App Name","url":"https://your-domain.com/app/","description":"...","iconUrl":"...","themeColor":"#FFFFFF"}`

#### **Key Insights from Working Apps:**
1. **Direct JSON Encoding**: QR codes must contain the app manifest as plain JSON
2. **Simple Structure**: No base64 encoding or URL wrapping required
3. **Theme Color Format**: Use hex colors like `#FFFFFF` or `0xFF4CDD7A`
4. **Direct App URLs**: Point directly to the built app's `index.html`
5. **Icon Requirements**: Must be accessible PNG files

**✅ VERIFIED:** This format has been tested with actual working Rabbit Intern-generated apps and successfully scans on R1 devices.

### Best Practices

**Based on analysis of working Rabbit Intern apps:**

#### **App Architecture**
1. **Use Modern Build Tools**: Consider Vite for production optimization and asset bundling
2. **State Machine Pattern**: Implement clear game/app states for better logic flow
3. **Modular Structure**: Separate concerns (UI, game logic, hardware handlers)
4. **Hardware-Accelerated CSS**: Use `transform`, `opacity`, and `will-change` for smooth animations

#### **UI/UX Design**
5. **Viewport Units**: Use `vw/vh` for truly responsive design on R1's fixed viewport
6. **Color-Coded States**: Use full-screen background colors to indicate app states
7. **Large Touch Targets**: Ensure interactive elements are easily tappable
8. **High Contrast**: Design for the R1's small screen with clear visual hierarchy

#### **Performance**
9. **Minimize DOM Updates**: Batch operations and use CSS classes for state changes
10. **Optimize Assets**: Compress images and use appropriate formats
11. **Efficient Polling**: Use proper cleanup for sensors and timeouts

#### **R1 Integration**
12. **Comprehensive Hardware Support**: Handle all R1 events (sideClick, scrollUp/Down, longPress)
13. **Fallback Controls**: Provide keyboard alternatives for development/testing
14. **Proper Storage**: Use R1's storage APIs with base64 encoding for persistence
15. **Error Handling**: Implement robust error handling for hardware APIs

#### **QR Code Generation**
16. **🐰 CRITICAL**: Always use `generate-r1-qr.js` with direct JSON manifest encoding
17. **Test on Device**: Validate QR codes scan successfully on actual R1 hardware
18. **Proper Hosting**: Ensure app URLs are accessible and serve correct MIME types

## 📖 Building R1 Apps Guide

For comprehensive guidance on building working R1 applications, see our detailed guide:

**[📚 BUILDING_R1_APPS.md](./BUILDING_R1_APPS.md)**

This guide includes:
- ✅ **Verified QR code formats** (reverse engineered from working apps)
- 🏗️ **App architecture patterns** (state machines, build systems)
- 🎨 **UI/UX best practices** (responsive design, hardware acceleration)
- 💾 **Storage implementation** (R1 APIs with proper encoding)
- 🚀 **Deployment checklist** (testing, validation, troubleshooting)
- 📱 **Working examples** (based on successful Rabbit Intern apps)

**🐰 CRITICAL:** This guide contains breakthrough discoveries about the correct QR code format that R1 devices actually expect, solving the "not a valid creation code" errors.

## 🤝 Contributing

We welcome contributions to improve the R1 Creations SDK!

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes following our coding standards
4. Test thoroughly on R1 hardware when possible
5. Submit a pull request with detailed description

### Development Guidelines
- **Code Style**: Follow existing patterns and use descriptive variable names
- **Documentation**: Update relevant documentation for any API changes
- **Testing**: Test on multiple browsers and R1 device configurations
- **Performance**: Ensure changes don't negatively impact performance
- **Compatibility**: Maintain backward compatibility with existing SDK features

### Reporting Issues
- Use GitHub Issues for bug reports and feature requests
- Include detailed reproduction steps and environment information
- Attach screenshots or logs when relevant
- Specify R1 device details and firmware version

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2025 rabbit opensource

## 🙋 Support

- **Documentation**: Check the `/plugin-demo/reference/` directory for detailed API documentation
- **Examples**: Explore the plugin-demo for working code examples
- **Community**: Join our community discussions for help and feedback

## 🔄 Recent Updates

- ✅ Complete plugin demo with hardware integration
- ✅ QR code generator with custom styling
- ✅ Comprehensive SDK documentation
- ✅ MIT license for open collaboration
- 🚧 Additional examples and templates (coming soon)

---

**Built by nytemode - https://nytemode.com**
