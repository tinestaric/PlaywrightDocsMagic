# Business Central Playwright Automation Framework

A comprehensive Playwright automation framework designed specifically for Microsoft Dynamics 365 Business Central, featuring advanced recording capabilities, video documentation, screenshot management, and automated documentation generation.

## Features

### 🎬 Core Recording Features
- **Interactive Test Recording**: Record user interactions in Business Central with automatic step detection
- **Adjustable Playback Speed**: Replay recorded actions with configurable slow-motion options
- **Parallel Execution**: Run multiple recordings simultaneously for comprehensive testing

### 📹 Video Documentation
- **High-Quality Video Capture**: Record test execution in multiple quality settings
- **Selective Recording**: Capture specific test segments for targeted documentation
- **Automatic Video Management**: Organized storage with metadata tracking

### 📸 Screenshot Management
- **Step-by-Step Screenshots**: Capture before/after screenshots for each test action
- **Reference System**: Link screenshots to documentation with unique identifiers
- **Auto-Update**: Automatically refresh screenshots when tests are re-run

### 📚 Documentation Integration
- **Markdown Generation**: Create comprehensive test documentation with embedded media
- **Dynamic Updates**: Automatically update documentation when tests change
- **Rich Metadata**: Include timestamps, test context, and execution details

## Quick Start

### Prerequisites
- Node.js 18+ 
- Business Central access credentials
- Windows/macOS/Linux environment

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd playwright-business-central-automation

# Install dependencies
npm install

# Install Playwright browsers
npm run setup

# Copy environment configuration
cp .env.example .env
```

### Configuration

Edit `.env` file with your Business Central details:

```env
BC_BASE_URL=https://businesscentral.dynamics.com
BC_TENANT_ID=your-tenant-id
BC_USERNAME=your-username@domain.com
BC_PASSWORD=your-password
BC_ENVIRONMENT=sandbox
BC_COMPANY=CRONUS USA, Inc.
```

## Usage Examples

### Test Recording Workflow

#### 1. Record a New Test
```typescript
import { TestRecorder } from './src/utils/test-recorder';

// In your test file
const recorder = new TestRecorder(page, context);
await recorder.startRecording('create-sales-order');

// Perform actions - they'll be automatically recorded
await loginPage.login(username, password);
await homePage.search('Sales Orders');
// ... more actions

const session = await recorder.stopRecording();
```

#### 2. Replay Recorded Session
```typescript
// Replay with normal speed
await recorder.replaySession('recording-123456789');

// Replay with slow motion (2x slower)
await recorder.replaySession('recording-123456789', { slowMo: 2 });
```

#### 3. Generate Test Code
```typescript
const session = await recorder.loadRecordingSession('recording-123456789');
const testCode = recorder.generateTestCode(session);
```

### Documentation Structure

#### Generated Files
```
docs/
├── test-reports/
│   ├── index.md                    # Main documentation index
│   ├── test-name.md                # Individual test documentation
│   ├── test-name.html              # HTML version with styling
│   ├── summary.md                  # Execution summary
│   └── assets/
│       ├── screenshots/            # Test screenshots
│       ├── videos/                 # Test videos
│       └── css/                    # Styling files
├── screenshots/
│   └── test-name/
│       ├── step-001-login-before.png
│       ├── step-001-login-after.png
│       └── metadata.json
└── videos/
    └── test-name/
        ├── login-segment.webm
        ├── navigation-segment.webm
        └── metadata.json
```

#### Example Documentation Output
```markdown
# Login and Navigate to Sales Orders

**Generated:** 2025-06-05 14:30:00
**Duration:** 45.32 seconds
**Browser:** chromium
**Environment:** sandbox

## Step 1: Navigate to Business Central
Navigate to Business Central login page

### Before Action
![Step 1: Navigate to Business Central (Before)](assets/screenshots/step-001-navigate-before.png)

### After Action
![Step 1: Navigate to Business Central (After)](assets/screenshots/step-001-navigate-after.png)

**Timestamp:** 2025-06-05 14:30:15

### Video Recording
[📹 Watch Step Video](assets/videos/navigation-segment.webm)
```

### Screenshot Reference Syntax

#### Basic Reference
```markdown
![Step 1: Login Action](step-001-login-after-2025-06-05T14-30-15.png)
```

#### Reference by Step Number
```typescript
// Get screenshot reference for step 3 (after action)
const reference = screenshotManager.getScreenshotReference(3, false);
// Returns: ![Step 3: Search Sales Orders](assets/screenshots/step-003-search-after.png)
```

#### Custom Screenshot
```typescript
// Capture custom screenshot
const path = await page.captureScreenshot('sales-order-created');
// Generates: custom-sales-order-created-2025-06-05T14-30-15.png
```

### Video Capture Configuration

#### Quality Settings
```typescript
// Configure video quality in playwright.config.ts
const videoConfig = {
  mode: 'retain-on-failure',
  size: { 
    width: 1920, 
    height: 1080 
  }  // High quality
};

// Available presets:
// low: 1024x768
// medium: 1366x768  
// high: 1920x1080
// ultra: 2560x1440
```

#### Segment Recording
```typescript
// Start recording specific segment
await videoManager.startSegment('create-customer-workflow');

// Perform actions...
await homePage.search('Customers');
await customerPage.createNew();

// Stop and save segment
const videoPath = await videoManager.stopSegment();
```

## Running Tests

### Basic Execution
```bash
# Run all tests
npm test

# Run with video recording
npm run test:video

# Run with screenshots
npm run test:screenshot

# Run in headed mode
npm run test:headed

# Debug mode
npm run test:debug
```

### Parallel Execution
```bash
# Run with 4 parallel workers
npm run test:parallel

# Or specify worker count
npx playwright test --workers=6
```

### Generate Documentation
```bash
# Generate documentation from existing test artifacts
npm run docs:generate

# Update screenshots in existing documentation
npm run docs:update-screenshots
```

## Advanced Features

### Page Object Model Structure
```typescript
// Base page with common functionality
class BasePage {
  protected screenshotManager: ScreenshotManager;
  protected videoManager: VideoManager;
  
  async clickElement(locator: Locator, stepName?: string) {
    if (stepName) {
      await this.screenshotManager.captureBeforeStep(stepName);
    }
    await locator.click();
    if (stepName) {
      await this.screenshotManager.captureAfterStep(stepName);
    }
  }
}

// Business Central specific pages
class BusinessCentralLoginPage extends BasePage {
  async login(email: string, password: string) {
    await this.startVideoRecording('business-central-login');
    // Login implementation with automatic screenshot capture
    await this.stopVideoRecording();
  }
}
```

### Custom Documentation Templates
```typescript
const docGenerator = new DocumentationGenerator({
  title: 'Custom Test Report',
  outputDir: './custom-docs',
  includeVideos: true,
  includeScreenshots: true,
  templatePath: './templates/custom-template.html'
});
```

### Environment-Specific Configuration
```typescript
// playwright.config.ts
export default defineConfig({
  projects: [
    {
      name: 'sandbox',
      use: { 
        baseURL: process.env.BC_SANDBOX_URL,
        storageState: 'auth-sandbox.json'
      }
    },
    {
      name: 'production',
      use: { 
        baseURL: process.env.BC_PROD_URL,
        storageState: 'auth-prod.json'
      }
    }
  ]
});
```

## Project Structure

```
playwright-business-central-automation/
├── src/
│   ├── pages/              # Page Object Model
│   │   ├── base-page.ts
│   │   ├── login-page.ts
│   │   └── home-page.ts
│   └── utils/              # Utility classes
│       ├── screenshot-manager.ts
│       ├── video-manager.ts
│       ├── test-recorder.ts
│       ├── documentation-generator.ts
│       └── logger.ts
├── tests/                  # Test files
│   ├── business-central.spec.ts
│   └── parallel-execution.spec.ts
├── scripts/                # Build and utility scripts
│   ├── global-setup.ts
│   ├── global-teardown.ts
│   ├── generate-docs.js
│   └── update-screenshots.js
├── docs/                   # Generated documentation
├── recordings/             # Recorded test sessions
├── test-results/           # Test execution artifacts
└── logs/                   # Application logs
```

## Best Practices

### Test Organization
- Use descriptive test names that reflect business processes
- Group related tests in describe blocks
- Implement proper setup and teardown

### Screenshot Management
- Capture screenshots at meaningful steps
- Use descriptive step names
- Maintain consistent naming conventions

### Video Recording
- Record segments for logical workflow sections
- Use appropriate quality settings for your needs
- Organize videos by test functionality

### Documentation
- Include business context in test descriptions
- Keep documentation up to date with test changes
- Use meaningful metadata and timestamps

## Troubleshooting

### Common Issues

#### Authentication Failures
```bash
# Clear stored authentication state
rm test-results/auth-state.json

# Run with debug logging
LOG_LEVEL=debug npm test
```

#### Screenshot/Video Issues
```bash
# Verify directory permissions
ls -la docs/screenshots/
ls -la docs/videos/

# Clean and regenerate
rm -rf docs/screenshots/* docs/videos/*
npm test
```

#### Documentation Generation
```bash
# Force regenerate documentation
rm -rf docs/test-reports/*
npm run docs:generate
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Update documentation
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
