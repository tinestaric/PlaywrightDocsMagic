const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const testFile = process.argv[2];

if (!testFile) {
  console.error('❌ Usage: node scripts/update-docs.js <test-file>');
  console.error('   Example: node scripts/update-docs.js tests/CreateOrder-Enhanced.spec.ts');
  process.exit(1);
}

const testName = path.basename(testFile).replace(/\.spec\.ts$/, '');
console.log(`📚 Updating documentation artifacts for: ${testName}`);

const outputDir = 'test-results';
const videosDir = 'docs/videos';
const screenshotsDir = 'screenshots';
const docsDir = 'docs';

// Ensure output directories exist
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
}
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir);
}
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir);
}

// Run the test and generate/update artifacts
console.log(`▶️ Running test: ${testFile} in headed mode...`);
execSync(`npx playwright test ${testFile} --headed`, { stdio: 'inherit' });

// Video handling
console.log('📦 Searching for video...');
const testResultsPattern = path.join(outputDir, '**', 'video.webm');
let foundVideoPath = null;

// Search for video file in test-results directory structure
function findVideoFile(dir) {
  if (!fs.existsSync(dir)) return null;
  
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      const found = findVideoFile(fullPath);
      if (found) return found;
    } else if (item === 'video.webm') {
      return fullPath;
    }
  }
  return null;
}

foundVideoPath = findVideoFile(outputDir);
console.log(`Looking for video in: ${outputDir}`);

let videoFileName;
if (foundVideoPath) {
  videoFileName = `${testName}.webm`;
  const videoDestination = path.join(videosDir, videoFileName);
  fs.copyFileSync(foundVideoPath, videoDestination);
  console.log(`✅ Video copied to ${videoDestination}`);
} else {
  console.log('⚠️ No video found, skipping video update.');
}

// Screenshot handling
const docsScreenshotsDir = path.join(docsDir, 'screenshots', testName);
if (!fs.existsSync(docsScreenshotsDir)) {
  fs.mkdirSync(docsScreenshotsDir, { recursive: true });
}

const screenshotFiles = fs.readdirSync(path.join(screenshotsDir, testName)).filter(file => file.endsWith('.png'));
screenshotFiles.forEach(file => {
  const srcPath = path.join(screenshotsDir, testName, file);
  const destPath = path.join(docsScreenshotsDir, file);
  if (fs.existsSync(destPath)) {
    fs.unlinkSync(destPath); // Remove existing file before copying
  }
  fs.copyFileSync(srcPath, destPath);
  console.log(`✅ Screenshot copied to documentation: ${destPath}`);
});

console.log(`🎉 Documentation artifacts updated!`);
console.log(`   📹 Video: ${videosDir}/${videoFileName || 'none'}`);
console.log(`   📸 Screenshots: ${screenshotFiles.length} files in ${docsScreenshotsDir}/`);
console.log(`   📝 Your .md files remain unchanged - only media files were replaced!`);