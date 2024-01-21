'use client'
import { CartItems } from "@/types/types";
import { is } from "drizzle-orm";
import { createContext, useState, useEffect, ReactNode } from "react";

//@ts-expect-error
export const CartContext = createContext()

export type CartContextType = {
    cartItems: CartItems[];
    addToCart: (item: CartItems) => void;
    removeFromCart: (item: CartItems) => void;
    clearCart: () => void;
    getCartTotal: () => number;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItems[]>([]) // Add type annotation for cartItems

    function addToCart(item: CartItems) {
        const isItemExist = cartItems.find((cartItem: CartItems) => cartItem.id === item.id)

        if (isItemExist) {
            setCartItems(
                cartItems.map((cartItem: any) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
            );
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }])
        }
    }

    const removeFromCart = (item: CartItems) => {
        const isItemExist = cartItems.find((cartItem) => cartItem.id === item.id);
        if (isItemExist && isItemExist.quantity === 1) {
            setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
        } else {
            setCartItems(
                cartItems.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                )
            );
        }
    };

    function clearCart() {
        setCartItems([])
    }
    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };
    return (

        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
}

