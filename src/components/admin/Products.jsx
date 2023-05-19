import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../baseUrl";
import "./AdminPanel.css";
import ProductCard from "../ProductCard";

const Products = () => {
  // const initialValues = {
  //   title: "",
  //   price: "",
  //   desc: "",
  //   category: "",
  //   brand: "",
  //   image: "",
  // };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  // const [formValues, setFormValues] = useState(initialValues);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    fetchProducts().then();
  }, []);
  //validating form
  const handleChange = (e) => {
    const { name, value } = e.target;
    // setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let formValues = {
      title,
      price,
      desc,
      category,
      brand,
      image,
    };
    console.log(formValues);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("price", price);
    formData.append("desc", desc);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("image", image);

    handleClose();
    alert("Product added successfully");
    const response = await axios.post(
      `${baseUrl}/api/product`,
      // JSON.stringify(formValues, undefined, 5),
      formData,
        {headers: { "Content-Type": "multipart/form-data" }},
      // {
      //   headers: { "Content-Type": "multipart/form-data" },
      //   withCredentials: false,
      // }
    );
    console.log(JSON.stringify(response));

    // const productAddedId = response.data._id
    
    // const formData = new FormData()
    // formData.append('image', image)
    
    // axios.post(`${baseUrl}/api/add-product-image/${productAddedId}`, 
    //   formData,
    //   {
    //     headers: {
    //       'Content-Type': "multipart/form-data"
    //     }
    //   }
    // ).then(res => console.log(res))
    // .catch(err => console.log(err.message))
  };

  const fetchProducts = async () => {
    let temp = [];
    setLoading(true);
    await axios
      .get(`${baseUrl}/api/product`)
      .then((response) => {
        console.log({response});
        
        response.data.forEach( (res) => {
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

      // try {
      //   for(let each of temp){
      //     const res = await axios.get(`${baseUrl}/api/fetch-product-image/${each._id}`, {
      //       responseType: "blob"
      //     })

      //     const url = URL.createObjectURL(res.data)
      //     setImgUrls(prev => ({
      //       ...prev,
      //       [each.id]: url
      //     }))
      //   }
      // } catch (err) {
      //   console.log(err.message)
      // }
  };

  const navigate = useNavigate();
  console.log("proucts:" ,products);

  return (
    <div className="adminProductContainer">
      <div className="upperPart">
        <h2>Product</h2>
        <Button variant="primary" onClick={handleShow}>
          Add Product
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              onSubmit={handleSubmit}
              className="add__product__form"
              encType="multipart/form-data"
            >
            
              <div className="form__group">
                <label>Title: </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  // value={formValues.title}
                  // onChange={handleChange}
                  name="title"
                />
              </div>
              <div className="form__group">
                <label>Price: </label>
                <input
                  type="number"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  // value={formValues.price}
                  // onChange={handleChange}
                  name="price"
                />
              </div>
              <div className="form__group">
                <label>Description: </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                  // value={formValues.desc}
                  // onChange={handleChange}
                  name="desc"
                />
              </div>
              <div className="form__group">
                <label>Category: </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  // value={formValues.category}
                  // onChange={handleChange}
                  name="category"
                />
                {/* <select
                  value={formValues.category}
                  onChange={(event) => setSelectedCategory(event.target.value)}
                  name="category"
                >
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="grocery">Grocery</option>
                </select> */}
              </div>
              <div className="form__group">
                <label>Brand: </label>
                <input
                  type="text"
                  // value={formValues.brand}
                  // onChange={handleChange}
                  onChange={(e) => {
                    setBrand(e.target.value);
                  }}
                  name="brand"
                />
              </div>
              <div className="form__group">
                <label>Upload Image </label>
                <input
                  type="file"
                  name="image"
                  accept=" .jpg, .png"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
              </div>
              <input type="submit" className="btn btn-primary" />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="bottomPart">
        <table>
          <thead>
            <tr>
              <td>SN</td>
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
                  <td className="productId">{i + 1}</td>
                  <td>
                    <img src={product.image} alt={product.title} />
                  </td>
                  <td className="productTitle">{product.title}</td>
                  <td>{product.price}</td>
                  <td>No Offer</td>
                  <td>67</td>
                  <td>In stock</td>
                  <td>Active</td>
                  <td>10/08/2022</td>

                  <td>
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => {
                        navigate("/editproduct", {
                          state: { product: product },
                        });
                      }}
                    >
                      Edit Product
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
