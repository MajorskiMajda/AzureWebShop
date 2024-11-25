import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/Home';
import Jewelry from './components/Jewelry';
import ProductView from './components/ProductView';
import Orders from './components/Orders';
import CheckoutPage from './components/CheckoutPage';

function App() {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetch('https://azurewebshop.onrender.com/products') 
      .then((response) => response.json())
      .then((data) => setProductData(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jewelry" element={<Jewelry />} />
        <Route path="/product/:id" element={<ProductView products={productData} />} />
        <Route path="/cart" element={<CheckoutPage />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
