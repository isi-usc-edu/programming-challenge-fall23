
const Grocery = require('C:/Users/jimit/Desktop/ReadStop/models/grocerymodel');


// const groceries = groceriesData

  function updateFilteredGroceries(searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    
    const groceries = Grocery.find();
    // Filter the groceries based on the search term
     filteredGroceries = groceries.filter(grocery => {
      const groceryName = grocery.name.toLowerCase();
      return groceryName.includes(searchTerm);
    }
    
    );
  
    //Display the filtered or all groceries based on the current search term
    displayGroceries(filteredGroceries, searchTerm);
  };
  
  function displayGroceries(filteredGroceries, searchTerm) {
    const groceryCardsContainer = document.querySelector('.card-container');
    groceryCardsContainer.innerHTML = ''; // Clear previous cards
  
    // Check if searchTerm is empty
    if (searchTerm === '') {
      // Display all groceries with CSS styling
      groceries.forEach(grocery => {
        const card = document.createElement('div');
        card.className = 'card';
  
        // Populate the card with content
        card.innerHTML = `<div class="card__header">
        <div class="card__picture">
          <div class="card__picture-overlay">&nbsp;</div>
          <img class="card__picture-img" src="${grocery.imageLink}" alt="grocery.name">
        </div>
        <h3 class="heading-tertirary">
          <span>${grocery.name}</span>
        </h3>
      </div>
      
      <div class="card__details">
        <p class="card__text">${grocery.price}</p>
        <div class="card__data"></div>
      </div>
      
      <div class="card__footer">
        <button class="buy-now btn btn-default" data-grocery-id="${grocery.id}">Add to List</button>
      </div>
      `
  
        groceryCardsContainer.appendChild(card);
      });
    } else {
      // Filtered groceries logic (unchanged)
      filteredGroceries.forEach(grocery => {
        const card = document.createElement('div');
        card.className = 'card';
  
        // Populate the card with content
        card.innerHTML = `<div class="card__header">
        <div class="card__picture">
          <div class="card__picture-overlay">&nbsp;</div>
          <img class="card__picture-img" src="${grocery.imageLink}" alt="grocery.name">
        </div>
        <h3 class="heading-tertirary">
          <span>${grocery.name}</span>
        </h3>
      </div>
      
      <div class="card__details">
        <p class="card__text">${grocery.price}</p>
        <div class="card__data"></div>
      </div>
      
      <div class="card__footer">
        <button class="buy-now btn btn-default" data-grocery-id="${grocery.id}">Add to List</button>
      </div>
      `;
  
        groceryCardsContainer.appendChild(card);
      });
    }
  };

  module.exports = { updateFilteredGroceries, displayGroceries};
