import React, {useState, useContext} from 'react'
import { useLocation } from 'react-router-dom'
import {baseUrl} from "../../baseUrl";
import axios from "axios";
import ShopContext from './ShopContext';
import "./Checkout.css";


const Checkout = () => {
    const [phone, setPhone] = useState("Test");
    const [address, setAddress] = useState("Test");
    const context = useContext(ShopContext);
    const cartData= context.cart;
    let user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user);
    const userId = user._id;
    
  console.log(cartData);
    const submitOrder = async (e)=>{
      e.preventDefault();
      axios.post(`${baseUrl}/api/order`, {cartData,phone, address, userId})
      .then((res)=>console.log("axios res: ", res))
      .catch((err)=>console.log(err))
      alert("Order is submitted");
    }

  return (
    <div className='checkout__container'>
      <h2>Checkout Page</h2>
        <form>
            <label>Enter Receiver Address: </label><br />
            <input type='text' name="address" onChange={(e)=>setAddress(e.target.value)} /> <br />
            <label>Enter Receiver Phone Number: </label><br />
            <input type='text' name="phone" onChange={(e)=>setPhone(e.target.value)} />
            <br />
            <br />

            <button className='btn btn-primary' onClick={submitOrder}>Confirm Order</button>
        </form>
    </div>
  )
}

export default Checkout