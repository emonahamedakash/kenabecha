import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { baseUrl } from "../../baseUrl";
import axios from "axios";

const Editproduct = () => {
  const { state } = useLocation();
  const { product } = state;
  console.log(product);

  const initialValues = {
    id: product._id,
    title: product.title,
    price: product.price,
    desc: product.desc,
  };

  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };

  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(formValues);
    const response = await axios.put(
      `${baseUrl}/api/product`,
      JSON.stringify(formValues, undefined, 5),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      }
    );
    console.log(JSON.stringify(response));
  };
  const handleDelete = async () => {
    const d = await axios
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
        <form onSubmit={handleUpdate}>
          <div className="form__group">
            <label>Product Title</label>
            <input
              type="text"
              defaultValue={product.title}
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="form__group">
            <label>Price</label>
            <input
              type="number"
              defaultValue={product.price}
              name="price"
              onChange={handleChange}
            />
          </div>
          <div className="form__group">
            <label>Description</label>
            <textarea
              type="text"
              defaultValue={product.desc}
              name="desc"
              onChange={handleChange}
              rows={4}
              cols={74}
            />
          </div>
          <button className="btn btn-primary btn-sm">Edit Now</button>
          <button className="btn btn-danger btn-sm" onClick={handleDelete}>
            Delete
          </button>
        </form>
      </div>
    </div>
  );
};

export default Editproduct;
