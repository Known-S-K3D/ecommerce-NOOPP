// src/components/ViewProducts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Delete from './Delete'; // Import the Delete component

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        setProducts(response.data);
        setError(null); // Clear any previous errors
      } catch (error) {
        setError('Failed to fetch products.');
      } finally {
        setLoading(false); // Set loading to false after request completes
      }
    };
    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDeleteSuccess = (deletedId) => {
    // Remove the deleted product from the state
    setProducts(products.filter((product) => product.id !== deletedId));
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>View Products</h2>

      <Form.Group controlId="search">
        <Form.Control
          type="text"
          placeholder="Search Products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Barcode</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.barcode}</td>
                  <td>{product.description}</td>
                  <td>${Number(product.price).toFixed(2)}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(product.id)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Delete productId={product.id} onDeleteSuccess={handleDeleteSuccess} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default ViewProducts;
