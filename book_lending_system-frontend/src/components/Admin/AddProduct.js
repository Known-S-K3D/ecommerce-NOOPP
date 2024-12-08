import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Spinner, Form, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';

function AddProduct() {
  const [barcode, setBarcode] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generateBarcode = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString(); 
  };

  useEffect(() => {
    setBarcode(generateBarcode());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await axios.post("http://localhost:8000/api/products", {
        barcode,
        description,
        price,
        quantity,
        category,
      });
      setSuccess(true);
      setDescription("");
      setPrice("");
      setQuantity("");
      setCategory("");
      setBarcode(generateBarcode());
    } catch (error) {
      setError("Failed to add product. Please try again.");
      console.error("Add Product Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h5" className="text-center">Add Product</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="barcode">
              <Form.Label>Barcode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Barcode"
                value={barcode}
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="category" className="mb-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" className="mt-4 text-center" type="submit" disabled={isLoading}>
              {isLoading ? <Spinner animation="border" size="sm" /> : "Add Product"}
            </Button>
          </Form>

          {error && <Card.Text className="mt-3 text-danger">{error}</Card.Text>}
          {success && (
            <Card.Text className="mt-3 text-success">
              Product added successfully!
            </Card.Text>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddProduct;
