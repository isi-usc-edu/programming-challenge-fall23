import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Store from './components/Store/Store';

function App() {
  const [products, setProducts] = useState([]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home products={products} setProducts={setProducts} />} // Pass 'products' and 'setProducts' as props
        />
        <Route path="/cart" element={<Store products={products} />} /> {/* Pass 'products' as a prop to Store */}
      </Routes>
    </Router>
  );
}

export default App;
