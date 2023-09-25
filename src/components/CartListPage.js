import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs



const ShoppingListPage = () => {
  const [products, setProducts] = useState([]);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [productDetails, setProductDetails] = useState({});
  const [deletedProducts, setDeletedProducts] = useState(new Set());

  const toggleDetails = (productId) => {
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [productId]: !prevDetails[productId],
    }));
    if (expandedProduct === productId) {
      setExpandedProduct(null);
    } else {
      setExpandedProduct(productId);
    }
  };

  const downloadPDF = () => {
    let docDefinition = {
      content: [
        { text: 'Product List', style: 'header' },
      ],
    };
  
    products.forEach(product => {

      if (!deletedProducts.has(product.id)) {
        docDefinition.content.push({ text: product.title, style: 'subheader' });
        docDefinition.content.push({ text: `Price: $${product.price}` });
        docDefinition.content.push({ text: `Category: ${product.category}` });
        docDefinition.content.push({ text: `Description: ${product.description}` });
        if (product.rating) {
          docDefinition.content.push({ text: `Rating: ${product.rating.rate} (${product.rating.count} reviews)` });
        }
        docDefinition.content.push({ text: '\n' }); // Add empty line between products
      }
    });
  
    pdfMake.createPdf(docDefinition).download('product-list.pdf');
  };
  

  const sendEmail = () => {
    const finalEmailBody = "Upload pdf from your computer， just download it. Please see right-up corner\n\n"
    const gmailLink = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=&su=Shopping%20List%20Information&body=${encodeURIComponent(finalEmailBody)}&ui=2&tf=1&shva=1`;
    downloadPDF();
    window.open(gmailLink, '_blank');
  };

  const DeleteFromCart = (productId) => {
    const url = `https://fakestoreapi.com/products/${productId}`;
    fetch(url, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          console.log(res)
          setDeletedProducts((prev) => new Set(prev).add(productId));
        } else {
          console.error('Failed to delete product:', res.statusText);
        }
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  }

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  })


  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'auto' }}>
      <div className="row" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent" style={{ width: '100vw', height: '100px' }}>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active" style={{ paddingRight: '40px' }}>
                <a className="nav-link" href="/shopping-list" style={{ fontSize: '28px' }}>
                  Shopping List

                </a>
              </li>
              <li className="nav-item" style={{ paddingRight: '40px' }}>
                <a className="nav-link" href="/cart-list" style={{ fontSize: '28px', fontWeight: 'bold', color: 'black' }}>
                  Cart List
                  <span className="sr-only">(current)</span>
                </a>
              </li>
            </ul>
            <button onClick={sendEmail} className="btn btn-outline-success my-2 my-sm-0" style={{ fontSize: '22px' }}>Send Email</button>
            <p style={{ paddingRight: '20px' }}>      </p>
            <button onClick={downloadPDF} className="btn btn-outline-success my-2 my-sm-0" style={{ fontSize: '22px' }}>Save as PDF</button>
          </div>
        </nav>
      </div>
      <div style={{ height: '100vh', width: '100vw', overflow: 'auto' }}>
        {products.map((product) => (
          <div key={product.id} style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            {!deletedProducts.has(product.id) && (
              <div>
                <h4 onClick={() => toggleDetails(product.id)} style={{ cursor: 'pointer', verticalAlign: 'middle', display: 'inline-block' }}>
                  {product.title}
                </h4>
                {expandedProduct === product.id ? (
                  <ExpandMoreIcon style={{ verticalAlign: 'middle', display: 'inline-block' }} />
                ) : (
                  <ExpandMoreIcon style={{ verticalAlign: 'middle', display: 'inline-block', transform: 'rotate(270deg)' }} />
                )}
              </div>
            )}

            {productDetails[product.id] && !deletedProducts.has(product.id) && (
              <div style={{ display: 'flex' }}>
                <table style={{ width: '90%', borderCollapse: 'collapse', border: '2px solid black' }}>
                  <tbody>
                    <tr>
                      <td>
                        <div>
                          <p>Price: ${product.price}</p>
                          <p>Category: {product.category}</p>
                          <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
                          <p>{product.description}</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table style={{ width: '10%', borderCollapse: 'collapse', border: '2px solid black' }}>
                  <tbody>
                    <tr>
                      <td>
                        <img src={product.image}
                          alt={product.title}
                          style={{
                            width: '100px',
                            margin: '0 auto', // display mid
                            display: 'block' // display mid
                          }} />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Button onClick={() => DeleteFromCart(product.id)}
                  variant="contained"
                  style={{ backgroundColor: 'red', color: 'white' }}
                  startIcon={<ShoppingCartIcon />}
                >
                  Delete from cart
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

  );
};

export default ShoppingListPage;
