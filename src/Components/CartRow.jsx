import React from "react";
import { CiCircleRemove } from "react-icons/ci";
import Button from "./Button";


function CartRow({ product, quantity, onQuantityChange, onRemove}) {

    function handleChange(event){
        onQuantityChange(product.id,+event.target.value);
    }

    function handleRemoveClick(){
        onRemove(product.id); 
    }

    return (
        <>
            <div className="flex items-center border border-gray-300 space-x-4 px-4 py-2 font-medium">
                <Button className="w-12 flex items-center text-3xl shadow-none text-gray-300">
                    <CiCircleRemove onClick={handleRemoveClick}/>
                </Button>
                <div className="w-24 h-20">
                    <img className="object-cover w-full h-full" src={product.thumbnail} alt={product.title} />
                </div>
                <h3 className="grow text-red-500 text-xl">{product.title}</h3>
                <span className="w-20 text-gray-700">${product.price}</span>
                <div className="w-32 font-normal">
                    <input
                        type="number"
                        min={1}
                        className="w-12 p-1 mx-2 border border-gray-200 rounded-md"
                        value={quantity}
                        onChange={handleChange}/>
                </div>
                <span className="w-20">${(product.price * quantity).toFixed(2)}</span>
            </div>
        </>
    )
}

export default CartRow;