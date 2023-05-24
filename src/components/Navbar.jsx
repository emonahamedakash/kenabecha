import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import logo from "../assets/logo3.png";
import { baseUrl } from "../baseUrl";
import ShopContext from "./cart/ShopContext";

const Navigationbar = () => {
  const [categories, setCategories] = useState([
    "Electronics",
    "Grocery",
    "Fashion",
  ]);

  const [searchText, setSearchText] = useState("");

  const context = useContext(ShopContext);
  const cartData = context.cart;

  let userId = sessionStorage.getItem("user");

  const navigate = useNavigate();

  return (
    <div className="navigationBar">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link eventKey={1} as={Link} to="/">
                <h3 style={{ color: "white", textDecoration: "italic" }}>
                  KenaBecha
                </h3>
                {/* <img src={logo} alt="logo" style={{ width: "150px" }} /> */}
                {/* <Link to="/">KenaBecha</Link> */}
              </Nav.Link>
              <Nav.Link eventKey={2} as={Link} to="/">
                Home{" "}
              </Nav.Link>
              <NavDropdown title="Category" id="collasible-nav-dropdown">
                {categories.map((category, i) => {
                  return (
                    <NavDropdown.Item
                      eventKey={3 + i}
                      as={Link}
                      to={`/category/${category}`}
                      key={i}
                    >
                      {category.toUpperCase()}
                    </NavDropdown.Item>
                  );
                })}
                {/* <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">SEE ALL</NavDropdown.Item> */}
              </NavDropdown>
            </Nav>
            <Form
              className="d-flex"
              onSubmit={(e) => {
                e.preventDefault();
                navigate("/search", {
                  state: { searchText },
                });
              }}
            >
              <Form.Control
                type="search"
                placeholder="Search products"
                className="me-2"
                aria-label="Search"
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              <Button type="submit" variant="success">
                Search
              </Button>
            </Form>
            {/* <form className="d-flex">
              <inupt
                type="text"
                placeholder="Search product"
                // className="me-2"
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  navigate("search", {
                    state: { searchText },
                  });
                }}
                variant="outline-success"
              >
                Search
              </button>
            </form> */}
            <Nav>
              {userId ? (
                <Nav.Link as={Link} to="/profile">
                  <FaUserAlt /> Profile
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <FaUserAlt /> Login
                </Nav.Link>
              )}
              <Nav.Link href="#deets" as={Link} to="/cart">
                <FaShoppingCart /> {cartData.length}
                {/* Cart */}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default Navigationbar;
