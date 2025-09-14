// Generate QR Code for R1 Reaction Timer App
// This creates the JSON data that can be used with the R1 QR generator

const appData = {
    title: "R1 Reaction Timer",
    url: "https://nytemode-rabbit.vercel.app/apps/my-apps/reaction-timer/",
    description: "Test your reaction speed! Press PTT button as soon as screen turns green. Features millisecond precision timing and best time tracking.",
    iconUrl: "https://raw.githubusercontent.com/NYTEMODEONLY/nytemode-rabbit/main/apps/my-apps/reaction-timer/icon.png",
    themeColor: "#FFD700"
};

// Convert to JSON and URL-safe base64 for QR generator
const jsonString = JSON.stringify(appData);
const encodedData = btoa(jsonString).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

// Generate QR generator URL
const qrGeneratorUrl = `https://nytemode-rabbit.vercel.app/apps/sdk-examples/qr/final/index_fixed.html?jsondata=${encodedData}`;

console.log('=== R1 REACTION TIMER QR CODE DATA ===');
console.log('JSON Data:', JSON.stringify(appData, null, 2));
console.log('\nQR Generator URL:');
console.log(qrGeneratorUrl);
console.log('\nDirect JSON for manual entry:');
console.log(jsonString);
