import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";






import ReactImageMagnify from 'react-image-magnify';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaStar } from "react-icons/fa";
import Slider from "./Slider";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ProductCard from "./ProductCard";
import { baseUrl } from "../baseUrl";



const Product = () => {
  const { state } = useLocation();
  const { product } = state;
  const [products, setProducts] = useState([]);
  const [imgUrls, setImgUrls] = useState([])


  // const { state, dispatch: ctxDispatch } = useContext(Store);
// const {cart} = state;


  //Cart package start
  // const { addItem } = useCart();
  //Cart package end

  useEffect(() => {
    fetchProducts().then();
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });

  const fetchProducts = async () => {
    let temp = [];
    await axios
      .get("http://localhost:5000/api/product")
      .then((response) => {
        console.log(response);
        
        response.data.forEach((res) => {
          temp.push(res);
        });
        setProducts(temp);
      })
      .catch((err) => {
        console.log(err);
      });

      try {
        for(let each of temp){
          const res = await axios.get(`${baseUrl}/api/fetch-product-image/${each._id}`, {
            responseType: "blob"
          })

          const url = URL.createObjectURL(res.data)
          setImgUrls(prev => ({
            ...prev,
            [each.id]: url
          }))
        }
      } catch (err) {
        console.log(err.message)
      }

  

  };

  //Cart

  // let cart = JSON.parse(localStorage.getItem("cartData"));

  const handleCart = (item) => {

    //  const existItem = cart.cartItems.find((x) => x._id === product._id);
    //   const quantity = existItem ? existItem.quantity + 1 : 1; 


      // ctxDispatch({
      //     type: 'CART_ADD_ITEM',
      //     payload: { ...product, item },
      // });

    // addItem(id,1);
 
      // item.isAddedtoCart = false;
      // item.count = 0;
      // dispatch({
      //   type: ADD_CART_ITEM,
      //   payload: item,
      // });
 
    // const newCart = [...cart, product];

    // localStorage.setItem("cartData", JSON.stringify(newCart));
    // toast("Added to Cart✅");
    // console.log(cart);
  };

  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="product__details">
        <div className="product_details_image"
          style={{width:"50%"}}
        >
        <ReactImageMagnify {...{
    smallImage: {
        alt: 'Wristwatch by Ted Baker London',
        isFluidWidth: true,
        src: imgUrls[product.id]
        ? imgUrls[product.id]
        : "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"
    },
    largeImage: {
        src: imgUrls[product.id]
        ? imgUrls[product.id]
        : "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg",
        width: 800,
        height: 800
    }
}} />
        </div>
      
        {/* <img
          src={
            product.image
              ? product.image
              : "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"
          }
          alt="product"
          className="product__details__image"
        /> */}
        <div className="product__description">
          <h3>{product.title}</h3>
          <h4>Price: ${product.price}</h4>
          <p className="rating">
            <FaStar /> : {product.rating ? product.rating : "No Rating yet"}
          </p>
          <p>{product.desc}</p>
          <button className="btn btn-outline-danger">
            Add to Cart
          </button>
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
                  image={imgUrls[p.id]}
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
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Product;
