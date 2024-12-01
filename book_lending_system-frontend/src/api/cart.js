import React, { useEffect, useState } from 'react';
import { getCartCount } from './api/cart'; // Import the getCartCount function

function Cart() {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                const response = await getCartCount(); // Fetch count from the API
                setCartCount(response.count); // Store the count in the state
            } catch (error) {
                console.error('Error fetching cart count:', error);
            }
        };

        fetchCartCount();
    }, []);

    return (
        <div>
            <h1>Cart Count: {cartCount}</h1> {/* Render the count as a number */}
        </div>
    );
}

export default Cart;
