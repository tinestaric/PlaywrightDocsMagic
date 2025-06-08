import { test, expect } from '@playwright/test';
import { createVisualHelpers } from '../src/utils/visual-helpers';

test('test', async ({ page }) => {
    const visual = createVisualHelpers(page, 'AddExtTextToAssemblyOrder');
    
    await page.goto('http://bc27/BC/SignIn?ReturnUrl=%2FBC%2F');
       
    // Use screenshot parameter for key actions
    await visual.highlightAndClick(page.getByRole('textbox', { name: 'User name:' }));
    await page.getByRole('textbox', { name: 'User name:' }).fill('admin');
    
    await visual.highlightAndClick(page.getByRole('textbox', { name: 'Password:' }));
    await page.getByRole('textbox', { name: 'Password:' }).fill('Geslo123.');
    
    await visual.highlightAndClick(page.getByRole('button', { name: 'Sign In' }), { screenshotName: 'login-complete' });
    
    // Use regular highlightAndClick for navigation items
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('menuitem', { name: 'Sales', exact: true }));
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('menuitem', { name: 'Items, View or edit detailed information for the products that you trade in. The item card can be of type Inventory or Service to specify if the item is a physical unit or a labor time unit.', exact: true }), { screenshotName: 'items-menu-open' });
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'New', exact: true }), { screenshotName: 'new-item-selected' });
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Code, sorted in Ascending order ITEM' }), { screenshotName: 'new-item-template-selected' });

    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Item, Show more' }), { persistentId: 'item-show-more' });
    
    // Update the locator after the button text changes
    await visual.addToCleanupList(page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Item, Show less' }), 'item-show-more');
    
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('checkbox', { name: 'Automatic Ext. Texts' }), { persistentId: 'automatic-ext-texts' });
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('form', { name: 'New - Item Card' }).getByLabel('Description', { exact: true }), { persistentId: 'item-description' });
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('form', { name: 'New - Item Card' }).getByLabel('Description', { exact: true }).fill('Item with "Automatic Ext. Texts" enabled');
    await visual.takeMarkScreenshot('item-created');
    var ItemNo = await page.locator('iframe[title="undefined"]').contentFrame().getByRole('textbox', { name: 'No.', exact: true }).inputValue();
    console.log('ItemNo:', ItemNo);
    await visual.removeAllHighlights();

    
    await page.locator('iframe[title="undefined"]').contentFrame().getByLabel('New - Item Card').getByRole('menuitem', { name: 'More options' }).click();
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByLabel('New - Item Card').getByRole('menuitem', { name: 'Related' }));
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('menu', { name: 'Related' }).getByLabel('Item', { exact: false }));
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('menuitem', { name: 'Extended Texts' }), { screenshotName: 'extended-texts-selected' });
    
    await page.keyboard.press('Alt+N');
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('form', { name: 'New - Extended Text' }).getByLabel('Description'));
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('form', { name: 'New - Extended Text' }).getByLabel('Description').fill('Extended text enabled for assembly order');
    
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('textbox', { name: 'Text', exact: true }));
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('textbox', { name: 'Text', exact: true }).fill('Extended text enabled for assembly order');
    await visual.takeMarkScreenshot('extended-text-created');
    
    await page.locator('iframe[title="undefined"]').contentFrame().getByLabel('New - Extended Text').getByRole('button', { name: 'Back' }).click();
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Back' }).nth(2).click();      
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Back', exact: true }).click();
    
    await visual.highlightAndClick(page.getByRole('button', { name: 'Search' }), { persistentId: 'search-button'});
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('textbox', { name: 'Tell me what you want to do' }).fill('assembly orders');
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByText('Assembly Orders', { exact: true }), { cleanAllPrevious: true, screenshotName: 'assembly-orders-selected' });
    
    await page.keyboard.press('Alt+N');
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('textbox', { name: 'Quantity to Assemble' }).click();
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('row', { name: '" / " Avail. Warning Open' }).getByLabel('Type', { exact: true }).click();
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('row', { name: '" / " Avail. Warning Open' }).getByLabel('Type', { exact: true }).selectOption('1');
    await visual.highlightAndClick(page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'No.', exact: true }));
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'No.', exact: true }).fill(ItemNo);
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'No.', exact: true }).press('Enter');
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'No.', exact: true }).press('ArrowLeft');
    await visual.takeMarkScreenshot('assembly-order-created');
});