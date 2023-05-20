import React, {useState, useEffect} from "react";
import axios from 'axios'
import { baseUrl } from "../../baseUrl";

const Dashboard = () => {

  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then();
  }, []);

  const fetchProducts = async () => {
    await axios
      .get(`${baseUrl}/api/lowstock`)
      .then((response) => {
        console.log(response);
        let temp = [];
        response.data.forEach((res) => {
          temp.push(res);
        });
        setLowStockProducts(temp);
      })
      .catch((err) => {
        console.log(err);
      })
  };
  return  <div className="adminUserContainer">
  <h2>Products less than 15 in Stock</h2>
 {
  lowStockProducts?(
    <table>
    <thead>
      <tr>
        <td>SN</td>
        <td>Product Title</td>
        <td>Price</td>
        <td>Action</td>
      </tr>
    </thead>
    <tbody>
      {lowStockProducts.map((product, i) => {
        const {title, price } = product;
        return (
          <tr key={i}>
            <td className="productId">{i + 1}</td>
            <td className="productTitle">{title}</td>
            <td>{price}</td>
            <td><button className="btn btn-warning btn-sm">Edit Now</button></td>
          </tr>
        );
      })}
    </tbody>
  </table>
  )
  :
  <h3>No Product Available</h3>
 }
</div>
};

export default Dashboard;
