---
title: Getting Started
description: Start building your first Rabbit R1 app in minutes
---

# Getting Started with R1 App Development

Welcome to the Rabbit R1 Creations SDK! This guide will help you build your first app for the R1 device in just a few minutes.

## 🚀 Quick Start

### 1. Set Up Your Development Environment

```bash
# Clone the SDK repository
git clone https://github.com/nytemode/r1-creations-sdk.git
cd r1-creations-sdk

# Install dependencies
npm install

# Start development server
npm run dev
```

Your documentation site will be available at `http://localhost:3000`

### 2. Create Your First App

```bash
# Copy a template
cp -r apps/templates/simple-app apps/my-apps/my-first-app
cd apps/my-apps/my-first-app

# Edit your app
# - index.html: Structure
# - css/styles.css: Styling
# - js/app.js: Logic
```

### 3. Test Your App

```bash
# Open in browser for testing
python -m http.server 8000
# Visit http://localhost:8000

# Use keyboard fallbacks:
# Spacebar = PTT button
# Arrow keys = Scroll wheel
```

### 4. Generate QR Code for R1

```bash
# Generate QR code for R1 installation
node utils/generate-r1-qr.js "my-first-app" png

# This creates my-first-app-r1-qr.png
```

### 5. Deploy to Vercel

```bash
# Build all apps
npm run build

# Deploy
npx vercel --prod
```

## 📱 R1 Device Basics

### Screen Specifications
- **Resolution**: 240 × 282 pixels
- **Aspect Ratio**: ~0.85:1
- **Display**: LCD with good contrast

### Input Methods
- **PTT Button**: Primary interaction (sideClick event)
- **Scroll Wheel**: Up/down navigation (scrollUp/scrollDown events)
- **Long Press**: Extended button press (longPressStart/longPressEnd)

### Development Considerations
- Use viewport units (vw/vh) for responsive design
- Minimum touch targets: 44px
- Optimize for small screen real estate
- Test with keyboard fallbacks during development

## 🛠️ Development Workflow

1. **Develop**: Use browser dev tools with keyboard simulation
2. **Test**: Deploy to Vercel for device testing
3. **Generate QR**: Create installation codes
4. **Install**: Scan QR with R1 device
5. **Iterate**: Make improvements based on device testing

## 📚 Key Resources

- [Building R1 Apps Guide](/docs/building-r1-apps) - Complete technical guide
- [Hardware Integration](/docs/hardware) - R1-specific APIs
- [App Templates](/docs/templates) - Starting points for new apps
- [Deployment Guide](/docs/deployment) - Publishing your apps

## 🎯 Next Steps

- [Browse the App Gallery](/apps) to see working examples
- [Read the API Documentation](/docs) for detailed references
- [Join the Community](/community) to share your apps and get help

## 💡 Pro Tips

- **Start Simple**: Begin with basic interactions before adding complexity
- **Test Frequently**: Use the live apps on Vercel to test on actual R1 hardware
- **Follow Patterns**: Study existing apps for proven R1 development patterns
- **Use Fallbacks**: Always implement keyboard alternatives for development
- **Optimize Performance**: R1 has limited resources - keep apps lightweight
