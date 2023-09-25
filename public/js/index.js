/* eslint-disable */
import '@babel/polyfill';
import './main.js';
import { login, logout } from './login';
import { addtolist, deletefromlist } from './managelist';
import {generatePDF, sendmail} from './lists'
import { updateFilteredGroceries} from './main'
// import {groceries} from './overview';

// DOM ELEMENTS
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const purchaseButtons = document.querySelectorAll('.buy-now');
const searchInput = document.getElementById('search-bar');
const sharebutton = document.getElementById('share-list-button');
const sharebuttondownload = document.getElementById('share-list-buttondownload');
const counterInputs = document.querySelectorAll('.card__counter');
const closebuttons = document.querySelectorAll('.card__close-button');
if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(name, password);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateSettings({ name, email }, 'data');
  });

purchaseButtons.forEach(button => {
  button.addEventListener('click', e => {
    const groceryid = button.getAttribute('data-grocery-id');
      const counterInput = document.querySelector(`[data-grocery-id="${groceryid}"]`);
      const currentQuantity = parseInt(counterInput.value);
    e.target.textContent = 'Processing...';
    const { groceryId } = e.target.dataset;
    addtolist(groceryId, currentQuantity);
  });
});

if (sharebutton)
{
  document.getElementById('share-list-button').addEventListener('click', () => {
    const groceriesData = JSON.parse(document.getElementById('share-list-button').getAttribute('data-grocerys'));
      sendmail(groceriesData);
    
  });
}

  if (sharebuttondownload)
{
  document.getElementById('share-list-buttondownload').addEventListener('click', () => {
    const groceriesData = JSON.parse(document.getElementById('share-list-buttondownload').getAttribute('data-grocerys'));

      console.log(groceriesData)
      generatePDF(groceriesData);
    
  });
  
}

closebuttons.forEach(button=>{
  button.addEventListener('click', e => {
    console.log(groceryId)
    const { groceryId } = e.target.dataset;
    deletefromlist(groceryId);
  });
});

if (searchInput)
{
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    console.log(searchTerm)
    updateFilteredGroceries(searchTerm);
  });
}
    

