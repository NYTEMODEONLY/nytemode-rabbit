# Apps Directory

This directory contains all R1 applications organized by category.

## Directory Structure

```
apps/
├── sdk-examples/        # Official SDK examples and demos
│   ├── plugin-demo/     # Complete hardware integration demo
│   └── qr/             # QR code generator tool
├── my-apps/            # Your custom R1 applications
│   └── [your-app-name]/
└── templates/          # App templates for quick starts
    ├── simple-app/     # Basic R1 app template
    └── advanced-app/   # Advanced app template (coming soon)
```

## Getting Started

### Creating Your First App

1. **Choose a template:**
   ```bash
   cd apps/templates
   ls -la  # See available templates
   ```

2. **Create your app:**
   ```bash
   # Copy a template to your apps directory
   cp -r simple-app ../my-apps/my-first-app
   cd ../my-apps/my-first-app
   ```

3. **Start developing:**
   ```bash
   # Serve locally for testing
   python -m http.server 8000
   # Open http://localhost:8000 in your browser
   ```

4. **Customize your app:**
   - Edit `index.html` for structure
   - Modify `css/styles.css` for appearance
   - Update `js/app.js` for functionality

### Running on R1 Device

Once your app is ready:

1. **Package your app** in a zip file
2. **Upload** to your R1 device
3. **Test hardware integration** on the actual device

## Development Guidelines

### R1 Constraints
- **Screen Size**: Fixed 240×282px viewport
- **Performance**: Hardware-accelerated CSS only
- **Touch Targets**: Minimum 44px for accessibility
- **Battery**: Minimize continuous operations

### Best Practices
- Test on both browser and R1 device
- Handle hardware events gracefully
- Use responsive design principles
- Keep bundle size minimal
- Document your app's features

### SDK Integration
- Use `PluginMessageHandler` for LLM communication
- Implement hardware event listeners
- Leverage storage APIs for persistence
- Handle both plugin and browser environments

## App Categories

### SDK Examples
- `plugin-demo`: Comprehensive SDK demonstration
- `qr`: Professional QR code generation tool

### Your Apps
Place all your custom applications in the `my-apps/` directory. Each app should be in its own subdirectory with a clear, descriptive name.

## Contributing

When you're ready to share your app:
1. Ensure it follows R1 development guidelines
2. Test thoroughly on R1 hardware
3. Document the app's features and usage
4. Consider open-sourcing useful apps

## Support

- Check the main repository README for SDK documentation
- Review the SDK examples for implementation patterns
- Test hardware features on actual R1 device
- Join the community for help and feedback
