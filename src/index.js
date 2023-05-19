import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";



import App from "./App";

//Other dependancies
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalState from "./components/cart/GlobalState";
import { AuthProvider } from "./components/auth/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalState>
      <AuthProvider>
    <App />
      </AuthProvider>
    </GlobalState>

  </React.StrictMode>
);
