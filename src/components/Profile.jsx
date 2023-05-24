import React, { useState,useEffect } from "react";
import "./Profile.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import axios from "axios";
import { baseUrl } from "../baseUrl";

const Profile = () => {
  const [view, setView] = useState(<Orders/>);
 
  return (
    <div className="profile__container">
      <ul>
        <li onClick={() => setView(<Orders/>)} className="btn btn-primary btn-lg">
          Orders
        </li>
        <li onClick={() => setView(<EditProfile/>)} className="btn btn-primary btn-lg">
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

  const [currentData, setCurrentData] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setCurrentData(e) 
    setShow(true);
  }
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
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{currentData}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        <table>
          <thead>
            <tr>
              <td>SN</td>
              <td>Product Title</td>
              <td>Price</td>
              <td>Address</td>
              <td>Phone</td>
              <td>Creation Date</td>
              <td>Invoice</td>
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
                    <button className="btn btn-warning btn-sm" onClick={()=>{
                      handleShow(order)
                    
                    }}>Invoice</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
  </div>;
};
