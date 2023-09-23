# Let's Shop

## Introduction

The Let's Shop app is designed to assist senior citizens in managing their grocery shopping lists efficiently. This user-friendly application leverages the WebSpeech API to allow users to add items to their cart by speaking the name of the product. Additionally, users have the option to manually enter the name of the product. The app aims to simplify the shopping experience for seniors and make it more accessible.

## Features

### 1. Speech-to-Text for Spoken Items

- The app provides a speech recognition feature, allowing users to verbally specify the items they want to add to their shopping cart.
- The spoken items are then checked against an items database, and a corresponding product is mapped if a match is found.

### 2. Autocomplete for Manual Entry

- Users can manually enter the name of the product using the autocomplete feature, ensuring accuracy and convenience in item selection.

### 3. Edit Spoken Content

- To accommodate variations in pronunciation and speech recognition accuracy, users have the option to edit the transcribed content.

### 4. Add to Cart Button

- The app includes an "Add to Cart" button (represented by a plus sign icon) to add selected items to the cart, allowing users to build their shopping list easily.

### 5. Show Cart

- Users can view the list of items they've added to their cart by clicking the "Show Cart" button (represented by a cart icon).

### 6. Print List

- The app offers a "Print List" feature, allowing users to generate a physical shopping list for reference while shopping in-store.

### 7. Share List via Email

- Users can share their shopping list with the grocery store or family members via email, making it a collaborative and convenient shopping experience.

### Login Feature

- The app includes a login feature that allows users to access their shopping lists securely.
- Users can log in using their username and password.

## Authentication

- The login feature makes use of the Authentication API at [https://fakestoreapi.com/auth/login](https://fakestoreapi.com/auth/login).
- The predefined username and password for logging in are as follows:
  - Username: "mor_2314"
  - Password: "83r5^_"

## Routes

- `/`: This route leads to the login page where users can log in using their credentials.
- `/cart`: This route provides access to the text-to-speech and cart functionality, allowing users to interact with their shopping list.

## APIs Used in the Project

- **Get a List of All Available Products**: The app retrieves a list of all available products from [https://dummyjson.com/products](https://dummyjson.com/products). This API is used to populate the product database and provide a wide selection of items for users to add to their shopping lists.

- **Authentication API**: The authentication feature of the app utilizes the Authentication API at [https://fakestoreapi.com/auth/login](https://fakestoreapi.com/auth/login) to securely authenticate users and grant access to their shopping lists.

## How to Run the App

Follow these steps to run the Let's Shop app on your local machine:

1. **Install Dependencies:**

   npm i 
   npm i --force (incase of any dependency issues)
   npm start

The Let's Shop app is designed to make grocery shopping more accessible and user-friendly for seniors. Enjoy a seamless and efficient shopping experience with the convenience of speech recognition, manual entry features, and secure login functionality.

