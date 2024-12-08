import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Table, Form, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddProduct from '../Admin/AddProduct';  // Adjusted path
import Delete from '../Admin/Delete';          // Adjusted path

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all products from the backend API
  useEffect(() => {
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
    fetchProducts();
  }, []);

  // Handle searching products
  const filteredProducts = products.filter(product =>
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h2>Admin Dashboard</h2>
        </Col>
      </Row>

      {/* Add New Product Section */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>Add New Product</Card.Header>
            <Card.Body>
              <AddProduct />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Search Products Section */}
      <Row className="mb-4">
        <Col>
          <Form.Control
            type="text"
            placeholder="Search Products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>

      {/* Products List */}
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <Row>
          <Col>
            <Card>
              <Card.Header>Product List</Card.Header>
              <Card.Body>
                <Table striped bordered hover>
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
                        <td>${product.price}</td>
                        <td>{product.quantity}</td>
                        <td>
                          {/* Edit Button */}
                          <Link to={`/edit/${product.id}`}>
                            <Button variant="primary" className="me-2">
                              Edit
                            </Button>
                          </Link>

                          {/* Delete Button */}
                          <Delete
                            productId={product.id}
                            onDeleteSuccess={(id) =>
                              setProducts(products.filter((product) => product.id !== id))
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default AdminDashboard;
