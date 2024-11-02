// src/components/ProductForm.js

import React, { useState, useEffect } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";

const ProductForm = ({ product, onSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = { name, description, price, stock };
    onSubmit(productData);
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Edit Product</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="description">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="stock">
              <Form.Label>Stock:</Form.Label>
              <Form.Control
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Product
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductForm;
