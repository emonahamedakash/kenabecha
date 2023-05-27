import React from "react";
import Card from "react-bootstrap/Card";

const ProductCard = (props) => {
  console.log("Discount Price: ", props.discount);
  console.log("Main Price: ", props.price);
  let discountPrice = (props.discount / 100) * props.price;
  console.log(discountPrice);
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
          <Card.Text className="product__price fw-bold">
            Offer Price: ৳
            {discountPrice ? props.price - discountPrice : props.price}/=
          </Card.Text>
          <Card.Text className="product__price text-secondary fw-light">
            Regular price: ৳ <del>{props.price}/=</del>
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
