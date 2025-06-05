/**
 * Visual helpers for making Playwright recordings more engaging
 */

import { Page, Locator } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export class VisualHelpers {
  private page: Page;
  private activeHighlights: Set<string> = new Set();
  private persistentLocators: Map<string, Locator> = new Map();
  private testName: string;

  constructor(page: Page, testName?: string) {
    this.page = page;
    this.testName = testName || 'unknown-test';
  }

  /**
   * Highlights an element without clicking (for persistent highlighting)
   */
  async highlight(locator: Locator, options?: {
    color?: string;
    id?: string;
  }) {
    const { color = '#ff4444', id } = options || {};
    
    await locator.evaluate((element, { highlightColor, highlightId }) => {
      const originalStyle = element.style.cssText;
      element.style.cssText += `
        border: 3px solid ${highlightColor} !important;
        box-shadow: 0 0 15px ${highlightColor} !important;
        transition: all 0.3s ease !important;
        z-index: 9999 !important;
        position: relative !important;
      `;
      
      // Store original style and ID for cleanup
      (element as any)._originalStyle = originalStyle;
      if (highlightId) {
        (element as any)._highlightId = highlightId;
      }
    }, { highlightColor: color, highlightId: id });

    if (id) {
      this.activeHighlights.add(id);
      this.persistentLocators.set(id, locator);
    }
  }

  /**
   * Removes highlight from a specific element by ID
   */
  async removeHighlight(locator: Locator, id?: string) {
    try {
      await locator.evaluate((element, highlightId) => {
        if ((element as any)._originalStyle !== undefined) {
          // Only remove if ID matches or no ID specified
          if (!highlightId || (element as any)._highlightId === highlightId) {
            element.style.cssText = (element as any)._originalStyle;
            delete (element as any)._originalStyle;
            delete (element as any)._highlightId;
          }
        }
      }, id, { timeout: 1000 });
      
      if (id) {
        this.activeHighlights.delete(id);
      }
    } catch (error) {
      // Element might be gone, ignore
    }
  }

  /**
   * Removes all active persistent highlights
   */
  async removeAllHighlights() {
    for (const [id, locator] of this.persistentLocators) {
      await this.removeHighlight(locator, id);
    }
    this.activeHighlights.clear();
    this.persistentLocators.clear();
  }

  /**
   * Highlights an element with a colored border and glow effect before clicking
   */
  async highlightAndClick(locator: Locator, options?: {
    color?: string;
    duration?: number;
    clickDelay?: number;
    persistentId?: string;
    cleanAllPrevious?: boolean;
    screenshotName?: string;
    screenshotFullPage?: boolean;
  }) {
    const { 
      color = '#ff4444', 
      duration = 400, 
      clickDelay = 200, 
      persistentId, 
      cleanAllPrevious = false,
      screenshotName,
      screenshotFullPage = true
    } = options || {};

    // Use highlight method for persistent highlights
    if (persistentId) {
      await this.highlight(locator, { color, id: persistentId });
      await this.page.waitForTimeout(duration);
      
      // Take screenshot before click if requested
      if (screenshotName) {
        await this.takeMarkScreenshot(screenshotName, { fullPage: screenshotFullPage });
      }
      
      await locator.click();
      await this.page.waitForTimeout(clickDelay);
      return;
    }

    // Add highlight style to the element
    await locator.evaluate((element, highlightColor) => {
      const originalStyle = element.style.cssText;
      element.style.cssText += `
        border: 3px solid ${highlightColor} !important;
        box-shadow: 0 0 15px ${highlightColor} !important;
        transition: all 0.3s ease !important;
        z-index: 9999 !important;
        position: relative !important;
      `;
      
      // Store original style to restore later
      (element as any)._originalStyle = originalStyle;
    }, color);

    // Wait for highlight to be visible
    await this.page.waitForTimeout(duration);

    // Take screenshot before click if requested
    if (screenshotName) {
      await this.takeMarkScreenshot(screenshotName, { fullPage: screenshotFullPage });
    }

    // Click the element
    await locator.click();

    // Clean all previous highlights if requested
    if (cleanAllPrevious) {
      await this.removeAllHighlights();
    }    

    // Wait a bit after click
    await this.page.waitForTimeout(clickDelay);
  }

  /**
   * Takes a screenshot at a marked point with semantic naming
   */
  async takeMarkScreenshot(name: string, options?: {
    fullPage?: boolean;
    category?: string;
  }) {
    const { fullPage = true, category } = options || {};
    
    // Create semantic filename without numbers
    const sanitizedName = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const fileName = category 
      ? `${category}-${sanitizedName}.png`
      : `${sanitizedName}.png`;
    
    const screenshotDir = path.join('screenshots', this.testName);
    
    // Ensure screenshot directory exists
    if (!fs.existsSync('screenshots')) {
      fs.mkdirSync('screenshots');
    }
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    
    const screenshotPath = path.join(screenshotDir, fileName);
    
    await this.page.screenshot({ 
      path: screenshotPath, 
      fullPage 
    });
    
    console.log(`📸 Screenshot saved: ${screenshotPath}`);
    return screenshotPath;
  }

  /**
   * @deprecated No longer needed with semantic naming
   */
  resetScreenshotCounter() {
    // No-op - keeping for backward compatibility
  }
}

/**
 * Convenience function to create visual helpers instance
 */
export function createVisualHelpers(page: Page, testName?: string): VisualHelpers {
  return new VisualHelpers(page, testName);
}
