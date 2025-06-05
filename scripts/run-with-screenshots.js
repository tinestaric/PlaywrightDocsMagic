const { execSync } = require('child_process');
const { createScreenshotsFolder } = require('./create-screenshots-folder');
const path = require('path');

const testFile = process.argv[2];
if (!testFile) {
  console.error('❌ Please provide a test file (e.g. tests/example.spec.ts)');
  process.exit(1);
}

const testName = path.basename(testFile).replace(/\.spec\.ts$/, '');
console.log(`📸 Running test with screenshots: ${testName}`);

// Create screenshots folder
createScreenshotsFolder(testName);

// Run the test
console.log(`▶️ Running test: ${testFile} with screenshot capture...`);
execSync(`npx playwright test ${testFile} --headed`, { stdio: 'inherit' });

console.log(`✅ Test completed. Screenshots saved to screenshots/${testName}/`);
