import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const Store = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cartMessage, setCartMessage] = useState('');
  const [cartCount, setCartCount] = useState(0); // Cart count

  useEffect(() => {
    fetchProducts();
    fetchCartCount(); // Update cart count on page load
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
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

  const handleAddToCart = async (product) => {
    try {
      await axios.post('http://localhost:8000/api/cart', { 
        id: product.id, 
        description: product.description, 
        price: product.price,
        quantity: 1
      });
      setCartMessage(`${product.description} has been added to your cart!`);
      fetchCartCount(); // Update cart count after adding item
      setTimeout(() => setCartMessage(''), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error('Error adding to cart:', error);
      setCartMessage('Failed to add the product to your cart.');
    }
  };

  const filteredProducts = products.filter((product) =>
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <h2>Store</h2>
      {cartMessage && <p className="text-success">{cartMessage}</p>}
      <Row>
        <Col>
          <Form.Control
            type="text"
            placeholder="Search Products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.description}</td>
                  <td>${product.price}</td>
                  <td>
                    <Button 
                      variant="success" 
                      onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Store;
