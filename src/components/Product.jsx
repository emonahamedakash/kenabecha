import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Slider from "./Slider";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ProductCard from "./ProductCard";
const Product = () => {
  const { state } = useLocation();
  const { product } = state;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then();
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });

  const fetchProducts = async () => {
    await axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        console.log(response);
        let temp = [];
        response.data.forEach((res) => {
          temp.push(res);
        });
        setProducts(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const navigate = useNavigate();
  console.log(product);
  return (
    <div className="container">
      <div className="product__details">
        <img
          src={product.image}
          alt="product"
          className="product__details__image"
        />
        <div className="product__description">
          <h3>{product.title}</h3>
          <h4>Price: ${product.price}</h4>
          <p className="rating">
            <FaStar /> : {product.rating.rate}
          </p>
          <p>{product.description}</p>
          <button className="btn btn-outline-danger">Add to Cart</button>
        </div>
      </div>
      <h2 className="product__list__title">Related Products</h2>
      <div className="row justify-content-center product__list mt-3">
        {products
          .filter((each) => each.category === product.category)
          .map((p, i) => {
            if (i > 3) {
              return null;
            } else {
              return (
                <ProductCard
                  key={i}
                  image={p.image}
                  title={p.title}
                  price={p.price}
                  btnFunction={() =>
                    navigate("/product", {
                      state: { product: p },
                    })
                  }
                />
              );
            }
          })}
      </div>
    </div>
  );
};

export default Product;
