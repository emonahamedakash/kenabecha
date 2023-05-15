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
            <li><a href="/return-policy" target="_blank">Return policy</a></li>
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
              <a href="https://www.facebook.com/profile.php?id=100092515607020&mibextid=ZbWKwL">
              Facebook
              </a>
            </li>
            <li>
              <FaTwitterSquare />
              Twitter
            </li>
            
            <li>
              <FaYoutube />
              Youtube
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

      <p>© All Rights Reserved by <a href="http://nub.ac.bd" target="_blank">Northern University Bangladesh</a></p>
    </div>
  );
};

export default Footer;
