
//const PDFDocument = require('pdfkit');
const fs = require('fs');
import axios from 'axios';
import jsPDF from 'jspdf';
import { showAlert } from './alerts';



function generatePDF(groceries) {


  const doc = new jsPDF();

  
  doc.setProperties({
    title: 'Grocery List',
  });

  
  let yPos = 10; 
  groceries.forEach((grocery, index) => {
    const text = `${index + 1}. ${grocery.name} - ${grocery.price}`;
    doc.text(10, yPos, text);
    yPos += 10; 
  });

  doc.save('grocery_list.pdf');
}

export const sendmail = async (grocery) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/bookings/share-email',
      data: {
        grocery
      }
    });

    if (res.data.status === 'success') {
      
      showAlert('success', 'Shared successfully!');
      window.setTimeout(() => {
        location.assign('/my-lists');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
  };

  module.exports = {
     generatePDF, sendmail
       };


