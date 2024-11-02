import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products");
        setProducts(response.data);
      } catch (error) {
        setError("Failed to fetch products.");
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:8000/api/products/${id}`);
        setProducts(products.filter((product) => product.id !== id));
      } catch (error) {
        setError("Failed to delete product.");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const filteredProducts = products.filter((product) =>
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>View Products</h2>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Search Products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Barcode</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>np
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.barcode}</td>
              <td>{product.description}</td>
              <td>${Number(product.price).toFixed(2)}</td>
              <td>{product.quantity}</td>
              <td>{product.category}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(product.id)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(product.id)} style={{ marginLeft: "5px" }}>
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
