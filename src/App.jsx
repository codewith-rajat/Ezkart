import React, { useState, useCallback, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import Details from './Components/Details';
import ItemListPage from './Components/ItemListPage';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import NotFound from './Components/NotFound';
import CartPage from './Components/CartPage';
import Login from './Components/Login'
import Signup from './Components/Signup'
import ForgotPassword from './Components/ForgotPassword';

function App() {

  const savedCartString = localStorage.getItem("myCart") || "{}";
  const savedData = JSON.parse(savedCartString);

  const [cart, setCart] = useState(savedData);

  const handleAddToCart = useCallback(function (productId, count) {
    setCart(function (prevCart) {
      const newCart = { ...prevCart, [productId]: (prevCart[productId] || 0) + count };
      localStorage.setItem("myCart",JSON.stringify(newCart));
      return newCart;
    });
  }, []);
  function updateCart(newCart) {
    setCart(newCart);
    const cartString = JSON.stringify(newCart);
    localStorage.setItem("myCart", cartString);
  }

  const totalCount = useMemo(function () {
    return Object.keys(cart).reduce(function (previous, current) {
      return previous + cart[current];
    }, 0);
  }, [cart]);

  return (
    <div className='bg-stone-100 flex flex-col h-screen overflow-auto' >
      <Navbar cartCount={totalCount} />
      <div className='grow' >
        <Routes>
          <Route index element={<ItemListPage />} />
          <Route path='/details/:id' element={<Details onAddToCart={handleAddToCart} />} />
          <Route path='/cart' element={<CartPage cartData={cart} updateCart={updateCart} />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App