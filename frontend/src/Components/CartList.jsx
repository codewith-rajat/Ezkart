import { useEffect, useState } from "react";
import CartRow from "./CartRow"
import Button from "./Button";
import { withCart } from "./withProvider";

function CartList({ cart,updateCart }) {
    const [quantityMap, setQuantityMap] = useState({});

    const cartToQuantityMap = () =>
    cart.reduce((m, cartItem) => {
        if (cartItem?.product?.id) {
            m[cartItem.product.id] = cartItem.quantity;
        }
        return m;
    }, {});
    useEffect(function () {
        setQuantityMap(cartToQuantityMap());
    }, [cart]);

    function handleRemove(productId) {
        const newQuantityMap = cartToQuantityMap();
        delete newQuantityMap[productId];
        updateCart(newQuantityMap);
    }

     function handleQuantityChange(productId,newValue ) {
        const newQuantityMap = { ...quantityMap, [productId]: newValue };
        setQuantityMap(newQuantityMap);
    }

    function updateMyCart() {
        updateCart(quantityMap);
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
                {cart.map(function (cartItem) {
                    return <CartRow 
                                key={cartItem.product.id} 
                                product={cartItem.product} 
                                quantity={quantityMap[cartItem.product.id] || cartItem.quantity} 
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
export default withCart(CartList);