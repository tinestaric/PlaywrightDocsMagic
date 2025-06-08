# Business Central Assembly Order with Extended Text Guide

This guide walks you through the complete process of creating an item with extended text and using it in an assembly order in Microsoft Dynamics 365 Business Central.

## Overview

The extended text assembly order process involves creating an item with "Automatic Ext. Texts" enabled, setting up extended text for that item, and then using the item in an assembly order where the extended text will automatically appear.

## Video Recording

<video width="800" height="600" controls>
  <source src="videos/AddExtTextToAssemblyOrder.webm" type="video/webm">
  <p>Your browser doesn't support HTML5 video. You can <a href="videos/AddExtTextToAssemblyOrder.webm">download the video</a> instead.</p>
</video>

*This video recording demonstrates the entire process from login to creating an assembly order with extended text. You can follow along with the video while reading the step-by-step instructions below.*

## Step-by-Step Process

### 1. Login to Business Central

Start by accessing the Business Central login page and entering your credentials.

![Login Complete](screenshots/AddExtTextToAssemblyOrder/login-complete.png)

### 2. Navigate to Items

Navigate to the Items section to create a new item with extended text capabilities.

1. Click on the **Sales** menu item in the navigation
2. Select **Items** from the submenu

![Items Menu Open](screenshots/AddExtTextToAssemblyOrder/items-menu-open.png)

### 3. Create New Item

Create a new item that will support extended text.

1. Click the **New** button to create a new item

![New Item Selected](screenshots/AddExtTextToAssemblyOrder/new-item-selected.png)

2. Select the item template when prompted

![New Item Template Selected](screenshots/AddExtTextToAssemblyOrder/new-item-template-selected.png)

### 4. Configure Item Settings

Set up the item with extended text capabilities.

1. Click **Show more** to expand additional item options
2. Enable the **Automatic Ext. Texts** checkbox - this is crucial for extended text functionality
3. Enter a descriptive name: "Item with 'Automatic Ext. Texts' enabled"

![Item Created](screenshots/AddExtTextToAssemblyOrder/item-created.png)

*Note: The item number is automatically generated and will be used later in the assembly order.*

### 5. Set Up Extended Text

Configure the extended text that will appear on documents.

1. Navigate to **More options** → **Related** → **Item** → **Extended Texts**

![Extended Texts Selected](screenshots/AddExtTextToAssemblyOrder/extended-texts-selected.png)

2. Create a new extended text entry by pressing **Alt+N**
3. Enter the description: "Extended text enabled for assembly order"
4. Fill in the text field with the same content: "Extended text enabled for assembly order"

![Extended Text Created](screenshots/AddExtTextToAssemblyOrder/extended-text-created.png)

### 6. Navigate to Assembly Orders

Now navigate to create an assembly order using the item with extended text.

1. Use the **Search** function to find "assembly orders"

![Assembly Orders Selected](screenshots/AddExtTextToAssemblyOrder/assembly-orders-selected.png)

### 7. Create Assembly Order

Create a new assembly order and add the item with extended text.

1. Press **Alt+N** to create a new assembly order
2. In the assembly order lines:
   - Set the **Type** to "Item" (option 1)
   - Enter the item number created earlier in the **No.** field
   - The system will automatically populate the extended text

![Assembly Order Created](screenshots/AddExtTextToAssemblyOrder/assembly-order-created.png)

## Key Features Demonstrated

### Automatic Extended Text
- **Automatic Ext. Texts** checkbox enables automatic insertion of extended text on documents
- When this option is enabled, extended text appears automatically when the item is used
- No manual intervention required during order creation

### Extended Text Configuration
- Extended text can be set up with custom descriptions and content
- Text appears on assembly orders and other documents automatically
- Helps provide additional item information to users

### Assembly Order Integration
- Extended text seamlessly integrates with assembly orders
- Provides enhanced documentation for assembly processes
- Improves clarity and reduces manual data entry

## Key Points to Remember

- **Enable Automatic Ext. Texts**: This checkbox must be checked for extended text to appear automatically
- **Extended Text Setup**: Configure extended text through Related → Item → Extended Texts
- **Assembly Order Usage**: Extended text will automatically appear when the item is used in assembly orders
- **Item Number Tracking**: The system-generated item number is used throughout the process

## Benefits

- **Reduced Manual Entry**: Extended text appears automatically, reducing data entry errors
- **Consistent Information**: Same extended text appears across all documents using the item
- **Enhanced Documentation**: Provides additional context for assembly operations
- **Process Efficiency**: Streamlines assembly order creation with pre-configured text

## Troubleshooting

- **Extended text not appearing**: Verify that "Automatic Ext. Texts" is enabled on the item
- **Text not saving**: Ensure both Description and Text fields are filled in the Extended Text setup
- **Item not found**: Double-check the item number when creating the assembly order
- **Assembly order issues**: Verify the item type is set to "Item" in the assembly order lines

---

*This documentation is automatically updated. Screenshots are refreshed each time the update-docs script is run, ensuring the documentation stays current with any UI changes.*
