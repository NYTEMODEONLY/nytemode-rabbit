#!/usr/bin/env node

/**
 * R1 QR Code Generator - REAL SCANNABLE QR CODES
 * Uses the qrcode library to generate proper QR codes that actually work
 *
 * Usage: node generate-real-qr.js <app-name> [format] [output-dir]
 * Example: node generate-real-qr.js reaction-timer png
 */

const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Generate app data JSON for QR encoding
function generateAppDataJSON(appName) {
    const title = appName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const appData = {
        title: title,
        url: `https://nytemode-rabbit.vercel.app/apps/my-apps/${appName}/`,
        description: `${title} - Test your reaction speed! Press PTT button as soon as screen turns green. Features millisecond precision timing and best time tracking.`,
        iconUrl: `https://raw.githubusercontent.com/NYTEMODEONLY/nytemode-rabbit/main/apps/my-apps/${appName}/icon.png`,
        themeColor: "#FFD700"
    };

    return Buffer.from(JSON.stringify(appData)).toString('base64');
}

// Generate QR code image
async function generateQRImage(appName, outputDir = './', format = 'png') {
    try {
        // Generate the QR data URL for the app
        const encodedData = generateAppDataJSON(appName);
        const qrDataUrl = `https://nytemode-rabbit.vercel.app/apps/sdk-examples/qr/final/index_fixed.html?jsondata=${encodedData}`;

        // Create output directory if it doesn't exist
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(outputDir, `${appName}-qr.${format}`);

        // QR Code options for better scanning
        const qrOptions = {
            errorCorrectionLevel: 'M',
            type: format === 'svg' ? 'svg' : 'image/png',
            quality: 0.92,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            },
            width: 300  // Good size for scanning
        };

        if (format === 'svg') {
            // Generate SVG
            const svgString = await QRCode.toString(qrDataUrl, { ...qrOptions, type: 'svg' });
            fs.writeFileSync(outputPath, svgString);
        } else if (format === 'png' || format === 'jpg' || format === 'jpeg') {
            // Generate PNG/JPG
            await QRCode.toFile(outputPath, qrDataUrl, qrOptions);
        } else {
            throw new Error(`Unsupported format: ${format}. Use png, jpg, or svg.`);
        }

        // Get file size
        const stats = fs.statSync(outputPath);
        const fileSizeKB = (stats.size / 1024).toFixed(1);

        console.log(`✅ REAL QR Code ${format.toUpperCase()} generated: ${outputPath}`);
        console.log(`📏 File size: ${fileSizeKB} KB`);
        console.log(`🔗 QR Code encodes: ${qrDataUrl}`);

        // Generate a text file with the encoded data for reference
        const dataPath = path.join(outputDir, `${appName}-qr-data.txt`);
        const dataContent = `QR Code Data for ${appName}
=================================

Encoded URL: ${qrDataUrl}

Decoded JSON Data:
${JSON.stringify(JSON.parse(Buffer.from(encodedData, 'base64').toString()), null, 2)}

Generated: ${new Date().toISOString()}
Format: ${format.toUpperCase()}
File: ${outputPath}
`;
        fs.writeFileSync(dataPath, dataContent);

        console.log(`📝 Data reference saved: ${dataPath}`);

        return outputPath;

    } catch (error) {
        console.error('❌ Error generating QR code:', error.message);
        process.exit(1);
    }
}

// Main execution
async function main() {
    const appName = process.argv[2] || 'test-app';
    const format = process.argv[3] || 'png'; // Default to PNG for best compatibility
    const outputDir = process.argv[4] || path.join(__dirname, '..', 'apps', 'my-apps', appName);

    console.log('🎯 R1 REAL QR Code Generator');
    console.log('='.repeat(50));
    console.log(`📱 App: ${appName}`);
    console.log(`📷 Format: ${format.toUpperCase()}`);
    console.log(`📁 Output: ${outputDir}`);
    console.log('');

    const outputPath = await generateQRImage(appName, outputDir, format);

    console.log('');
    console.log('📋 Next Steps:');
    console.log('1. ✅ REAL QR code generated - fully scannable!');
    console.log('2. Test with any QR code scanner app');
    console.log('3. Commit the image file to your GitHub repository');
    console.log('4. Update your app README with the image path');
    console.log('5. Test scanning on R1 device');
    console.log('');

    console.log('🔗 Example README markdown:');
    console.log('```markdown');
    console.log(`![${appName} QR Code](./${appName}-qr.${format})`);
    console.log('');
    console.log(`**Direct Link:** [Download to R1](https://nytemode-rabbit.vercel.app/apps/sdk-examples/qr/final/index_fixed.html?jsondata=${generateAppDataJSON(appName)})`);
    console.log('```');
    console.log('');
    console.log('💡 Pro Tips:');
    console.log('- PNG format recommended for best compatibility');
    console.log('- QR codes are properly encoded and scannable');
    console.log('- File sizes: PNG ~3-8KB, SVG ~2-4KB');
    console.log('- Test with your phone\'s camera or QR app first');
}

// Run the generator
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { generateQRImage, generateAppDataJSON };
