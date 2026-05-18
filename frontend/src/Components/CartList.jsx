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
            {cart && cart.length > 0 ? (
                <div className="w-full">
                    {/* Header - Hidden on mobile, visible on tablet+ */}
                    <div className="hidden md:flex space-x-4 px-4 py-3 border border-gray-200 bg-stone-50 font-bold text-gray-700 text-sm lg:text-base">
                        <span className="flex-1">Product</span>
                        <span className="w-20 text-center">Price</span>
                        <span className="w-24 text-center">Quantity</span>
                        <span className="w-20 text-center">Subtotal</span>
                        <span className="w-12 text-center">Remove</span>
                    </div>
                    
                    {/* Cart Items */}
                    <div className="space-y-4 md:space-y-0">
                        {cart.map(function (cartItem) {
                            return <CartRow 
                                        key={cartItem.product.id} 
                                        product={cartItem.product} 
                                        quantity={quantityMap[cartItem.product.id] || cartItem.quantity} 
                                        onQuantityChange={handleQuantityChange}
                                        onRemove={handleRemove}/>
                        })}
                    </div>
                    
                    {/* Update Button */}
                    <div className="flex justify-end mt-6 md:mt-0 px-4 md:px-0 py-4 md:border md:border-gray-200 md:border-t-0">
                        <Button className="w-full md:w-auto bg-red-400 hover:bg-red-500 text-white px-6 md:px-8 py-3 rounded-lg font-semibold transition-colors" onClick={updateMyCart}>
                            Update Cart
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-500 mb-4">Your cart is empty</p>
                    <Button className="bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded-lg">
                        Continue Shopping
                    </Button>
                </div>
            )}
        </>
    );
}
export default withCart(CartList);