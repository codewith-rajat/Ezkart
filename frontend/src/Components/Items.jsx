import {memo} from 'react'
import { Link } from 'react-router-dom'
import Button from './Button';

function Items({ thumbnail, title, category, price, id }) {
  return (
    <div className='w-full max-w-xs flex flex-col bg-stone-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow'>
      <div className='w-full aspect-square overflow-hidden bg-gray-200'>
        <img src={thumbnail} alt={title} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform" />
      </div>
      <div className='bg-white flex flex-col grow p-3 md:p-4'>
        <p className="text-gray-600 text-xs md:text-sm font-medium">{category}</p>
        <h2 className="text-base md:text-lg font-bold mt-2 grow line-clamp-2 hover:text-red-500 transition-colors">{title}</h2>
        <p className="text-lg md:text-xl font-semibold mt-2 text-red-500">${price}</p>
        <Button className="hover:border-red-500 hover:bg-red-500 border-red-400 border-2 md:border-4 bg-red-400 text-white px-6 md:px-10 py-2 mt-3 rounded font-semibold text-sm md:text-base transition-colors w-full">
          <Link to={"/products/" + id} >View Details</Link>
        </Button>    
      </div>
    </div>
  )
}
export default memo(Items);