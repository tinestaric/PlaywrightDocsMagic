const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const testFile = process.argv[2];
if (!testFile) {
  console.error('❌ Please provide a test file (e.g. tests/example.spec.ts)');
  process.exit(1);
}

const testName = path.basename(testFile).replace(/\.spec\.ts$/, '');
console.log(`📝 Extracted test name: ${testName}`);

const outputDir = 'test-results';
const destinationDir = 'recordings';

if (!fs.existsSync(destinationDir)) {
  fs.mkdirSync(destinationDir);
}

console.log(`▶️ Running test: ${testFile} in headed mode...`);
execSync(`npx playwright test ${testFile} --headed`, { stdio: 'inherit' });

console.log('📦 Searching for video...');

// Construct the expected video path
const expectedVideoPath = path.join(outputDir, 'artifacts', `${testName}-test`, 'video.webm');
console.log(`Looking for video at: ${expectedVideoPath}`);

if (!fs.existsSync(expectedVideoPath)) {
  console.error('❌ No video found at expected location.');
  process.exit(1);
}

const newFileName = `${testName}-${Date.now()}.webm`;
fs.renameSync(expectedVideoPath, path.join(destinationDir, newFileName));
console.log(`✅ Video moved to ${destinationDir}/${newFileName}`);
