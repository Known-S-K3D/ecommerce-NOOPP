import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // For navigation to Edit page

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products from the backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Add product to cart
  const handleAddToCart = async (product) => {
    try {
      await axios.post('http://localhost:8000/cart/add', {
        id: product.id,
        name: product.description,
        price: product.price,
        quantity: 1,
      });
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error.response ? error.response.data : error.message);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  // Delete a product from the backend
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`);
      // Remove product from the UI without a page reload
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Products</h2>
      {/* Search bar */}
      <Form.Control
        type="text"
        placeholder="Search Products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-3"
      />
      <Table striped bordered>
        <thead>
          <tr>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.description}</td>
              <td>${Number(product.price).toFixed(2)}</td>
              <td>{product.quantity}</td>
              <td>
                {/* Add to Cart button */}
                <Button onClick={() => handleAddToCart(product)} variant="success" className="me-2">
                  Add to Cart
                </Button>
                {/* Edit button, linking to the edit page */}
                <Link to={`/edit/${product.id}`}>
                  <Button variant="primary" className="me-2">
                    Edit
                  </Button>
                </Link> 
                {/* Delete button */}
                <Button onClick={() => handleDeleteProduct(product.id)} variant="danger">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ViewProducts;