import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const ViewCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/cart');
      setCartItems(response.data);
    } catch (err) {
      setError('Failed to fetch cart items.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (id, newQuantity) => {
    try {
      await axios.put(`http://localhost:8000/api/cart/update/${id}`, { quantity: newQuantity });
      fetchCartItems(); // Refresh cart items
    } catch (err) {
      setError('Failed to update cart item.');
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/cart/remove/${id}`);
      fetchCartItems(); // Refresh cart items
    } catch (err) {
      setError('Failed to remove cart item.');
    }
  };

  return (
    <div className="container">
      <h2>Shopping Cart</h2>
      {loading && <p>Loading cart items...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && cartItems.length === 0 && <p>Your cart is empty.</p>}
      {cartItems.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.product_name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <Form.Control
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  />
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <Button variant="danger" onClick={() => handleRemoveItem(item.id)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ViewCart;
