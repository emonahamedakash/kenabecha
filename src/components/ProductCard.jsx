import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ProductCard = (props) => {
  const navigate = useNavigate();
  return (
    <Card style={{ width: "15rem" }} className="col-sm-3">
      <Card.Img variant="top" src={props.image} className="product__image" />
      <Card.Body>
        <Card.Text className="product__title">{props.title}...</Card.Text>
        <Card.Text className="product__price">
          Price: ${props.price}/=
        </Card.Text>
        <Button variant="success" className="w-100" onClick={props.btnFunction}>
          See Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
