import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import NavBar from "./views/NavBar/NavBar";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import Auth from "../hoc/auth";
import ProfilePage from "./views/ProfilePage/ProfilePage";
import UploadPage from "./views/UploadPage/UploadPage";
import ProductDetailPage from "./views/ProductDetailPage/ProductDetailPage";
import CartPage from "./views/CartPage/CartPage";
import CheckoutPage from "./views/CheckoutPage/CheckoutPage";

function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            paddingTop: "65px",
            minHeight: "calc(100vh - 80px)",
            maxWidth: "1800px",
          }}
        >
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route
              exact
              path="/register"
              component={Auth(RegisterPage, false)}
            />
            <Route exact path="/profile" component={Auth(ProfilePage, true)} />
            <Route
              exact
              path="/user/checkout"
              component={Auth(CheckoutPage, true)}
            />
            <Route
              exact
              path="/product/upload"
              component={Auth(UploadPage, true)}
            />
            <Route
              exact
              path="/product/:productId"
              component={Auth(ProductDetailPage, null)}
            />
            <Route exact path="/user/cart" component={Auth(CartPage, true)} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
