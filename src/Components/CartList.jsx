import React, { useEffect, useState } from "react";
import CartRow from "./CartRow"
import Button from "./Button";

function CartList({ cartData, products,updateCart }) {
    const [localCart, setLocalCart] = useState(cartData);

    useEffect(function () {
        setLocalCart(cartData);
    }, [cartData]);

    function handleRemove(productId) {
        const newCart = { ...cartData };
        delete newCart[productId];
        updateCart(newCart);
    }

     function handleQuantityChange(productId,newValue ) {
        const newLocalCart = { ...localCart, [productId]: newValue };
        setLocalCart(newLocalCart);
    }

    function updateMyCart() {
        updateCart(localCart);
    }

    return (
        <>
            <div>
                <div className="flex space-x-4 px-4 py-2 border border-gray-200 bg-stone-50 font-bold text-gray-700">
                    <span className="ml-45 grow">Product</span>
                    <span className="w-20">Price</span>
                    <span className="w-32">Quantity</span>
                    <span className="w-20">Subtotal</span>
                </div>
                {products.map(function (p) {
                    return <CartRow 
                                key={p.id} 
                                product={p} 
                                quantity={localCart[p.id]} 
                                onQuantityChange={handleQuantityChange}
                                onRemove={handleRemove}/>
                })}
            </div>
            <div className="flex justify-end px-8 border border-gray-200 items-center">
                <Button className="bg-red-400 text-white px-4" onClick={updateMyCart}>Update Cart</Button>
            </div>
        </>
    );
}
export default CartList;