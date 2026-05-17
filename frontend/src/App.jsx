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
import UserRoute from './Components/UserRoute';
import AuthRoute from './Components/AuthRoute';
import Alert from './Components/Alert';
import UserProvider from './Components/Providers/UserProvider';
import AlertProvider from './Components/Providers/AlertProvider';
import CartProvider from './Components/Providers/CartProvider';


function App() {
  return (
    <div className='bg-stone-100 flex flex-col h-screen overflow-auto' >
      <div className='grow' >
        <AlertProvider>
          <UserProvider>
            <CartProvider>
              <Navbar />
              <Alert />
              <Routes>
                <Route index element={<UserRoute><ItemListPage /></UserRoute>} />
                <Route path='/products/:id' element={<Details />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
              </Routes>
            </CartProvider>
          </UserProvider>
        </AlertProvider>
      </div>
      <Footer />
    </div>
  );
}

export default App