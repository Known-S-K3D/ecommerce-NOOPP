// src/App.js

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import ViewProducts from "./components/ViewProducts";
import Login from "./components/Login"; // Import your Login component
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  return (
    <Router>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Navbar.Brand as={Link} to="/">Product Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/add">Add Product</Nav.Link>
          </Nav>
          <Form inline className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/login">
              <FaUser /> Login/Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<ViewProducts />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/login" element={<Login onLogin={() => {}} />} /> {/* Add this line for the login route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
