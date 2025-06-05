const fs = require('fs');
const path = require('path');

function createScreenshotsFolder(testName) {
  const screenshotsDir = path.join('screenshots', testName);
  
  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }
  
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
    console.log(`📁 Created screenshots folder: ${screenshotsDir}`);
  }
  
  return screenshotsDir;
}

module.exports = { createScreenshotsFolder };
