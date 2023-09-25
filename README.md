
# Flow and features of the application
- The home page of the application welcomes the user and allows the user to navigate to the login page.
- User can type in any name to "login". The login page is to just simulate the regular login flow of the application.
- Once "logged in", the user can add an item to the list by typing or by pressing the mic icon, which will allow the user to speak the item name.
- On matching with one of the items in the database, the item will show up in the list with its price.
- User can also remove an item from the list.
- Once the user is satisfied with the list, the user can either place the order, or print the list of items, or send an email in which the list items and their prices will be included.
- Upon clicking the "Send Email" button, the application will populate the items with their prices along with the final price into the body of the email where the user can enter the recipient's email id. Clicking on the "Send" link will open the email client application.
- Upon clicking the "Place Order" button, a POST request will be sent which will return the actual items available in the database, along with their discounted price. This will be displayed in a modal where the user can confirm the order.
- Upon clicking the "Print" button, the user can choose to print or download the part of the page containing the list of items.

# Edge cases
- The item database has "iPhone 9" as its first item. Hence, if the item added to the list has a very short name, it might be interpreted as any of the items in the database. And by the nature of the code written, it will pick the first item, and hence match with "iPhone 9". This may cause repetition of item ids which will display abnormal behaviour when deleting those items.
- If the item added to the list does not match even slightly with any of the items in the database, then the price of the item will be "$-" and it won't be included in the total bill.

# Contact details
- Name: Naman Lad
- Email: nklad@usc.edu
- Phone: +1 2136197747
