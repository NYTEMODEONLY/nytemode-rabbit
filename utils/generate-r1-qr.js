#!/usr/bin/env node

/**
 * Rabbit R1 QR Code Generator - CORRECT FORMAT
 * Generates QR codes in the proper format that R1 devices expect
 *
 * Usage: node generate-r1-qr.js <app-name> [format] [output-dir]
 * Example: node generate-r1-qr.js reaction-timer png
 */

const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Generate proper R1 app manifest data
function generateR1Manifest(appName) {
    const title = appName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const appPath = appName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    // This is the EXACT format that R1 devices expect (verified from working Rabbit Intern apps)
    const manifest = {
        title: title,
        url: `https://nyterabbit.vercel.app/apps/${appPath}/`,
        description: `${title} - Test your reaction speed! Press PTT button as soon as screen turns green. Features millisecond precision timing and best time tracking.`,
        iconUrl: `https://nyterabbit.vercel.app/apps/${appPath}/icon.png`,
        themeColor: "#FFD700"
    };

    return manifest;
}

// Generate QR code containing the JSON manifest directly (not a URL)
async function generateR1QRCode(appName, outputDir = './', format = 'png') {
    try {
        const manifest = generateR1Manifest(appName);

        // Create output directory if it doesn't exist
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(outputDir, `${appName}-r1-qr.${format}`);

        // Convert manifest to JSON string - this is what goes in the QR code
        const manifestJson = JSON.stringify(manifest);

        // QR Code options optimized for R1 device scanning
        const qrOptions = {
            errorCorrectionLevel: 'M', // Medium error correction for reliability
            type: format === 'svg' ? 'svg' : 'image/png',
            quality: 0.95, // High quality for better scanning
            margin: 3, // Adequate margin for R1 camera
            color: {
                dark: '#000000', // Black modules
                light: '#FFFFFF' // White background
            },
            width: 256 // Good size for R1 scanning
        };

        // Generate QR code with the JSON manifest data directly encoded
        if (format === 'svg') {
            const svgString = await QRCode.toString(manifestJson, { ...qrOptions, type: 'svg' });
            fs.writeFileSync(outputPath, svgString);
        } else if (format === 'png' || format === 'jpg' || format === 'jpeg') {
            await QRCode.toFile(outputPath, manifestJson, qrOptions);
        } else {
            throw new Error(`Unsupported format: ${format}. Use png, jpg, or svg.`);
        }

        // Get file size
        const stats = fs.statSync(outputPath);
        const fileSizeKB = (stats.size / 1024).toFixed(1);

        console.log(`✅ R1 QR Code generated: ${outputPath}`);
        console.log(`📏 File size: ${fileSizeKB} KB`);
        console.log(`📱 Encoded data: ${manifestJson.substring(0, 100)}...`);

        // Generate a reference file with the manifest data
        const manifestPath = path.join(outputDir, `${appName}-r1-manifest.json`);
        const referenceData = {
            appName,
            manifest,
            qrData: manifestJson,
            generatedAt: new Date().toISOString(),
            format,
            filePath: outputPath
        };
        fs.writeFileSync(manifestPath, JSON.stringify(referenceData, null, 2));

        console.log(`📋 Manifest saved: ${manifestPath}`);

        return outputPath;

    } catch (error) {
        console.error('❌ Error generating R1 QR code:', error.message);
        process.exit(1);
    }
}

// Main execution
async function main() {
    const appName = process.argv[2] || 'reaction-timer';
    const format = process.argv[3] || 'png'; // PNG recommended for R1 compatibility
    const outputDir = process.argv[4] || path.join(__dirname, '..', 'apps', 'my-apps', appName);

    console.log('🐰 Rabbit R1 QR Code Generator');
    console.log('='.repeat(50));
    console.log(`📱 App: ${appName}`);
    console.log(`📷 Format: ${format.toUpperCase()}`);
    console.log(`📁 Output: ${outputDir}`);
    console.log('');

    const manifest = generateR1Manifest(appName);
    console.log('📋 R1 Manifest Data:');
    console.log(JSON.stringify(manifest, null, 2));
    console.log('');

    const outputPath = await generateR1QRCode(appName, outputDir, format);

    console.log('');
    console.log('🎯 Next Steps:');
    console.log('1. ✅ QR code generated with proper R1 format');
    console.log('2. Test scanning with your R1 device');
    console.log('3. If it works, update your app README');
    console.log('4. Share the working QR code with the community');
    console.log('');

    console.log('🔧 What was fixed:');
    console.log('- QR code now contains JSON manifest data directly');
    console.log('- No longer points to a web page URL');
    console.log('- Uses proper error correction for R1 scanning');
    console.log('- Optimized size and margin for R1 camera');
    console.log('');

    console.log('📝 README Markdown:');
    console.log('```markdown');
    console.log('## 📥 Download to R1 Device');
    console.log('');
    console.log('Scan this QR code with your R1 device to download and install the app:');
    console.log('');
    console.log(`![${appName} R1 QR Code](./${appName}-r1-qr.${format})`);
    console.log('');
    console.log('**Important:** This QR code contains the app manifest data directly and is compatible with R1 devices.');
    console.log('```');
    console.log('');

    console.log('💡 R1 Compatibility Tips:');
    console.log('- Ensure good lighting when scanning');
    console.log('- Hold the device steady about 6-8 inches from the QR code');
    console.log('- Make sure the entire QR code is visible in the R1 camera');
    console.log('- PNG format provides the best scanning reliability');
}

// Run the generator
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { generateR1QRCode, generateR1Manifest };

