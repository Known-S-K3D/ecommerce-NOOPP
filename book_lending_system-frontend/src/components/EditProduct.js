// src/pages/EditProduct.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../components/ProductForm"; // Adjust import based on your structure
import { useParams, useNavigate } from "react-router-dom";

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
      navigate("/"); // Redirect after update
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      {product ? (
        <ProductForm product={product} onSubmit={handleUpdate} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditProduct;
