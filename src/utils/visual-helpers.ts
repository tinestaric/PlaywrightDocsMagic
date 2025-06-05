/**
 * Visual helpers for making Playwright recordings more engaging
 */

import { Page, Locator } from '@playwright/test';

export class VisualHelpers {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Highlights an element with a colored border and glow effect before clicking
   */
  async highlightAndClick(locator: Locator, options?: {
    color?: string;
    duration?: number;
    clickDelay?: number;
    skipCleanup?: boolean;
  }) {
    const { color = '#ff4444', duration = 500, clickDelay = 200, skipCleanup = false } = options || {};
    
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

    // Clean up before click if not skipping cleanup
    if (!skipCleanup) {
      try {
        await locator.evaluate((element) => {
          if ((element as any)._originalStyle !== undefined) {
            element.style.cssText = (element as any)._originalStyle;
            delete (element as any)._originalStyle;
          }
        }, { timeout: 1000 });
      } catch (error) {
        // Element might already be changing, proceed with click
      }
    }

    // Click the element
    await locator.click();

    // Wait a bit after click
    await this.page.waitForTimeout(clickDelay);
  }

  /**
   * Highlights and clicks elements that trigger navigation (no cleanup after click)
   */
  async highlightAndClickNavigation(locator: Locator, options?: {
    color?: string;
    duration?: number;
    clickDelay?: number;
  }) {
    return this.highlightAndClick(locator, { ...options, skipCleanup: true });
  }

  /**
   * Adds a visual indicator at the cursor position during click
   */
  async addClickRipple(locator: Locator, options?: {
    color?: string;
    size?: number;
    duration?: number;
  }) {
    const { color = '#ff4444', size = 50, duration = 800 } = options || {};
    
    // Get element position
    const box = await locator.boundingBox();
    if (!box) return;

    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;

    // Inject ripple effect
    await this.page.evaluate(({ x, y, rippleColor, rippleSize, rippleDuration }) => {
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: fixed;
        left: ${x - rippleSize/2}px;
        top: ${y - rippleSize/2}px;
        width: ${rippleSize}px;
        height: ${rippleSize}px;
        border-radius: 50%;
        background: radial-gradient(circle, ${rippleColor}40, ${rippleColor}80, transparent);
        border: 2px solid ${rippleColor};
        pointer-events: none;
        z-index: 10000;
        animation: ripple ${rippleDuration}ms ease-out;
      `;

      // Add CSS animation if not already present
      if (!document.getElementById('ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
          @keyframes ripple {
            0% {
              transform: scale(0.1);
              opacity: 1;
            }
            100% {
              transform: scale(2);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);
      }

      document.body.appendChild(ripple);

      // Remove ripple after animation
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, rippleDuration);
    }, { x: centerX, y: centerY, rippleColor: color, rippleSize: size, rippleDuration: duration });

    // Click after ripple starts
    await this.page.waitForTimeout(100);
    await locator.click();
  }

  /**
   * Highlights the element with a pulsing effect before clicking
   */
  async pulseAndClick(locator: Locator, options?: {
    color?: string;
    pulses?: number;
    duration?: number;
  }) {
    const { color = '#00ff88', pulses = 2, duration = 200 } = options || {};

    // Add pulsing CSS
    await this.page.evaluate((pulseColor) => {
      if (!document.getElementById('pulse-animation')) {
        const style = document.createElement('style');
        style.id = 'pulse-animation';
        style.textContent = `
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 ${pulseColor}70; }
            70% { box-shadow: 0 0 0 15px ${pulseColor}00; }
            100% { box-shadow: 0 0 0 0 ${pulseColor}00; }
          }
          .pulse-highlight {
            animation: pulse 0.6s infinite;
            border: 2px solid ${pulseColor} !important;
          }
        `;
        document.head.appendChild(style);
      }
    }, color);

    // Apply pulse effect
    await locator.evaluate((element) => {
      element.classList.add('pulse-highlight');
    });

    // Wait for pulses
    await this.page.waitForTimeout(duration * pulses);

    // Remove effect before click
    try {
      await locator.evaluate((element) => {
        element.classList.remove('pulse-highlight');
      }, { timeout: 1000 });
    } catch (error) {
      // Element might be changing, proceed with click
    }

    // Click
    await locator.click();
  }

  /**
   * Creates a spotlight effect around the element before clicking
   */
  async spotlightAndClick(locator: Locator, options?: {
    duration?: number;
  }) {
    const { duration = 1500 } = options || {};

    const box = await locator.boundingBox();
    if (!box) return;

    // Create spotlight overlay
    await this.page.evaluate((elementBox, spotlightDuration) => {
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: radial-gradient(
          circle at ${elementBox.x + elementBox.width/2}px ${elementBox.y + elementBox.height/2}px,
          transparent 50px,
          transparent 80px,
          rgba(0,0,0,0.7) 150px
        );
        pointer-events: none;
        z-index: 9999;
        transition: opacity 0.5s ease;
      `;

      document.body.appendChild(overlay);

      // Remove overlay after duration
      setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
          if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
          }
        }, 500);
      }, spotlightDuration);
    }, box, duration);

    await this.page.waitForTimeout(duration / 2);
    await locator.click();
  }
}

/**
 * Convenience function to create visual helpers instance
 */
export function createVisualHelpers(page: Page): VisualHelpers {
  return new VisualHelpers(page);
}
