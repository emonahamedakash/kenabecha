import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminPanel.css";
import ProductCard from "../ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchProducts().then();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    await axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        console.log(response);
        let temp = [];
        response.data.forEach((res) => {
          temp.push(res);
        });
        setProducts(temp);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const navigate = useNavigate();
  return (
    <div className="adminProductContainer">
      <div className="upperPart">
        <h2>Product</h2>
        <button className="btn btn-primary">Add Product</button>
      </div>
      <div className="bottomPart">
        <table>
          <thead>
            <tr>
              <td>Image</td>
              <td>Name</td>
              <td>Price</td>
              <td>Offer</td>
              <td>Purchased</td>
              <td>Stock</td>
              <td>Status</td>
              <td>Date</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => {
              return (
                <tr key={i}>
                  <td>
                    <img src={product.image} alt="" />
                  </td>
                  <td className="productTitle">{product.title}</td>
                  <td>{product.price}</td>
                  <td>No Offer</td>
                  <td>67</td>
                  <td>In stock</td>
                  <td>Active</td>
                  <td>10/08/2022</td>

                  <td>Info</td>
                </tr>
                // <ProductCard
                //   key={i}
                //   image={product.image}
                //   title={product.title}
                //   price={product.price}
                //   btnFunction={() =>
                //     navigate("product", {
                //       state: { product },
                //     })
                //   }
                // />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
