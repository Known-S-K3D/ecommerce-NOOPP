import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0); // Cart count
  
  useEffect(() => {
    fetchCartItems();
    fetchCartCount();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/cart');
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const fetchCartCount = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/cart/count');
      setCartCount(response.data.count);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  const handleUpdateQuantity = async (id, quantity) => {
    try {
      await axios.put(`http://localhost:8000/api/cart/update/${id}`, { quantity });
      fetchCartItems(); // Refresh cart items after updating quantity
      fetchCartCount(); // Update cart count after change
      await axios.put(`http://localhost:8000/api/cart/${id}`, { quantity });
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/cart/remove/${id}`);
      fetchCartItems(); // Refresh cart items after removal
      fetchCartCount(); // Update cart count after removal
      await axios.delete(`http://localhost:8000/api/cart/${id}`);
      fetchCartItems();
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  const grandTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Shopping Cart</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.description}</td>
              <td>
                <Form.Control
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleUpdateQuantity(item.id, parseInt(e.target.value))
                  }
                />
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>
      <p>Items in Cart: {cartCount}</p> {/* Display Cart Count */}
    </div>
  );
};

export default Cart;
