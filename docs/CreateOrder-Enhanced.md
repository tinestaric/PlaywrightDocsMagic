# Business Central Sales Order Creation Guide

This guide walks you through the complete process of creating a sales order in Microsoft Dynamics 365 Business Central.

## Overview

The sales order creation process involves logging into Business Central, navigating to the Sales Orders section, and entering customer and item details to create a complete order.

## Video Recording

<video width="800" height="600" controls>
  <source src="videos/CreateOrder-Enhanced.webm" type="video/webm">
  <p>Your browser doesn't support HTML5 video. You can <a href="videos/CreateOrder-Enhanced.webm">download the video</a> instead.</p>
</video>

*This video recording demonstrates the entire sales order creation process from login to completion. You can follow along with the video while reading the step-by-step instructions below.*

## Step-by-Step Process

### 1. Login to Business Central

Start by accessing the Business Central login page and entering your credentials.

![Login Complete](screenshots/CreateOrder-Enhanced/login-complete.png)

### 2. Navigate to Sales Orders

Once logged in, navigate to the Sales Orders section through the main menu.

1. Click on the **Sales** menu item in the navigation
2. Select **Sales Orders** from the submenu

![Sales Orders Menu Open](screenshots/CreateOrder-Enhanced/sales-orders-menu-open.png)

3. Click the **New** button to create a new sales order

![New Order Selected](screenshots/CreateOrder-Enhanced/new-order-selected.png)

### 3. Select Customer

Begin creating the order by selecting a customer.

1. Click the **Choose a value for Customer** button
2. Select the desired customer from the list (in this example, customer 10000)

![Customer Selected](screenshots/CreateOrder-Enhanced/customer-selected.png)

### 4. Add First Item

Add the first item to your sales order.

#### Select Item Number
1. Click on the **No.** field for the first line item

![First Item Dropdown](screenshots/CreateOrder-Enhanced/first-item-dropdown.png)

2. Choose **Select from full list** to browse available items
3. Use the **Search** function to find specific items
4. Search for item "1936" and select **1936-S** from the results

![First Item Selected](screenshots/CreateOrder-Enhanced/first-item-selected.png)

#### Set Location and Quantity
1. Select the **Location Code** (SILVER in this example)

![Location Selected](screenshots/CreateOrder-Enhanced/location-selected.png)

2. Enter the quantity (10 units in this example) in the **Quantity** field

### 5. Add Second Item

Add an additional item to the same sales order.

#### Select Second Item
1. Move to the next line and click the **Choose a value for No.** button

![Second Item Dropdown](screenshots/CreateOrder-Enhanced/second-item-dropdown.png)

2. Again, select **Select from full list** and use **Search**
3. Search for "ser" and select **SER203** from the results

![Second Item Selected](screenshots/CreateOrder-Enhanced/second-item-selected.png)

4. Enter the quantity (1 unit in this example)

### 6. Complete the Order

Once all items are added with their respective quantities and locations, your sales order is ready.

![Order Complete](screenshots/CreateOrder-Enhanced/order-complete.png)

## Key Points to Remember

- **Customer Selection**: Always start by selecting the customer before adding items
- **Item Search**: Use the search functionality to quickly find specific items by partial item numbers
- **Location Codes**: Ensure you select the appropriate location code for inventory tracking
- **Quantities**: Double-check quantities before finalizing the order
- **Multiple Items**: You can add multiple line items to a single sales order

## Troubleshooting

- If items don't appear in search, verify the item number is correct
- Ensure location codes are valid for the selected items
- Check that sufficient inventory is available at the selected location

---

*This documentation is automatically updated. Screenshots are refreshed each time the update-docs script is run, ensuring the documentation stays current with any UI changes.*
