import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";



import App from "./App";

//Other dependancies
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalState from "./components/cart/GlobalState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalState>
    <App />
    </GlobalState>

  </React.StrictMode>
);
