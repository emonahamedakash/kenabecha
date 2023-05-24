import React, { useState } from "react";
import Products from "./Products";
import "./AdminPanel.css";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Users from "./Users";
import { FaAngleRight } from "react-icons/fa";

const AdminPanel = () => {
  const [comp, setComp] = useState(<Dashboard />);

  return (
    <div className="adminPanel">
      <ul>
        <li>
          <button
            className="btn btn-primary"
            onClick={() => setComp(<Dashboard />)}
          >
            Low Stock <FaAngleRight />
          </button>
        </li>
        <li>
          <button
            className="btn btn-primary"
            onClick={() => setComp(<Orders />)}
          >
            Orders
            <FaAngleRight />
          </button>
        </li>
        <li>
          <button
            className="btn btn-primary"
            onClick={() => setComp(<Products />)}
          >
            Products
            <FaAngleRight />
          </button>
        </li>
        <li>
          <button
            className="btn btn-primary"
            onClick={() => setComp(<Users />)}
          >
            Users
            <FaAngleRight />
          </button>
        </li>
      </ul>
      <div className="adminComponent">{comp}</div>
    </div>
  );
};

export default AdminPanel;
