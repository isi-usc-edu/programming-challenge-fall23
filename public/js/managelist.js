/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const deletefromlist = async (groceryId) => {
  try {
    const res = await axios({
      
      method: 'POST',
      url: `http://127.0.0.1:3000/api/v1/bookings/delete-from-list/${groceryId}`
      
    });

    if (res.status === 200) {
      showAlert('success', 'Grocery deleted successfully!');
      window.setTimeout(() => {
        location.assign('/my-lists');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};


export const addtolist = async (groceryId, currentQuantity) => {
  try {
    const res = await axios({
      
      method: 'POST',
      url: `http://127.0.0.1:3000/api/v1/bookings/add-to-list/${groceryId}`,
      data: {
        currentQuantity: currentQuantity
      }
      
    });

    if (res.status === 200) {
      showAlert('success', 'Added to list successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

