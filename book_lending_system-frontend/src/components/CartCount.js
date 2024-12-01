import React, { useState, useEffect } from 'react';
import { getCartCount } from './api/cart';

const CartCount = () => {
    const [cartCount, setCartCount] = useState(0);

    const updateCartCount = async () => {
        try {
            const data = await getCartCount();
            setCartCount(data.count);
        } catch (error) {
            console.error('Failed to update cart count:', error.message);
        }
    };

    useEffect(() => {
        updateCartCount();
    }, []);

    return <div>Cart Items: {cartCount}</div>;
};

export default CartCount;
