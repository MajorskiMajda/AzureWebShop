import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]); 

    const addToCart = (product) => {
        setCartItems((prevCart) => {
            const productExists = prevCart.find((item) => item._id === product._id);

            if (productExists) {
                return prevCart.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const updateQuantity = (productId, newQuantity) => {
        setCartItems((prevCart) =>
            prevCart.map((item) =>
                item._id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const removeFromCart = (productId) => {
        setCartItems((prevCart) => prevCart.filter((item) => item._id !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartQuantity = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                getCartQuantity, 
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
