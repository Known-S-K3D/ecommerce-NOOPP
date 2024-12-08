import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Spinner } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async (productData) => {
    try {
      await axios.put(`http://localhost:8000/api/products/${id}`, productData);
      navigate("/admin/dashboard"); // Redirect to Admin Dashboard after update
    } catch (error) {
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
