import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Loader from "./Loader";
import ProductCard from "./ProductCard";
import { baseUrl } from "../baseUrl";
const Category = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { name } = useParams();
  console.log(name);

  useEffect(() => {
    fetchProducts().then();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    await axios
      .get(`${baseUrl}/api/product`)
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const navigate = useNavigate();
  return (
    <div>
      <h2 className="product__list__title">{name.toUpperCase()}</h2>
      {loading ? (
        <Loader />
      ) : (
        <div className="row justify-content-center product__list mt-3">
          {products
            .filter(
              (each) => each.category?.toLowerCase() === name.toLowerCase()
            )
            .map((product, i) => {
              return (
                <ProductCard
                  key={i}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  btnFunction={() =>
                    navigate("/product", {
                      state: { product },
                    })
                  }
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Category;
