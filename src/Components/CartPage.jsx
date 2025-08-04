import React, { useState, useEffect } from "react";
import CartList from "./CartList";
import Loading from "./Loading";
import { getProductData } from './api.js'

function CartPage({ cartData, updateCart }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(function () {
        setLoading(true);
        const ids = Object.keys(cartData);
        const promises = ids.map(function (id) {
            return getProductData(id);
        });

        Promise.all(promises).then(function (products) {
            setItems(products)
            setLoading(false);
        });
    }, [cartData]);
 
    if (loading) {
        return <Loading />
    }

    return (
        <div className="mt-20 px-24 py-20 bg-white max-w-6xl mx-auto">
            <CartList
                cartData={cartData}
                products={items} 
                updateCart={updateCart}/>
        </div>
    );
}
export default CartPage; 