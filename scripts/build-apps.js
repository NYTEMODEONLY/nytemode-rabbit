#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building all R1 apps for Vercel deployment...\n');

// Clean and create public directory
if (fs.existsSync('public')) {
  fs.rmSync('public', { recursive: true, force: true });
}
fs.mkdirSync('public', { recursive: true });

// Create a simple index page for the root
const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>R1 Creations Hub</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #000;
            color: #fff;
        }
        .app-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 40px;
        }
        .app-card {
            background: #111;
            border: 1px solid #333;
            border-radius: 8px;
            padding: 20px;
            text-decoration: none;
            color: #fff;
            transition: all 0.2s;
        }
        .app-card:hover {
            border-color: #666;
            transform: translateY(-2px);
        }
        .app-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 8px;
        }
        .app-desc {
            color: #ccc;
            font-size: 14px;
        }
        h1 {
            text-align: center;
            color: #4CAF50;
        }
    </style>
</head>
<body>
    <h1>R1 Creations Hub</h1>
    <p style="text-align: center; color: #ccc;">Your collection of Rabbit R1 apps</p>

    <div class="app-grid">
        <a href="/apps/reaction-timer" class="app-card">
            <div class="app-title">Reaction Timer</div>
            <div class="app-desc">Test your reflexes with this precision timing game</div>
        </a>

        <a href="/apps/r1-reaction-timer-game" class="app-card">
            <div class="app-title">R1 Reaction Timer Game</div>
            <div class="app-desc">Advanced reaction timer built for R1 hardware</div>
        </a>

        <a href="/apps/plugin-demo" class="app-card">
            <div class="app-title">Plugin Demo</div>
            <div class="app-desc">Demonstration of R1 plugin capabilities</div>
        </a>

        <a href="/apps/qr-demo" class="app-card">
            <div class="app-title">QR Demo</div>
            <div class="app-desc">QR code functionality showcase</div>
        </a>
    </div>
</body>
</html>
`;

fs.writeFileSync('public/index.html', indexHtml);

console.log('📄 Created root index page');

// Build each app
const apps = [
  {
    name: 'reaction-timer',
    path: 'apps/my-apps/reaction-timer',
    type: 'static'
  },
  {
    name: 'r1-reaction-timer-game',
    path: 'apps/my-apps/examples/r1-reaction-timer-game/apps/app',
    type: 'vite'
  },
  {
    name: 'plugin-demo',
    path: 'apps/sdk-examples/plugin-demo',
    type: 'static'
  },
  {
    name: 'qr-demo',
    path: 'apps/sdk-examples/qr/final',
    type: 'static'
  }
];

apps.forEach(app => {
  try {
    console.log(`\n🔨 Building ${app.name}...`);

    const outputDir = `public/apps/${app.name}`;
    fs.mkdirSync(outputDir, { recursive: true });

    if (app.type === 'vite') {
      // For Vite apps, run build and copy dist contents
      const fullPath = path.resolve(app.path);
      execSync(`cd "${fullPath}" && npm install`, { stdio: 'inherit' });
      execSync(`cd "${fullPath}" && npm run build`, { stdio: 'inherit' });
      execSync(`cp -r "${fullPath}/dist/"* "${outputDir}/"`);
    } else {
      // For static apps, copy all files
      const fullPath = path.resolve(app.path);
      execSync(`cp -r "${fullPath}"/* "${outputDir}/"`);
    }

    console.log(`✅ ${app.name} built successfully`);
  } catch (error) {
    console.error(`❌ Failed to build ${app.name}:`, error.message);
  }
});

console.log('\n🎉 All apps built! Ready for Vercel deployment.');
console.log('🚀 Vercel will automatically deploy when you push to GitHub');
