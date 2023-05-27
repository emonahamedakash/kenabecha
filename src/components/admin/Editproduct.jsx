import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { baseUrl } from "../../baseUrl";
import axios from "axios";

const Editproduct = () => {
  const { state } = useLocation();
  const { product } = state;
  console.log(product);
  const id = product._id;
  const [newTitle, setNewTitle] = useState(product.title);
  const [newPrice, setNewPrice] = useState(product.price);
  const [newDesc, setNewDesc] = useState(product.desc);
  const [newStock, setNewStock] = useState(product.stock);
  const [newDiscount, setNewDiscount] = useState(product.discount);

  // const initialValues = {
  //   title: product.title,
  //   price: product.price,
  //   desc: product.desc,
  //   stock: product.stock,
  // };

  // const [formValues, setFormValues] = useState(initialValues);

  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("id", id);
    formData.append("title", newTitle);
    formData.append("price", newPrice);
    formData.append("desc", newDesc);
    formData.append("stock", newStock);
    formData.append("discount", newDiscount);
    // console.log(formValues);
    const response = await axios
      .put(
        `${baseUrl}/api/product/update`,
        // JSON.stringify(formValues, undefined, 5),
        // {id,newTitle, newPrice, newDesc, newStock},
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      )
      .then((response) => {
        alert("Product Updated Successfully");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = async () => {
    await axios
      .delete(`${baseUrl}/api/product/${product._id}`)
      .then((res) => {
        console.log(res);
        console.log("Product Deleted Successfully");
        navigate("/adminpanel");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="edit__product__container">
      <h2>Edit Products</h2>
      <div className="wrapper">
        <form>
          <div className="form__group">
            <label>Product Title</label>
            <input
              type="text"
              defaultValue={product.title}
              name="title"
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className="form__group">
            <label>Price</label>
            <input
              type="number"
              defaultValue={product.price}
              name="price"
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </div>
          <div className="form__group">
            <label>Stock</label>
            <input
              type="number"
              defaultValue={product.stock}
              name="stock"
              onChange={(e) => setNewStock(e.target.value)}
            />
          </div>
          <div className="form__group">
            <label>Discount</label>
            <input
              type="number"
              defaultValue={product.discount}
              name="discount"
              onChange={(e) => setNewDiscount(e.target.value)}
            />
          </div>
          <div className="form__group">
            <label>Description</label>
            <textarea
              type="text"
              defaultValue={product.desc}
              name="desc"
              onChange={(e) => setNewDesc(e.target.value)}
              rows={4}
              cols={74}
            />
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={(e) => handleUpdate(e)}
          >
            Edit Now
          </button>
          <button className="btn btn-danger btn-sm" onClick={handleDelete}>
            Delete
          </button>
        </form>
      </div>
    </div>
  );
};

export default Editproduct;
