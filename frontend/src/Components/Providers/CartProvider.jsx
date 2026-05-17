import { useCallback, useEffect, useMemo, useState } from "react";
import { CartContext } from '../Contexts';
import { getCart, getProductByIds, saveCart } from "../api";
import { withUser } from "../withProvider";

function CartProvider({ isLoggedIn, user, children }) {
    const [cart, setCart] = useState([]);
    useEffect(function () {
        if (isLoggedIn) {
            getCart().then(function (cartData) {
                if (cartData && cartData.items && Array.isArray(cartData.items)) {
                    const cartItems = cartData.items.map((item) => ({
                        product: item.product || item, 
                        quantity: item.quantity || 1,
                    }));
                    setCart(cartItems);
                } else {
                    setCart([]);
                }
            }).catch((err) => {
                console.error("Error loading cart:", err);
                setCart([]);
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
            if (cartItem && cartItem.product && cartItem.product.id) {
                return { ...m, [cartItem.product.id]: cartItem.quantity }
            }
            return m;
        }, {});
        const oldCount = quantityMap[productId] || 0;
        const newCart = { ...quantityMap, [productId]: oldCount + count };
        updateCart(newCart);
    }, [cart]);
    function updateCart(quantityMap) {
        if (isLoggedIn) {
            saveCart(quantityMap).then(function (response) {
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
            return previous + (current?.quantity || 0);
        }, 0);
    }, [cart]);

    return <>
        <CartContext.Provider value={{ cart, updateCart, cartCount, addToCart }}>{children}</CartContext.Provider>
        </>
}

export default withUser(CartProvider);