import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import logo from "../assets/logo2.jpg";

const Navigationbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then();
  }, []);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    await axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => {
        const temp = [];
        response.data.forEach((res) => {
          temp.push(res);
        });
        setCategories(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="navigationBar">
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link eventKey={1} as={Link} to="/">
                <img src={logo} alt="logo" style={{ width: "150px" }} />
                {/* <Link to="/">KenaBecha</Link> */}
              </Nav.Link>
              <Nav.Link eventKey={2} as={Link} to="/">
                Home{" "}
              </Nav.Link>
              <NavDropdown title="Shop" id="collasible-nav-dropdown">
                {categories.map((category, i) => {
                  return (
                    <NavDropdown.Item
                      eventKey={3 + i}
                      as={Link}
                      to={`/category/${category}`}
                      key={i}
                      //   onClick={() => {
                      //     navigate("/category", {
                      //       state: { category: category.name },
                      //     });
                      //   }
                      // }
                    >
                      {category.toUpperCase()}
                      {/* <button
                        onClick={() => {
                          navigate("/category", {
                            state: { category: category.name },
                          });
                        }}
                      >
                        {category.toUpperCase()}
                      </button> */}
                    </NavDropdown.Item>
                  );
                })}

                {/* <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item> */}
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">SEE ALL</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#features">Blog</Nav.Link>
              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/login">
                {" "}
                <FaUserAlt /> Login
              </Nav.Link>
              <Nav.Link href="#deets">
                <FaShoppingCart /> Cart 0
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
