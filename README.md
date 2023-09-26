# Programming Challenge 2023

The project includes several modules, as you requested, which are listed below. The application displays a list of available products per the FakeStore API result, which is requested by the Django REST Framework and rendered using ReactJS. The user is provided with voice-based search options on the home page, allowing for easy browsing if they need to be habituated to using the keyboard to search. Once a user tries to add a new product to the cart, the `addToCart` API checks whether the user has been authenticated; if so, the product is added to the cart, and the user is redirected to the login page, following which they can browse the list of products. Upon adding a new product to the cart, a request is sent to the server to fetch the item counts and is updated accordingly on the client's end. Once all products are added to the cart, the `/cart` endpoint will render all available products, with the subtotal, tax, and the total amount to be paid. Furthermore, the user would also have the option to share the cart items with their friends and family or directly print the items for future use.

## Available Modules
* __Basic Authentication__: Supports preliminary authentication by means of the user name for convenient access to the cart.
* __Shopping List (FakeStore API)__: Displays a list of the available products, including their title, category, rating, image, and price. *(NOTE: The application intended to develop a grocery shopping application, although the products listed in the API do not constitute such products. However, if such products do get added in the future, the code is set to adapt to the new products as added dynamically)*
* __Voice Based Search (WebSpeech API)__: Integrated browser's `WebSpeech API` allows for easier searching within the products listed on the web application.
* __Add to Cart__: Invokes a call to the `addToCart` API configured within the Django REST framework, which adds the product ID to the cart along with the quantity, which returns the status based on the condition whether the user is authenticated or not.
* __Share Cart with a friend__: Allows sharing of cart items without logging in directly via mail with granular details available about the cart items, including the subtotal, tax value, and the total amount payable.
* __Print Cart items to an exportable PDF__: Allows the end-user to print the cart items to an exportable PDF
* __Data Analysis__: Shows primary analysis of products available within the API that displays values, including the total products available, the categories, average product ratings, and the total reviews per the data available within the API.

## How to use?

In the project directory, you can run:

```
python3 manage.py runserver
```

Runs the app in the development mode.\
Open [http://127.0.0.1:8000](http://127.0.0.1:8000) to access the web application.

## Configured APIs
* __authUser__: Accepts `POST` request to the endpoint containing the `userName` which is then stored in the session to grant access to the application.
* __getStoreStats__: Returns a statistical overview of the products available within the FakeStore API.
* __fetchProducts__: Returns a list of products available within the FakeStore API.
* __addToCart__: Accepts a `GET` request to the endpoint with the `productID`; determines whether the user is logged in or not and servers the response accordingly.
* __getCart__: Returns a JSON response containing the products available within the cart, subtotal, tax, and the total amount payable.
* __getCartCount__: Returns a counter for the products available within the cart to display on the web application.

## Configured Endpoints
* __/login__: Returns the login component for user authentication.
* __/cart__: Displays available items within the cart along with the pricing breakdown and options for sharing via email or exporting as PDF.