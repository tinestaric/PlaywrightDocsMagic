import { test, expect } from '@playwright/test';
import { createVisualHelpers } from '../src/utils/visual-helpers';

test('test', async ({ page }) => {
    const visual = createVisualHelpers(page, 'CreateOrder-Enhanced');
    
    await page.goto('http://bc27/BC/SignIn?ReturnUrl=%2FBC%2F');
       
    // Use screenshot parameter for key actions
    await visual.highlightAndClick(page.getByRole('textbox', { name: 'User name:' }));
    await page.getByRole('textbox', { name: 'User name:' }).fill('admin');
    
    await visual.highlightAndClick(page.getByRole('textbox', { name: 'Password:' }));
    await page.getByRole('textbox', { name: 'Password:' }).fill('Geslo123.');
    
    await visual.highlightAndClick(page.getByRole('button', { name: 'Sign In' }), { screenshotName: 'login-complete' });
    
    // Use regular highlightAndClick for navigation items
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('menuitem', { name: 'Sales', exact: true }));
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('menuitem', { name: 'Sales Orders, Record your' }), { screenshotName: 'sales-orders-menu-open' });
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('menuitem', { name: 'New', exact: true }), { screenshotName: 'new-order-selected' });
    
    // Start persistent highlight for customer selection process
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Choose a value for Customer' }), { persistentId: 'customer-selection' });
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'No., sorted in Ascending order 10000' }), { cleanAllPrevious: true, screenshotName: 'customer-selected' });
    
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'No.', exact: true }), { persistentId: 'item-no', screenshotName: 'first-item-dropdown' });
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Select from full list' }));
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('menuitem', { name: 'Search', exact: true }));
    
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('searchbox', { name: 'Search Select - Items' }));
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('searchbox', { name: 'Search Select - Items' }).fill('1936');
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'No., sorted in Ascending order 1936-S' }), { cleanAllPrevious: true, screenshotName: 'first-item-selected' });

    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'Location Code' }), { persistentId: 'location-selection' });
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Code, sorted in Ascending order SILVER' }), { cleanAllPrevious: true, screenshotName: 'location-selected' });
    
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('textbox', { name: 'Quantity', exact: true }));
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('textbox', { name: 'Quantity', exact: true }).fill('10');
    
    // Clean up highlights after quantity is set
    await visual.removeHighlight(page.locator('iframe[title="undefined"]').contentFrame().getByRole('textbox', { name: 'Quantity', exact: true }));
    
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('textbox', { name: 'Quantity', exact: true }).press('ArrowLeft');
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'Location Code' }).press('ArrowLeft');
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'Description' }).press('ArrowLeft');
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'Item Reference No.' }).press('ArrowLeft');
        
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'No.', exact: true }).press('ArrowDown');
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Choose a value for No.' }), { persistentId: 'item-no-selection', screenshotName: 'second-item-dropdown' });
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Select from full list' }));
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('menuitem', { name: 'Search', exact: true }));
    
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('searchbox', { name: 'Search Select - Items' }));
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('searchbox', { name: 'Search Select - Items' }).fill('ser');
    
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'No., sorted in Ascending order SER203' }), { cleanAllPrevious: true, screenshotName: 'second-item-selected' });
    
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('textbox', { name: 'Quantity', exact: true }));
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('textbox', { name: 'Quantity', exact: true }).fill('1');
    await visual.takeMarkScreenshot('order-complete');
});