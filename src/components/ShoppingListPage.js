import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ShoppingListPage = () => {
  const [products, setProducts] = useState([]);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [productDetails, setProductDetails] = useState({});
  const [recognizedText, setRecognizedText] = useState('');
  const recognition = new window.webkitSpeechRecognition();
  const [filteredProducts, setFilteredProducts] = useState(products);



  recognition.onresult = (event) => {
    const lastResultIndex = event.results.length - 1;
    const recognized = event.results[lastResultIndex][0].transcript;
    setRecognizedText(recognized);
  };

  const startRecognition = () => {
    recognition.start();
  };
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

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products])

  const searchProducts = () => {
    const normalize = (word) => word.toLowerCase().replace(/s$/, ""); // 简单地移除末尾的's'来处理复数，这可能不适用于所有情况
    const searchTerm = recognizedText;
    const searchWords = searchTerm.split(/\s+/).map(normalize).filter(word => word.length > 0);
  
    const result = products.filter(product => {
      const titleWords = product.title.split(/\s+/).map(normalize);
      return searchWords.every(word => titleWords.includes(word));
    });
  
    setFilteredProducts(result);
  };

  const AddToCart = (product) => {
    const url = `https://fakestoreapi.com/products/`;

    const productData = {
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productData)
    })
    .then(res => {
      if (res.ok) {
        console.log(res)
        return res.json();
      } else {
        throw new Error('Failed to add product: ' + res.statusText);
      }
    })
    .then(json => {
      console.log(json);
    })
    .catch(error => {
      console.error('Error adding product:', error);
    });
  }


  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'auto' }}>
      <div className="row" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent" style={{ width: '100vw', height: '100px' }}>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active" style={{ paddingRight: '40px' }}>
                <a className="nav-link" href="/shopping-list" style={{ fontSize: '28px', fontWeight: 'bold', color: 'black' }}>
                  Grocery List
                  <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item" style={{ paddingRight: '40px' }}>
                <a className="nav-link" href="/cart-list" style={{ fontSize: '28px' }}>Cart List</a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0 d-flex align-items-center" style={{ padding: '20px' }}>
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ fontSize: '22px' }}
                value={recognizedText} // 绑定输入框的值到 recognizedText
                onChange={(e) => setRecognizedText(e.target.value)} // 处理输入框变化并更新 recognizedText
              />
              <div style={{ marginRight: '30px' }}></div>
              <button className="btn btn-outline-success my-2 my-sm-0" type="button" style={{ fontSize: '22px' }} onClick={searchProducts}>Search</button>
            </form>
            <button onClick={startRecognition}>Start Speech Recognition</button>
          </div>
        </nav>
      </div>
      <div style={{ height: '100vh', width: '100vw', overflow: 'auto' }}>
        {filteredProducts.map((product) => (
          <div key={product.id} style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            <h4 onClick={() => toggleDetails(product.id)} style={{ cursor: 'pointer', verticalAlign: 'middle', display: 'inline-block' }}>
              {product.title}
            </h4>
            {expandedProduct === product.id ? (
              <ExpandMoreIcon style={{ verticalAlign: 'middle', display: 'inline-block' }} />
            ) : (
              <ExpandMoreIcon style={{ verticalAlign: 'middle', display: 'inline-block', transform: 'rotate(270deg)' }} />
            )}
            {productDetails[product.id] && (
              <div style={{ display: 'flex' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid black', borderRightColor: 'transparent' }}>
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
                <Button onClick={() => AddToCart(product)}
                  variant="contained"
                  color="primary"
                  startIcon={<ShoppingCartIcon />}
                >
                  Add to Cart
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
