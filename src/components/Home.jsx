import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../baseUrl";
import axios from "axios";
import Slider from "./Slider";

import Loader from "./Loader";
import ProductCard from "./ProductCard";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    fetchProducts().then();
  }, []);

  const fetchProducts = async () => {
    let temp = [];
    setLoading(true);
    await axios
      .get(`${baseUrl}/api/product`)
      .then((response) => {
        console.log(response);

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

    // try {
    //   for(let each of temp){
    //     const res = await axios.get(`${baseUrl}/api/fetch-product-image/${each._id}`, {
    //       responseType: "blob"
    //     })

    //     const url = URL.createObjectURL(res.data)
    //     setImgUrls(prev => ({
    //       ...prev,
    //       [each.id]: url
    //     }))
    //   }
    // } catch (err) {
    //   console.log(err.message)
    // }
  };

  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <Slider />
      {loading ? (
        <div className="loading justify-content-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="latest__products">
            <h2 className="product__list__title">Latest Products</h2>
            <div className="row justify-content-center product__list mt-3">
              {products.map((product, i) => {
                return (
                  <ProductCard
                    key={i}
                    image={product.image}
                    title={product.title}
                    price={product.price}
                    discount={product.discount}
                    btnFunction={() =>
                      navigate("product", {
                        state: { product },
                      })
                    }
                  />
                );
              })}
            </div>
          </div>
          <div className="electronics">
            <h2 className="product__list__title">Electronics</h2>
            <div className="row justify-content-center product__list mt-3">
              {products
                .filter((each) => each.category === "electronics")
                .map((product, i) => {
                  return (
                    <ProductCard
                      key={i}
                      image={product.image}
                      title={product.title}
                      price={product.price}
                      btnFunction={() =>
                        navigate("product", {
                          state: { product },
                        })
                      }
                    />
                  );
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
