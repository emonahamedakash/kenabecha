import react, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import Recaptcha from "react-recaptcha";
import ReCAPTCHA from "react-google-recaptcha"

import "./Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //recaptcha
  // const captchaRef = useRef(null);
  // const token = captchaRef.current.getValue();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const token = captchaRef.current.getValue();
    // captchaRef.current.reset();

    const formData = {
      email, 
      password,
      // token
    }
    const response = await axios
    .post(`${baseUrl}/api/login`, JSON.stringify(formData, undefined, 5), {
      headers: { "Content-Type": "application/json" },
      withCredentials: false,
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Logged in Successfully...✅");
          console.log(response.data.message);
          sessionStorage.setItem("user", response.data.message._id);
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          alert("Wrong Password, try again...❌");
        } else if (error.response.status === 404) {
          alert("User not found, please register...❌");
        } else {
          alert("Something Went Wrong, try again...❌");
        }
      });
  };

  return (
    <div className="login__container">
      <Form
        className="login p-5"
        style={{ backgroundColor: "teal" }}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-light">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        {/* <ReCAPTCHA
        sitekey="6LcKSgUmAAAAAJfPNjod2KVwEyD6NkaI4XpOBp-_"
        ref={captchaRef}
        /> */}
        <Button variant="warning" type="submit"
        >
          Submit
        </Button>
        <br />
        <br />
        <Link to="/registration" className="loginLink">
          Register Here
        </Link>
        <br />
        <Link to="/adminpanel" className="loginLink">
          Admin Panel
        </Link>
      </Form>
    </div>
  );
}

export default Login;
