# Development Utilities

This directory contains utility scripts to help with R1 app development.

## QR Code Generators

Multiple utilities for generating QR codes in the correct format for R1 device app downloads.

### `generate-r1-qr.js` - 🐰 VERIFIED WORKING FORMAT ✅
**BREAKTHROUGH**: Based on reverse engineering successful Rabbit Intern apps, this generates QR codes in the **exact format** R1 devices expect!

**✅ VERIFIED WORKING**: Tested with actual working Rabbit Intern-generated apps that successfully scan on R1 devices.

#### Usage
```bash
# Generate PNG (recommended for R1 compatibility)
node utils/generate-r1-qr.js reaction-timer png

# Generate SVG
node utils/generate-r1-qr.js reaction-timer svg
```

#### **CRITICAL DISCOVERY:**
After analyzing working Rabbit Intern apps, we discovered the correct QR format:

- ❌ **Previous attempts**: QR codes contained URLs with base64 parameters → *"not a valid creation code"*
- ✅ **Working format**: QR codes contain **plain JSON manifest data directly**
- ✅ **No encoding needed**: Simple JSON structure, no base64 or URL wrapping
- ✅ **Direct app links**: URLs point directly to the app's built `index.html`

#### **Verified Working JSON Format:**
```json
{
  "title": "App Name",
  "url": "https://your-domain.com/apps/app/dist/index.html",
  "description": "App description",
  "iconUrl": "https://your-domain.com/apps/app/dist/icon.png",
  "themeColor": "#FFD700"
}
```

### `generate-qr-image.js` - Image Generation (Legacy)
Generates QR code image files with visual patterns.

**⚠️ DEPRECATED**: Use `generate-r1-qr.js` for actual R1 device compatibility.

### `generate-qr.js` - Data Generation (Legacy)
Generates QR code data and URLs for R1 app downloads.

**⚠️ DEPRECATED**: Use `generate-r1-qr.js` for actual R1 device compatibility.

### What it generates

#### Image Generation (`generate-qr-image.js`)

1. **BMP/SVG Image**: Actual scannable QR code image file
2. **File Size**: ~169KB (BMP) - easily convertible to smaller JPG
3. **Proper Encoding**: Real QR code with finder patterns, timing patterns, and data
4. **Debug File**: ASCII art representation for verification

#### Data Generation (`generate-qr.js`)

1. **JSON Data**: Properly formatted data for R1 QR scanner
2. **QR Generator URL**: Direct link to generate the QR code
3. **Markdown**: Ready-to-use section for your app's README.md
4. **Reference File**: Saves data to `apps/my-apps/[app-name]-qr-data.json`

### JSON Format

The utility generates JSON in this format:
```json
{
  "title": "App Name",
  "url": "https://nytemode-rabbit.vercel.app/apps/my-apps/app-name/",
  "description": "App description",
  "iconUrl": "https://raw.githubusercontent.com/.../icon.png",
  "themeColor": "#FFD700"
}
```

### Integration Steps

1. **Run the utility** to generate QR data
2. **Add the markdown section** to your app's README.md
3. **Create an icon.png** file for your app
4. **Test the QR code** with your R1 device
5. **Update the URL** if you're using a different hosting domain

### Manual QR Generation

If you prefer to generate QR codes manually:

1. Visit: `apps/sdk-examples/qr/final/index_fixed.html`
2. Fill in the JSON data manually
3. Generate and download the QR code
4. Add it to your app's README

### File Size Optimization

BMP files are ~169KB but can be easily converted to smaller JPG files:

1. Open the generated BMP file in any image editor
2. Export/Save as JPG with 80-90% quality
3. File size reduces to ~15-30KB while maintaining scannability
4. Update your README to reference the JPG file instead

### Customization

- **Theme Color**: Choose a color that matches your app's branding
- **Icon**: Create a 64x64px PNG icon for your app
- **Description**: Keep it under 200 characters for best results
- **URL**: Update if you're hosting elsewhere
- **Image Format**: BMP for compatibility, convert to JPG for smaller files

### Troubleshooting

- **QR not scanning**: Check that the URL is accessible and the QR code was generated with proper data encoding
- **Icon not loading**: Ensure icon.png is in the correct location and accessible
- **Wrong format**: Verify the JSON structure matches the expected format
- **Color issues**: Use valid hex color codes (#RRGGBB)
- **Broken QR display**: Use BMP format instead of SVG for better GitHub compatibility
- **Large file size**: Convert BMP to JPG using any image editor (80-90% quality recommended)
- **QR not reading data**: Ensure you're using `generate-qr-image.js` which creates proper QR codes with data encoding
