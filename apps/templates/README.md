# R1 App Templates

This directory contains templates to help you quickly start building R1 creations.

## Available Templates

### Simple App (`simple-app/`)
A minimal R1 application with:
- Basic HTML structure optimized for 240×282px
- Essential CSS with R1-optimized styling
- JavaScript with SDK integration examples
- Hardware button event handlers
- LLM communication example

**To use:**
```bash
# Copy the template to your apps directory
cp -r simple-app ../../my-apps/my-first-app
cd ../../my-apps/my-first-app

# Start developing!
# Serve with: python -m http.server 8000
```

### Advanced App (`advanced-app/`)
Coming soon! A more complex template with:
- Modular JavaScript architecture
- Asset management
- Advanced hardware integration
- Multiple page navigation
- Storage management

## Getting Started

1. **Choose a template** based on your needs
2. **Copy it** to your `apps/my-apps/` directory
3. **Customize** the files for your specific app
4. **Test locally** using a web server
5. **Deploy to R1** when ready

## Template Features

### ✅ R1 Optimized
- 240×282px viewport constraints
- Touch-friendly button sizes (44px minimum)
- Hardware-accelerated CSS animations
- Battery-efficient coding practices

### ✅ SDK Integration
- PluginMessageHandler setup
- Hardware event listeners
- Storage API examples
- LLM communication patterns

### ✅ Development Ready
- Modern JavaScript (ES6+)
- Clean CSS architecture
- Responsive design principles
- Error handling examples

## Best Practices

- Keep your app under 240×282px
- Test hardware events on actual R1 device
- Use hardware-accelerated CSS properties
- Minimize DOM manipulations
- Handle both R1 and browser environments
- Consider battery impact of continuous operations
