import React,{memo} from 'react'
import { Link } from 'react-router-dom'
import Button from './Button';

function Items({ thumbnail, title, category, price, id, rating }) {
  return (
    <div className='max-w-xs flex flex-col bg-stone-100'>
      <div className='w-full aspect-square' >
      <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className='bg-white flex flex-col grow'>
        <p className="text-gray-600 mt-2 ml-2">{category}</p>
        <h2 className="text-xl font-bold mt-1 ml-2 grow">{title}</h2>
        <p className="text-lg font-semibold mt-2 ml-2">${price}</p>
        <Button className="hover:border-red-500 hover:bg-red-500 border-red-400 border-4 bg-red-400 text-white px-10 py-2 my-4 rounded self-start ml-2">
          <Link to={"/details/" + id} >View Details</Link>
        </Button>    
      </div>
    </div>
  )
}
export default memo(Items);