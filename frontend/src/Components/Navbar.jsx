import { memo, useState } from 'react'
import { MdOutlineShoppingBag, MdClose, MdMenu } from 'react-icons/md'
import { Link } from 'react-router-dom';
import Button from './Button';
import { withCart, withUser } from './withProvider';

function Navbar({ cartCount, user, setUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  function handleUserLogin(){
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    setUser(undefined);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <div className='bg-white sticky top-0 z-50 shadow-md'>
      <nav className="mx-auto py-2 md:py-3 max-w-6xl flex justify-between items-center px-4 md:px-6 lg:px-9">
        
        {/* Logo */}
        <img 
          className="h-10 md:h-12 object-contain" 
          src="https://static.vecteezy.com/system/resources/previews/014/018/563/non_2x/amazon-logo-on-transparent-background-free-vector.jpg" 
          alt="logo" 
        />
        
        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-4 lg:gap-6'>
          {/* Cart */}
          <Link 
            to="/cart" 
            className='flex flex-col items-center text-red-500 hover:text-red-600 relative transition-colors'>
            <MdOutlineShoppingBag className='text-3xl md:text-4xl' />
            {cartCount > 0 && (
              <span className='absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                {cartCount}
              </span>
            )}
          </Link>
          
          {/* Auth Buttons */}
          {user && (
            <Button 
              className="px-4 py-2 text-red-500 bg-white border-2 md:border-3 border-red-400 rounded-lg hover:bg-red-50 transition-colors font-semibold text-sm md:text-base" 
              onClick={handleUserLogin}>
              <Link to="/login">Logout</Link>
            </Button>
          )}
          {!user && (
            <Button 
              className="px-4 py-2 text-red-500 bg-white border-2 md:border-3 border-red-400 rounded-lg hover:bg-red-50 transition-colors font-semibold text-sm md:text-base">
              <Link to="/signup">Sign up</Link>
            </Button>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className='md:hidden flex items-center gap-4'>
          {/* Cart Icon */}
          <Link 
            to="/cart" 
            className='flex flex-col items-center text-red-500 hover:text-red-600 relative transition-colors'
            onClick={closeMenu}>
            <MdOutlineShoppingBag className='text-2xl' />
            {cartCount > 0 && (
              <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center text-xs'>
                {cartCount}
              </span>
            )}
          </Link>
          
          {/* Hamburger Menu */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='text-2xl text-red-500 hover:text-red-600 p-1'>
            {isMenuOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className='md:hidden bg-gray-50 border-t border-gray-200 px-4 py-4 space-y-3'>
          {user && (
            <Button 
              className="w-full px-4 py-2 text-red-500 bg-white border-2 border-red-400 rounded-lg hover:bg-red-50 transition-colors font-semibold" 
              onClick={() => {
                handleUserLogin();
                closeMenu();
              }}>
              <Link to="/login">Logout</Link>
            </Button>
          )}
          {!user && (
            <Button 
              className="w-full px-4 py-2 text-red-500 bg-white border-2 border-red-400 rounded-lg hover:bg-red-50 transition-colors font-semibold"
              onClick={closeMenu}>
              <Link to="/signup">Sign up</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
export default withCart(memo(withUser(Navbar)));