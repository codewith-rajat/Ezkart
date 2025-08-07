import React, { useState, useCallback, useMemo, useEffect, createContext } from 'react';
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
import Loading from './Components/Loading';
import axios from 'axios';
import UserRoute from './Components/UserRoute';
import AuthRoute from './Components/AuthRoute';
import { AlertContext, UserContext } from './Components/Contexts';
import Alert from './Components/Alert';


function App() {
  const savedCartString = localStorage.getItem("myCart") || "{}";
  const savedData = JSON.parse(savedCartString);

  const [cart, setCart] = useState(savedData);
  const [user, setUser] = useState();
  const [loadingUser, setLoadingUser] = useState(true);
  const [alert, setAlert] = useState({});

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      axios.get("https://myeasykart.codeyogi.io/me", {
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        setUser(response.data);
        setLoadingUser(false);
      }).catch(()=>{
        localStorage.removeItem("token");
        setLoadingUser(false);
      })
    } else {
      setLoadingUser(false);
    }
  }, []);

  const handleAddToCart = useCallback(function (productId, count) {
    setCart(function (prevCart) {
      const newCart = { ...prevCart, [productId]: (prevCart[productId] || 0) + count };
      localStorage.setItem("myCart", JSON.stringify(newCart));
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

  if (loadingUser) {
    return <Loading />
  }

  function removeAlert() {
    setAlert(undefined);
  }

  return (
    <div className='bg-stone-100 flex flex-col h-screen overflow-auto' >
      <div className='grow' >
        <UserContext.Provider value={{ user, setUser,setAlert }}>
          <AlertContext.Provider value={{ alert, setAlert, removeAlert }}>
            <Alert />
            <Navbar cartCount={totalCount} />
            <Routes>
              <Route index element={<UserRoute><ItemListPage /></UserRoute>} />
              <Route path='/details/:id' element={<Details onAddToCart={handleAddToCart} />} />
              <Route path='/cart' element={<CartPage cartData={cart} updateCart={updateCart} />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/login" element={<AuthRoute><Login setUser={setUser} /></AuthRoute>} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
            </Routes>
          </AlertContext.Provider>
        </UserContext.Provider>
      </div>
      <Footer />
    </div>
  );
}

export default App