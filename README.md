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
   cd qr/final
   ```

2. **Serve the application:**
   ```bash
   python -m http.server 8001
   ```

3. **Access the generator:**
   Open `http://localhost:8001` in your browser.

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
├── plugin-demo/           # Main demonstration application
│   ├── index.html        # SPA with navigation
│   ├── css/styles.css    # Responsive styles (240x282px optimized)
│   ├── js/
│   │   ├── app.js       # Main application logic
│   │   ├── hardware.js  # Hardware integration
│   │   ├── data.js      # LLM communication
│   │   └── speak.js     # Text-to-speech
│   └── reference/
│       └── creation-triggers.md  # SDK documentation
├── qr/                   # QR code generation tool
│   └── final/           # Production-ready application
│       ├── index_fixed.html
│       ├── css/styles.css
│       └── js/app.js
├── LICENSE               # MIT license
└── README.md            # This file
```

### Design Constraints
- **Screen Size**: Fixed 240×282px viewport
- **Performance**: Hardware-accelerated CSS, minimal DOM manipulation
- **Touch Targets**: Minimum 44px for accessibility
- **Battery**: Efficient sensor polling and resource management

### Best Practices
1. **Use CSS Transforms**: Leverage `transform` and `opacity` for animations
2. **Minimize DOM Updates**: Batch DOM operations and use CSS classes
3. **Optimize Images**: Compress assets and use appropriate formats
4. **Handle Errors**: Implement proper error handling for hardware APIs
5. **Test on Device**: Validate on actual R1 hardware for best results

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

**Built for the R1 ecosystem by rabbit opensource** 🐰
