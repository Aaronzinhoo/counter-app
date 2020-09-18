import React from "react";
import { Switch, Route } from "react-router-dom";
import App from "../App";
import Checkout from "./checkout";

const ShoppingRouter = () => (
  <Switch>
    <Route path="/" exact component={App} />
    <Route path="/checkout" component={Checkout} />
  </Switch>
);

export default ShoppingRouter;
