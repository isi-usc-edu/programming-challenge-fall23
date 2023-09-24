// Import necessary dependencies
import { AppBar } from '@mui/material'; // Updated import
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './Home';
// import Store from './components/Store/store';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/cart" element={<Store />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
