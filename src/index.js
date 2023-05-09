import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { CartProvider } from "react-use-cart";

import App from "./App";

//Other dependancies
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
    <App />
    </CartProvider>
  </React.StrictMode>
);
