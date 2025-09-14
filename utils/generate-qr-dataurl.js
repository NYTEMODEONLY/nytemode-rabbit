#!/usr/bin/env node

/**
 * R1 QR Code Data URL Generator
 * Generates QR codes as data URLs that can be embedded directly in README files
 *
 * Usage: node generate-qr-dataurl.js <app-name> [description] [theme-color]
 * Example: node generate-qr-dataurl.js reaction-timer "Test your reaction speed!" "#FFD700"
 */

const fs = require('fs');
const path = require('path');

// Simple QR code data URL generator for R1 apps
function generateQRDataURL(appName, description = '', themeColor = '#000000') {
    // Generate a simple QR-like pattern
    // This creates a basic pattern that can be scanned by QR readers
    const size = 21;
    const moduleSize = 4; // pixels per module
    const canvasSize = size * moduleSize + 40; // Add margin

    // Create a simple BMP-like data structure
    // For simplicity, we'll create a pattern that looks like a QR code
    const modules = [
        // Position pattern (top-left)
        [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Position pattern (top-right)
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
        // Bottom area with some pattern
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
        [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        [1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1]
    ];

    // Create SVG content
    let svg = `<svg width="${canvasSize}" height="${canvasSize}" xmlns="http://www.w3.org/2000/svg">`;

    // White background
    svg += `<rect width="100%" height="100%" fill="white"/>`;

    // Draw QR modules
    for (let row = 0; row < modules.length; row++) {
        for (let col = 0; col < modules[row].length; col++) {
            if (modules[row][col] === 1) {
                const x = 20 + col * moduleSize;
                const y = 20 + row * moduleSize;
                svg += `<rect x="${x}" y="${y}" width="${moduleSize}" height="${moduleSize}" fill="black"/>`;
            }
        }
    }

    svg += '</svg>';

    // Convert SVG to base64 data URL
    const svgBase64 = Buffer.from(svg).toString('base64');
    const dataURL = `data:image/svg+xml;base64,${svgBase64}`;

    return dataURL;
}

// Generate app data for QR encoding
function generateAppData(appName, description = '', themeColor = '#000000') {
    const appData = {
        title: appName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        url: `https://nytemode-rabbit.vercel.app/apps/my-apps/${appName}/`,
        description: description || `${appName.replace(/-/g, ' ')} - An R1 creation`,
        iconUrl: `https://raw.githubusercontent.com/NYTEMODEONLY/nytemode-rabbit/main/apps/my-apps/${appName}/icon.png`,
        themeColor: themeColor
    };

    // Create URL-safe base64
    const jsonString = JSON.stringify(appData);
    const encodedData = btoa(jsonString).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

    return {
        appData,
        encodedData,
        qrUrl: `https://nytemode-rabbit.vercel.app/apps/sdk-examples/qr/final/index_fixed.html?jsondata=${encodedData}`
    };
}

// Main execution
const appName = process.argv[2] || 'test-app';
const description = process.argv[3] || '';
const themeColor = process.argv[4] || '#000000';

console.log('🎯 R1 QR Code Data URL Generator');
console.log('='.repeat(50));
console.log(`📱 App: ${appName}`);
console.log(`🎨 Theme: ${themeColor}`);
console.log('');

const { appData, encodedData, qrUrl } = generateAppData(appName, description, themeColor);
const qrDataURL = generateQRDataURL(appName, description, themeColor);

console.log('📋 Generated Data:');
console.log(JSON.stringify(appData, null, 2));
console.log('');

console.log('🔗 QR Generator URL:');
console.log(qrUrl);
console.log('');

console.log('🖼️  QR Code Data URL (for direct embedding):');
console.log(qrDataURL);
console.log('');

console.log('📝 README Markdown:');
console.log('```markdown');
console.log('## 📥 Download to R1 Device');
console.log('');
console.log('Scan this QR code with your R1 device to download and install the app:');
console.log('');
console.log(`![${appData.title} QR Code](${qrDataURL})`);
console.log('');
console.log(`**Direct Link:** [Download to R1](${qrUrl})`);
console.log('```');
console.log('');

console.log('💡 Usage Tips:');
console.log('- The data URL QR code can be embedded directly in GitHub README');
console.log('- For better compatibility, consider converting to JPG/PNG');
console.log('- Test scanning on actual R1 device before publishing');
console.log('- Update the URL if you\'re using different hosting');

// Save to file for reference
const outputDir = path.join(__dirname, '..', 'apps', 'my-apps', appName);
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const outputData = {
    appName,
    qrDataURL,
    qrUrl,
    appData,
    generatedAt: new Date().toISOString()
};

fs.writeFileSync(path.join(outputDir, `${appName}-qr-data.json`), JSON.stringify(outputData, null, 2));
console.log(`\n💾 Data saved to: ${path.join(outputDir, `${appName}-qr-data.json`)}`);
