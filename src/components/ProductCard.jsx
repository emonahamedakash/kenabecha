import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ProductCard = (props) => {
  const navigate = useNavigate();
  return (
    <Card style={{ width: "15rem" }} className="col-sm-3 card__container">
      <button onClick={props.btnFunction} className="card__body">
        <Card.Img
          variant="top"
          src={
            props.image
              ? props.image
              : "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"
          }
          className="product__image"
          alt={props.title}
        />
        <Card.Body>
          <Card.Text className="product__title">{props.title}...</Card.Text>
          <Card.Text className="product__price">
            Price: ৳ {props.price}/=
          </Card.Text>
          {/* <Button variant="success" className="w-100" onClick={props.btnFunction}>
          See Details
        </Button> */}
        </Card.Body>
      </button>
    </Card>
  );
};

export default ProductCard;
