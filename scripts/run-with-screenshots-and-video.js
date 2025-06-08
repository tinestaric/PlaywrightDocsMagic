const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { createScreenshotsFolder } = require('./create-screenshots-folder');

const testFile = process.argv[2];
if (!testFile) {
  console.error('❌ Please provide a test file (e.g. tests/example.spec.ts)');
  process.exit(1);
}

const testName = path.basename(testFile, '.spec.ts');
console.log(`📸🎥 Running test with screenshots and video: ${testName}`);

// Create necessary directories
const outputDir = 'test-results';
const videosDir = 'recordings';
const screenshotsDir = 'screenshots';

if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir);
}

// Create screenshots folder for this test
createScreenshotsFolder(testName);

console.log(`▶️ Running test: ${testFile} in headed mode with recording...`);
try {
  execSync(`npx playwright test ${testFile} --headed`, { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Test execution failed, but attempting to archive artifacts...');
}

// Archive video
console.log('📦 Searching for video...');
const expectedVideoPath = path.join(outputDir, 'artifacts', `${testName}-test`, 'video.webm');
console.log(`Looking for video at: ${expectedVideoPath}`);

if (fs.existsSync(expectedVideoPath)) {
  const videoFileName = `${testName}.webm`;
  const videoDestination = path.join(videosDir, videoFileName);
  if (fs.existsSync(videoDestination)) {
    fs.unlinkSync(videoDestination); // Remove existing file
  }
  fs.renameSync(expectedVideoPath, videoDestination);
  console.log(`✅ Video moved to ${videoDestination}`);
} else {
  console.log('⚠️ No video found at expected location.');
}

// Report on screenshots
const testScreenshotsDir = path.join(screenshotsDir, testName);
if (fs.existsSync(testScreenshotsDir)) {
  const screenshots = fs.readdirSync(testScreenshotsDir);
  console.log(`✅ ${screenshots.length} screenshots saved to ${testScreenshotsDir}/`);
  screenshots.forEach(screenshot => {
    console.log(`   📸 ${screenshot}`);
  });
} else {
  console.log('⚠️ No screenshots directory found.');
}

console.log(`🎉 Test completed! Check ${videosDir}/ for video and ${screenshotsDir}/${testName}/ for screenshots.`);
