#!/usr/bin/env node

/**
 * R1 QR Code Generator Utility
 * Generates QR codes in the correct format for R1 device app downloads
 *
 * Usage: node generate-qr.js <app-name> [app-description] [theme-color]
 * Example: node generate-qr.js "My Awesome App" "This is my first R1 app!" "#FF6B35"
 */

const fs = require('fs');
const path = require('path');

// Get command line arguments
const appName = process.argv[2] || 'R1 App';
const appDescription = process.argv[3] || 'A custom R1 creation';
const themeColor = process.argv[4] || '#FE5000';

// Generate app path (convert spaces to kebab-case)
const appPath = appName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

// Create the JSON data for R1 QR generator
const appData = {
    title: appName,
    url: `https://nytemode-rabbit.vercel.app/apps/my-apps/${appPath}/`,
    description: appDescription,
    iconUrl: `https://raw.githubusercontent.com/NYTEMODEONLY/nytemode-rabbit/main/apps/my-apps/${appPath}/icon.png`,
    themeColor: themeColor
};

// Convert to URL-safe base64
const jsonString = JSON.stringify(appData);
const encodedData = btoa(jsonString).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

// Generate QR generator URL
const qrGeneratorUrl = `https://nytemode-rabbit.vercel.app/apps/sdk-examples/qr/final/index_fixed.html?jsondata=${encodedData}`;

console.log('='.repeat(60));
console.log('🎯 R1 APP QR CODE GENERATOR');
console.log('='.repeat(60));
console.log(`📱 App: ${appName}`);
console.log(`🎨 Theme: ${themeColor}`);
console.log('');

console.log('📋 JSON Data:');
console.log(JSON.stringify(appData, null, 2));
console.log('');

console.log('🔗 QR Generator URL:');
console.log(qrGeneratorUrl);
console.log('');

console.log('📄 Markdown for README:');
console.log('```markdown');
console.log('## 📥 Download to R1 Device');
console.log('');
console.log('Scan this QR code with your R1 device to download and install the app:');
console.log('');
console.log(`![${appName} QR Code](${qrGeneratorUrl})`);
console.log('');
console.log(`**Direct Link:** [Download to R1](${qrGeneratorUrl})`);
console.log('```');
console.log('');

console.log('💡 Next Steps:');
console.log(`1. Create your app in: apps/my-apps/${appPath}/`);
console.log('2. Add the QR code section above to your README.md');
console.log('3. Create an icon.png file for your app');
console.log('4. Test the QR code with your R1 device');
console.log('='.repeat(60));

// Optional: Save to a file for reference
const outputFile = path.join(__dirname, '..', 'apps', 'my-apps', `${appPath}-qr-data.json`);
const outputData = {
    appName,
    appPath,
    qrData: appData,
    qrUrl: qrGeneratorUrl,
    generatedAt: new Date().toISOString()
};

try {
    fs.writeFileSync(outputFile, JSON.stringify(outputData, null, 2));
    console.log(`💾 QR data saved to: ${outputFile}`);
} catch (error) {
    console.log('⚠️  Could not save QR data file (this is optional)');
}
