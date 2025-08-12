import { useCallback, useEffect, useMemo, useState } from "react";
import { CartContext } from '../Contexts';
import { getCart, getProductByIds, saveCart } from "../api";
import { withUser } from "../withProvider";

function CartProvider({ isLoggedIn, user, children }) {
    const [cart, setCart] = useState([]);
    useEffect(function () {
        if (isLoggedIn) {
            getCart().then(function (saveCart) {
                setCart(saveCart);
            });
        } else {
            const savedCartString = localStorage.getItem("myCart") || "{}";
            const savedData = JSON.parse(savedCartString);
            quantityMapToCart(savedData);   
        }
    }, [isLoggedIn]);

    function quantityMapToCart(quantityMap) {
        getProductByIds(Object.keys(quantityMap)).then(function (products) {
            const saveCart = products.map((p) => ({
                product: p,
                quantity:quantityMap[p.id],
            }));
            setCart(saveCart);
        })
    }

    const addToCart = useCallback(function (productId, count) {
        const quantityMap = cart.reduce(function (m, cartItem) {
            return { ...m, [cartItem.product.id]: cartItem.quantity }
        }, {});
        const oldCount = quantityMap[productId] || 0;
        const newCart = { ...quantityMap, [productId]: oldCount + count };
        updateCart(newCart);
    }, [cart]);
    function updateCart(quantityMap) {
        if (isLoggedIn) {
            saveCart(quantityMap).then(function (response) {
                //setCart(response);
                quantityMapToCart(quantityMap);
            });
        } else {
            const quantityMapString = JSON.stringify(quantityMap);
            localStorage.setItem("myCart", quantityMapString);
            quantityMapToCart(quantityMap);
        }
    }

    const cartCount = useMemo(function () {
        return cart.reduce(function (previous, current) {
            return previous + current.quantity;
        }, 0);
    }, [cart]);

    return <>
        <CartContext.Provider value={{ cart, updateCart, cartCount, addToCart }}>{children}</CartContext.Provider>
    </>
}

export default withUser(CartProvider);