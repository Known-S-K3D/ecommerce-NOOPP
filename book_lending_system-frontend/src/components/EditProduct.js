import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../components/ProductForm";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Spinner, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async (productData) => {
    setError(null); // Reset error message

    // Client-side validation for price
    if (Number(productData.price) < 1) {
      setError("Price must be greater than or equal to 1.");
      return;
    }

    try {
      await axios.put(`http://localhost:8000/api/products/${id}`, productData);
      navigate("/"); // Redirect after update
    } catch (error) {
      setError("Failed to update product. Please try again.");
      console.error("Error updating product:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h5" className="text-center">
          Edit Product
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {product ? (
            <ProductForm product={product} onSubmit={handleUpdate} />
          ) : (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" />
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditProduct;
