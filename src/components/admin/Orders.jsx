import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../baseUrl";
import "./AdminPanel.css";

const Orders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders().then();
  }, []);

  const fetchOrders = async () => {
    await axios
      .get(`${baseUrl}/api/order`)
      .then((response) => {
        console.log(response);
        let temp = [];
        response.data.forEach((res) => {
          temp.push(res);
        });
        setOrders(temp);
      })
      .catch((err) => {
        console.log(err);
      })
  };


  const handleOrder= async (id)=>{
    alert("Confirm Delivery?");
  console.log(id); 
  const formData = new FormData();
  formData.append("id", id);
  
      await axios.put(
        `${baseUrl}/api/delivery`,
        formData,
        {headers: { "Content-Type": "application/json" }}
      ).then((response)=>{
        console.log(response);
      }).catch((error)=>{
        console.log(error);
      })
  }

  return (
    <div className="adminUserContainer">
        <h2>Orders</h2>
        <table>
          <thead>
            <tr>
              <td>SN</td>
              <td>Product Title</td>
              <td>Price</td>
              <td>Address</td>
              <td>Phone</td>
              <td>Date</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => {
              const {title, price, address, phone, date, isDelivered} = order;
              return (
                <tr key={i}>
                  <td className="productId">{i + 1}</td>
                  <td className="productTitle">{title}</td>
                  <td>{price}</td>
                  <td>{address}</td>
                  <td>{phone}</td>
                  <td>{date}</td>

                  <td>
                    {
                        isDelivered?
                        <p 
                        className="btn btn-outline-success btn-sm"
                        >
                          Delivered
                        </p>
                        :
                        <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={()=>handleOrder(order._id)}
                      >
                        Pending
                      </button>
                    }

                   
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
  );
};

export default Orders;
