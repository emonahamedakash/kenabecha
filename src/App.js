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
import Registration from "./components/Registration";
import AdminPanel from "./components/admin/AdminPanel";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:name" element={<Category />} />
          <Route path="/product" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
