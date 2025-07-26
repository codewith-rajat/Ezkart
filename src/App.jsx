import React, { useState,useCallback,useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import Details from './Components/Details';
import ItemListPage from './Components/ItemListPage';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import NotFound from './Components/NotFound';

function App() {

  const path = window.location.pathname;
  console.log("app rerunning")
  const savedCartString = localStorage.getItem("myCart") || "{}";
  const savedData = JSON.parse(savedCartString);
  
  const [cart, setCart] = useState(savedData);

  const handleAddToCart = useCallback(function (productId, count) {
    const oldCount = cart[productId] || 0;
    const newCart = { ...cart, [productId]: oldCount + count };
    setCart(newCart);
    const cartString = JSON.stringify(newCart);
    localStorage.setItem("myCart",cartString);
  },[cart]);
  
  const totalCount = useMemo(function(){
    return Object.keys(cart).reduce(function (previous, current) {
    return previous + cart[current];
  },0);
},[cart]);

return (
    <div className='bg-stone-100 flex flex-col h-screen overflow-auto' >
      <Navbar cartCount={totalCount} />
      <div className='grow' >
        <Routes>
          <Route index element={<ItemListPage />} />
          <Route path='/details/:id' element={<Details onAddToCart={handleAddToCart} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App