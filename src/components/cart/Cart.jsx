import React, { useEffect, useState } from "react";
import "./Cart.css";

import { CartContext } from "./CartContext";
import {REMOVE_CART_ITEM} from "./action-types"

// import { useCart } from "react-use-cart";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  // const [cartData, setCartData] = useState(cart);
  const { cartItem, dispatch } = useContext(CartContext);

const [totalPrice, setTotalPrice] = useState(0);
const [totalCartItems, setTotalCartItems] = useState(0);

const calculateTotal = () => {
  let totalAmount = 0;
  let totalCart = 0;
  cartItem.map((item) => {
    totalAmount = totalAmount + item.count * parseFloat(item.productPrice);
    totalCart = totalCart + item.count;
  });
  setTotalPrice(totalAmount);
  setTotalCartItems(totalCart);
};

useEffect(() => {
  calculateTotal();
}, [cartItem]);
const removeFromCart = (item) => {
  item.isAddedtoCart = false;
  item.count = 0;
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: item,
  });
};



  // const total = () => {
  //   let total = 0;
  //   cartData.map((ele) => {
  //     total = parseFloat(ele.price) + total;
  //   });
  //   setTotalPrice(total);
  // };
  // useEffect(() => {
  //   total();
  // }, [total]);

  // const handleRemove = (id) => {
  //   const newCart = cart.filter((product) => product._id !== id);
  //   localStorage.setItem("cartData", newCart);
  //   setCartData(newCart);
  //   toast("Deleted from cart✅");
  // };

  return (
    <div className="cart__container">
      <h2
        style={{
          backgroundColor: "teal",
          color: "white",
          textAlign: "center",
          padding: "10px",
        }}
      >
        Cart
      </h2>
      <div className="cart__list">
        {cartItem.length !== 0 ? (
          cartItem.map((each, index) => {
            return (
              <div key={index} className="row mb-2">
                <div className="col-md-1">{index + 1}</div>
                <div className="col-md-2">
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src={
                      each.image
                        ? each.image
                        : "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"
                    }
                  />
                </div>
                <p className="col-md-4">{each.title}</p>
                <p className="col-md-2">{each.price}</p>
                <div className="col-md-2">
                  <input
                    style={{ width: "50px" }}
                    className="p-2"
                    type="number"
                    name="quantity"
                    defaultValue={1}
                    min={1}
                  />
                </div>
                <button
                  className="btn btn-outline-danger btn-sm col-md-1"
                  onClick={()=> removeFromCart(each)}
                  // onClick={() => {
                  //   handleRemove(each._id);
                  // }}
                >
                  Remove
                </button>
                <br />
                <hr />
              </div>
            );
          })
        ) : (
          <div className="empty__cart">
            <h2>Cart is empty</h2>
          </div>
        )}
      </div>
      <div className="checkout__container">
        <table width="100%">
          <tbody>
            <tr>
              <td>Total Price:</td>
              <td>{totalPrice}</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <button className="btn btn-primary w-100">Order now</button>
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

export default Cart;
