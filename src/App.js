import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//All component and pages
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Category from "./components/Category.jsx";
import Footer from "./components/Footer";
import Product from "./components/Product";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Registration from "./components/Registration";
import VerifyUserEmail from "./components/VerifyUserEmail";
//Admin Panel
import AdminPanel from "./components/admin/AdminPanel";
import Editproduct from "./components/admin/Editproduct";
import Cart from "./components/Cart";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:name" element={<Category />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/verifyuseremail" element={<VerifyUserEmail />} />

          //Admin Panel Routes
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/editproduct" element={<Editproduct />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
