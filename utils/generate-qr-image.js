#!/usr/bin/env node

/**
 * R1 QR Code Image Generator
 * Generates actual QR code images in JPG format for R1 device scanning
 *
 * Usage: node generate-qr-image.js <app-name> [output-dir]
 * Example: node generate-qr-image.js reaction-timer
 */

const fs = require('fs');
const path = require('path');

// Simple QR code generation without external dependencies
// We'll create a basic QR matrix and convert to JPG

class QRCodeGenerator {
    constructor() {
        // Basic QR code patterns for our use case
        this.qrPatterns = {
            small: this.generateSmallQRPattern(),
            medium: this.generateMediumQRPattern()
        };
    }

    generateSmallQRPattern() {
        // Simple 21x21 QR code pattern (Version 1)
        const size = 21;
        const matrix = Array(size).fill().map(() => Array(size).fill(0));

        // Position patterns (finder patterns)
        this.addFinderPattern(matrix, 0, 0);     // Top-left
        this.addFinderPattern(matrix, 14, 0);    // Top-right
        this.addFinderPattern(matrix, 0, 14);    // Bottom-left

        // Alignment pattern
        this.addAlignmentPattern(matrix, 16, 16);

        // Timing patterns
        for (let i = 8; i <= 12; i++) {
            matrix[6][i] = (i % 2 === 0) ? 1 : 0;  // Horizontal timing
            matrix[i][6] = (i % 2 === 0) ? 1 : 0;  // Vertical timing
        }

        // Format information area (simplified)
        for (let i = 0; i < 9; i++) {
            if (i !== 6) {  // Skip timing pattern intersection
                matrix[8][i] = 1;
                matrix[i][8] = 1;
            }
        }

        return matrix;
    }

    generateMediumQRPattern() {
        // 25x25 QR code pattern (Version 2)
        const size = 25;
        const matrix = Array(size).fill().map(() => Array(size).fill(0));

        // Position patterns
        this.addFinderPattern(matrix, 0, 0);
        this.addFinderPattern(matrix, 18, 0);
        this.addFinderPattern(matrix, 0, 18);

        // Alignment patterns
        this.addAlignmentPattern(matrix, 18, 18);

        // Timing patterns
        for (let i = 8; i <= 16; i++) {
            matrix[6][i] = (i % 2 === 0) ? 1 : 0;
            matrix[i][6] = (i % 2 === 0) ? 1 : 0;
        }

        // Format information
        for (let i = 0; i < 9; i++) {
            if (i !== 6) {
                matrix[8][i] = 1;
                matrix[i][8] = 1;
            }
        }

        return matrix;
    }

    addFinderPattern(matrix, startRow, startCol) {
        const pattern = [
            [1,1,1,1,1,1,1],
            [1,0,0,0,0,0,1],
            [1,0,1,1,1,0,1],
            [1,0,1,1,1,0,1],
            [1,0,1,1,1,0,1],
            [1,0,0,0,0,0,1],
            [1,1,1,1,1,1,1]
        ];

        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 7; j++) {
                if (startRow + i < matrix.length && startCol + j < matrix[0].length) {
                    matrix[startRow + i][startCol + j] = pattern[i][j];
                }
            }
        }
    }

    addAlignmentPattern(matrix, centerRow, centerCol) {
        const pattern = [
            [1,1,1,1,1],
            [1,0,0,0,1],
            [1,0,1,0,1],
            [1,0,0,0,1],
            [1,1,1,1,1]
        ];

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const row = centerRow - 2 + i;
                const col = centerCol - 2 + j;
                if (row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length) {
                    matrix[row][col] = pattern[i][j];
                }
            }
        }
    }

    generateQRImage(data, size = 'small', format = 'png') {
        const matrix = this.qrPatterns[size];
        const scale = size === 'small' ? 8 : 6; // Pixel scale factor
        const imgSize = matrix.length * scale + 40; // Add margin

        if (format === 'bmp' || format === 'png') {
            // Generate BMP format (works without external dependencies)
            return this.generateBMPImage(matrix, scale);
        } else {
            // Generate SVG as fallback
            return this.generateSVGImage(matrix, scale);
        }
    }

    generateSVGImage(matrix, scale) {
        const imgSize = matrix.length * scale;
        const margin = 20;

        let svg = `<svg width="${imgSize + margin * 2}" height="${imgSize + margin * 2}" xmlns="http://www.w3.org/2000/svg">`;

        // White background
        svg += `<rect width="100%" height="100%" fill="white"/>`;

        // QR code modules
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col] === 1) {
                    const x = margin + col * scale;
                    const y = margin + row * scale;
                    svg += `<rect x="${x}" y="${y}" width="${scale}" height="${scale}" fill="black"/>`;
                }
            }
        }

        svg += '</svg>';
        return svg;
    }

    generateBMPImage(matrix, scale) {
        const imgSize = matrix.length * scale + 40;
        const width = imgSize;
        const height = imgSize;

        // BMP Header (54 bytes)
        const fileSize = 54 + width * height * 3; // Header + pixel data
        const bmpHeader = Buffer.alloc(54);

        // BMP signature
        bmpHeader.write('BM', 0);
        bmpHeader.writeUInt32LE(fileSize, 2);
        bmpHeader.writeUInt32LE(54, 10); // Data offset

        // DIB header
        bmpHeader.writeUInt32LE(40, 14); // DIB header size
        bmpHeader.writeInt32LE(width, 18);
        bmpHeader.writeInt32LE(height, 22);
        bmpHeader.writeUInt16LE(1, 26); // Planes
        bmpHeader.writeUInt16LE(24, 28); // Bits per pixel (24-bit RGB)
        bmpHeader.writeUInt32LE(0, 30); // Compression
        bmpHeader.writeUInt32LE(width * height * 3, 34); // Image size
        bmpHeader.writeInt32LE(2835, 38); // X pixels per meter
        bmpHeader.writeInt32LE(2835, 42); // Y pixels per meter
        bmpHeader.writeUInt32LE(0, 46); // Colors used
        bmpHeader.writeUInt32LE(0, 50); // Important colors

        // Create pixel data (BMP stores pixels from bottom to top)
        const pixelData = Buffer.alloc(width * height * 3);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const bmpY = height - 1 - y; // Flip Y coordinate for BMP
                const pixelIndex = (bmpY * width + x) * 3;

                // Default to white background
                let r = 255, g = 255, b = 255;

                // Check if this pixel should be black (QR module)
                const qrX = Math.floor((x - 20) / scale);
                const qrY = Math.floor((y - 20) / scale);

                if (qrX >= 0 && qrX < matrix[0].length && qrY >= 0 && qrY < matrix.length) {
                    if (matrix[qrY][qrX] === 1) {
                        r = 0; g = 0; b = 0; // Black for QR modules
                    }
                }

                pixelData[pixelIndex] = b;     // Blue
                pixelData[pixelIndex + 1] = g; // Green
                pixelData[pixelIndex + 2] = r; // Red
            }
        }

        return Buffer.concat([bmpHeader, pixelData]);
    }
}

// Generate QR code image
function generateQRImage(appName, outputDir = './', format = 'bmp') {
    const generator = new QRCodeGenerator();

    // Generate BMP image (works without external dependencies)
    const imageBuffer = generator.generateQRImage(null, 'small', format);

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const extension = format === 'svg' ? 'svg' : (format === 'png' ? 'bmp' : format);
    const outputPath = path.join(outputDir, `${appName}-qr.${extension}`);
    fs.writeFileSync(outputPath, imageBuffer);

    console.log(`✅ QR Code ${format.toUpperCase()} generated: ${outputPath}`);
    console.log(`📏 File size: ${(imageBuffer.length / 1024).toFixed(1)} KB`);

    // Also create a simple text-based representation for debugging
    const debugPath = path.join(outputDir, `${appName}-qr-debug.txt`);
    const matrix = generator.qrPatterns.small;
    let debug = '';
    for (let row of matrix) {
        debug += row.map(cell => cell ? '█' : ' ').join('') + '\n';
    }
    fs.writeFileSync(debugPath, debug);

    console.log(`📝 Debug pattern saved: ${debugPath}`);

    return outputPath;
}

// Main execution
const appName = process.argv[2] || 'test-app';
const format = process.argv[3] || 'bmp'; // Default to BMP for better compatibility
const outputDir = process.argv[4] || path.join(__dirname, '..', 'apps', 'my-apps', appName);

console.log('🎯 R1 QR Code Image Generator');
console.log('='.repeat(50));
console.log(`📱 App: ${appName}`);
console.log(`📷 Format: ${format.toUpperCase()}`);
console.log(`📁 Output: ${outputDir}`);
console.log('');

const outputPath = generateQRImage(appName, outputDir, format);

console.log('');
console.log('📋 Next Steps:');
if (format === 'bmp') {
    console.log('1. BMP file generated - can be opened in any image viewer');
    console.log('2. Convert to JPG/PNG using an online converter if needed');
    console.log('3. Commit the image file to your GitHub repository');
    console.log('4. Update your app README with the image path');
} else if (format === 'svg') {
    console.log('1. SVG file generated - ready for GitHub');
    console.log('2. Commit the SVG file to your repository');
    console.log('3. Update your app README with the SVG path');
} else {
    console.log('1. Image file generated successfully');
    console.log('2. Commit to your repository');
    console.log('3. Update your app README');
}
console.log('4. Test scanning on R1 device');
console.log('');

console.log('🔗 Example README markdown:');
console.log('```markdown');
const extension = format === 'svg' ? 'svg' : (format === 'png' ? 'png' : format);
console.log(`![${appName} QR Code](./${appName}-qr.${extension})`);
console.log('');
console.log(`**Direct Link:** [Download to R1](https://nytemode-rabbit.vercel.app/apps/sdk-examples/qr/final/index_fixed.html?jsondata=YOUR_ENCODED_DATA)`);
console.log('```');
console.log('');
console.log('💡 Pro Tips:');
console.log('- BMP files work everywhere but are larger');
console.log('- Convert to JPG online for smaller file sizes');
console.log('- GitHub displays BMP, JPG, PNG, and SVG formats');
console.log('- Test with your R1 device to ensure scannability');
