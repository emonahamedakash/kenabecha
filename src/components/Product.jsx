import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Product.css";
import { useLocation, useNavigate } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaStar } from "react-icons/fa";
import ProductCard from "./ProductCard";
import { baseUrl } from "../baseUrl";
//cart
import ShopContext from "./cart/ShopContext";

const Product = () => {
  const { state } = useLocation();
  const { product } = state;
  const [relProducts, setRelProducts] = useState([]);
  console.log(product._id);
  const productId = product.id;

  const [reviews, setReview] = useState([]);

  const [user, setUser] = useState("Unknown");
  const [newReviewText, setNewReviewText] = useState("");
  const [newRating, setNewRating] = useState(0);

  let discountPrice = (product.discount / 100) * product.price;

  useEffect(() => {
    fetchRelProducts().then();
    fetchReviews().then();
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [product, reviews]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [product]);
  const fetchReviews = async () => {
    let temp = [];
    await axios
      .get(`${baseUrl}/api/review/${product._id}`)
      .then((response) => {
        console.log(response);
        response.data.forEach((res) => {
          temp.push(res);
        });
        setReview(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const formData = {
      productId,
      newRating,
      user,
      newReviewText,
    };
    axios
      .post(`${baseUrl}/api/review`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchRelProducts = async () => {
    let temp = [];
    await axios
      .get(`${baseUrl}/api/product`)
      .then((response) => {
        console.log(response);

        response.data.forEach((res) => {
          temp.push(res);
        });
        setRelProducts(temp);
      })
      .catch((err) => {
        console.log(err);
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

  //Cart
  const context = useContext(ShopContext);

  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="product__details row">
        <div
          className="product_details_image col-5"
          // style={{ width: "800px", height: "800px" }}
        >
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Wristwatch by Ted Baker London",
                isFluidWidth: true,
                src: product.image
                  ? product.image
                  : "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg",
              },
              largeImage: {
                src: product.image
                  ? product.image
                  : "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg",
                width: 1200,
                height: 800,
              },
            }}
          />
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
        <div className="product__description col-6">
          <h2 className="text-start text-success">{product.title}</h2>
          <h5 className="text-danger">
            Offer price: ${product.price - discountPrice}
          </h5>
          <p className="text-secondary text-6">
            Regular price: <del>${product.price}</del>
          </p>
          <p className="rating">
            <FaStar /> : {reviews ? reviews.length() : "No Rating yet"}
          </p>
          <p>{product.desc}</p>
          <button
            className="btn btn-outline-danger"
            onClick={context.addProductToCart.bind(this, product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <h2 className="product__list__title">Reviews</h2>
      <div className="review__container">
        <div className="review__list">
          {reviews.map((review, i) => {
            const { rating, reviewText, user } = review;

            return (
              <div className="review__card" key={i}>
                <p>
                  Created by: <b>{user}</b>
                </p>
                <p>Rating: {rating}</p>
                <p>Text: {reviewText}</p>
              </div>
            );
          })}
        </div>
        <form onSubmit={(e) => handleReviewSubmit(e)} className="new__review">
          <label>Enter Your Review:</label>
          <input
            type="text"
            name="newReviewText"
            onChange={(e) => setNewReviewText(e.target.value)}
          />
          <br />
          <label>Enter Your Rating:</label>
          <input
            type="number"
            name="newRating"
            onChange={(e) => setNewRating(e.target.value)}
          />
          <br />
          <button type="submit" className="btn btn-primary">
            Submit Review
          </button>
        </form>
      </div>
      <h2 className="product__list__title">Related Products</h2>
      <div className="row justify-content-center product__list mt-3">
        {relProducts
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
