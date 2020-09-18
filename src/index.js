import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import ShoppingRouter from "./components/routes";

ReactDOM.render(
  <BrowserRouter>
    <ShoppingRouter />
  </BrowserRouter>,
  document.getElementById("root")
);
