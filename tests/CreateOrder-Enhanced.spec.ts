import { test, expect } from '@playwright/test';
import { createVisualHelpers } from '../src/utils/visual-helpers';

test('test', async ({ page }) => {
    const visual = createVisualHelpers(page);
    
    await page.goto('http://bc27/BC/SignIn?ReturnUrl=%2FBC%2F');
    
    // Use simple highlighting for all clicks
    await visual.highlightAndClick(page.getByRole('textbox', { name: 'User name:' }));
    await page.getByRole('textbox', { name: 'User name:' }).fill('admin');
    
    await visual.highlightAndClick(page.getByRole('textbox', { name: 'Password:' }));
    await page.getByRole('textbox', { name: 'Password:' }).fill('Geslo123.');
    
    // Use navigation-specific method for sign in button
    await visual.highlightAndClickNavigation(page.getByRole('button', { name: 'Sign In' }));
    
    // Use navigation method for menu items that change pages
    await visual.highlightAndClickNavigation(page.locator('iframe[title="undefined"]').contentFrame().getByRole('menuitem', { name: 'Sales', exact: true }));
    await visual.highlightAndClickNavigation(page.locator('iframe[title="undefined"]').contentFrame().getByRole('menuitem', { name: 'Sales Orders, Record your' }));
    await visual.highlightAndClickNavigation(page.locator('iframe[title="undefined"]').contentFrame().getByRole('menuitem', { name: 'New', exact: true }));
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Choose a value for Customer' }));
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'No., sorted in Ascending order 10000' }));
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'No.', exact: true }));
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Select from full list' }));
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('menuitem', { name: 'Search', exact: true }));
    
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('searchbox', { name: 'Search Select - Items' }));
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('searchbox', { name: 'Search Select - Items' }).fill('1936');
    
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'No., sorted in Ascending order 1936-S' }));
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'Location Code' }));
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Code, sorted in Ascending order SILVER' }));
    
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('textbox', { name: 'Quantity', exact: true }));
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('textbox', { name: 'Quantity', exact: true }).fill('10');
    
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('textbox', { name: 'Quantity', exact: true }).press('ArrowLeft');
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'Location Code' }).press('ArrowLeft');
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'Description' }).press('ArrowLeft');
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'Item Reference No.' }).press('ArrowLeft');
    
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'No.', exact: true }));
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'No.', exact: true }).press('ArrowDown');
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Choose a value for No.' }));
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Select from full list' }));
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('menuitem', { name: 'Search', exact: true }));
    
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('searchbox', { name: 'Search Select - Items' }));
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('searchbox', { name: 'Search Select - Items' }).fill('ser');
    
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'No., sorted in Ascending order SER203' }));
    
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('textbox', { name: 'Quantity', exact: true }));
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('textbox', { name: 'Quantity', exact: true }).fill('1');
});