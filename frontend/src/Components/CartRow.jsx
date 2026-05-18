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
            {/* Mobile Card View */}
            <div className="md:hidden bg-white flex border border-gray-200 rounded-lg p-4">
                <div className="w-40 h-40 flex-shrink-0">
                    <img className="object-cover w-full h-full rounded" src={product.thumbnail} alt={product.title} />
                </div>
                <div className="flex flex-col w-full pt-2 border-t border-gray-200">
                    <div className="flex-1 text-right">
                        <button 
                            onClick={handleRemoveClick}
                            className="text-gray-400 hover:text-red-500 text-2xl flex-shrink-0">
                            <CiCircleRemove />
                        </button>
                        <h3 className="text-left text-red-500 font-bold text-sm md:text-base mb-1">{product.title}</h3>
                        <p className="text-left text-gray-600 text-sm">${product.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Qty:</label>
                        <input
                            type="number"
                            min={1}
                            className="w-14 p-1 text-center border border-gray-300 rounded-md text-sm"
                            value={quantity}
                            onChange={handleChange}/>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Subtotal: 
                        <span className="font-bold text-red-500"> ${(product.price * quantity).toFixed(2)}</span></p>
                    </div>
                </div>
            </div>

            {/* Desktop Table Row View */}
            <div className="hidden md:flex items-center border border-gray-300 space-x-4 px-4 py-3 font-medium hover:bg-gray-50 transition-colors">
                <button 
                    onClick={handleRemoveClick}
                    className="w-8 h-8 flex items-center justify-center text-2xl text-gray-400 hover:text-red-500 flex-shrink-0">
                    <CiCircleRemove />
                </button>
                <div className="w-20 h-16 flex-shrink-0">
                    <img className="object-cover w-full h-full rounded" src={product.thumbnail} alt={product.title} />
                </div>
                <h3 className="flex-1 text-red-500 font-semibold text-sm lg:text-base">{product.title}</h3>
                <span className="w-20 text-center text-gray-700 text-sm">${product.price}</span>
                <div className="w-24 flex justify-center">
                    <input
                        type="number"
                        min={1}
                        className="w-14 p-1 text-center border border-gray-200 rounded-md text-sm"
                        value={quantity}
                        onChange={handleChange}/>
                </div>
                <span className="w-20 text-center font-bold text-red-500">${(product.price * quantity).toFixed(2)}</span>
            </div>
        </>
    )
}

export default CartRow;