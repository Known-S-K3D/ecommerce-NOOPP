import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const Delete = ({ productId, onDeleteSuccess }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:8000/api/products/${productId}`);
        onDeleteSuccess(productId); // Trigger the callback to update the product list
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  return (
    <Button variant="danger" onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default Delete;
