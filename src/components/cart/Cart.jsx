import React, { useEffect, useContext } from "react";
import "./Cart.css";

import ShopContext from "./ShopContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {

  const context = useContext(ShopContext);

  useEffect(() => {
    console.log(context);
  }, []);



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
        {context.cart.length !== 0 ? (
          context.cart.map((each, index) => {
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
              {/* <td>{totalPrice}</td> */}
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
