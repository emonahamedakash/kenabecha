import React, { useState,useEffect } from "react";
import "./Profile.css";

import axios from "axios";
import { baseUrl } from "../baseUrl";

const Profile = () => {
  const [view, setView] = useState(<Orders/>);
  return (
    <div className="profile__container">
      <ul>
        <li onClick={() => setView(<Orders/>)} className="btn btn-primary">
          Orders
        </li>
        <li onClick={() => setView(<EditProfile/>)} className="btn btn-primary">
          Edit Profile
        </li>
      </ul>
      <div>{view}</div>
    </div>
  );
};

export default Profile;

const EditProfile = () => {
  return <div>Edit Profile</div>;
};

const Orders = () => {
  const [orders, setOrders] = useState([]);

  console.log(orders);
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    fetchOrders().then();
  }, []);

  const fetchOrders = async () => {
    await axios
      .get(`${baseUrl}/api/order`)
      .then((response) => {
        // console.log(response);
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
  return <div>
    <h2>My Orders</h2>
        <table>
          <thead>
            <tr>
              <td>SN</td>
              <td>Product Title</td>
              <td>Price</td>
              <td>Address</td>
              <td>Phone</td>
              <td>Creation Date</td>
            </tr>
          </thead>
          <tbody>
            {
            orders.filter((each)=>each.userId === user._id).map((order, i) => {
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
                   

                   
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
  </div>;
};
