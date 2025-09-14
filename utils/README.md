# Development Utilities

This directory contains utility scripts to help with R1 app development.

## QR Code Generator (`generate-qr.js`)

Generates QR codes in the correct format for R1 device app downloads.

### Usage

```bash
# Basic usage
node utils/generate-qr.js "My App Name"

# With description and custom color
node utils/generate-qr.js "Reaction Timer" "Test your reaction speed!" "#FFD700"

# Full example
node utils/generate-qr.js "Weather App" "Real-time weather for R1" "#87CEEB"
```

### What it generates

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

### Customization

- **Theme Color**: Choose a color that matches your app's branding
- **Icon**: Create a 64x64px PNG icon for your app
- **Description**: Keep it under 200 characters for best results
- **URL**: Update if you're hosting elsewhere

### Troubleshooting

- **QR not scanning**: Check that the URL is accessible
- **Icon not loading**: Ensure icon.png is in the correct location
- **Wrong format**: Verify the JSON structure matches the expected format
- **Color issues**: Use valid hex color codes (#RRGGBB)
