import React,{memo} from 'react'
import { MdOutlineShoppingBag } from 'react-icons/md'
import { Link } from 'react-router-dom';

function Navbar({cartCount}) {
  return (
    <div className='bg-white' >
        <nav className="mx-auto py-2 max-w-6xl flex justify-between">
            <img className="max-w-xl h-12 ml-24" src="https://static.vecteezy.com/system/resources/previews/014/018/563/non_2x/amazon-logo-on-transparent-background-free-vector.jpg" alt="logo" />
        <div className='flex flex-col items-center text-red-500' >
          <MdOutlineShoppingBag className='text-4xl' />
          <div className='-my-7' >
            <Link to={"/cart"}>{cartCount}</Link></div>
        </div>
        </nav>
    </div>
  )
}
export default memo(Navbar);