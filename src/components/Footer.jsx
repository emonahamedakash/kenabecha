import React from "react";
import {
  FaFacebook,
  FaTwitterSquare,
  FaInstagramSquare,
  FaYoutube,
  FaGooglePlusSquare,
} from "react-icons/fa";

import visa from "../assets/visa.png";
import masterCard from "../assets/master-card.png";
import paypal from "../assets/paypal.png";
import discover from "../assets/discover.png";
import ae from "../assets/american-express.png";
const Footer = () => {
  return (
    <div className="footer-container bg-dark">
      <div className="footer">
        <div>
          <ul>
            <li>Return policy</li>
            <li>Search our store</li>
            <li>Blog</li>
            <li>Contact us</li>
            <li>About us</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <FaFacebook />
              Facebook
            </li>
            <li>
              <FaTwitterSquare />
              Twitter
            </li>
            <li>
              <FaInstagramSquare />
              Instagram
            </li>
            <li>
              <FaYoutube />
              Youtube
            </li>
            <li>
              <FaGooglePlusSquare />
              Google+
            </li>
          </ul>
        </div>
        <div className="footer__images">
          <img src={visa} alt="payment" />
          <img src={masterCard} alt="payment" />
          <img src={paypal} alt="payment" />
          <img src={discover} alt="payment" />
          <img src={ae} alt="payment" />
        </div>
      </div>

      <p>© All Rights Reserved by Emon Ahamed Akash</p>
    </div>
  );
};

export default Footer;
