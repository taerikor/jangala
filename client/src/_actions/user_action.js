import axios from "axios";
import {
  ADD_TO_CART,
  AUTH_USER,
  GET_CART_ITEMS,
  LOGIN_USER,
  REGISTER_USER,
  REMOVE_FROM_CART,
  ON_SUCCESS_BUY,
  ADD_REVIEW,
} from "./types";

export function loginUser(dataToSubmit) {
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((res) => res.data);
  return {
    type: LOGIN_USER,
    payload: request,
  };
}
export function registerUser(dataToSubmit) {
  const request = axios
    .post("/api/users/register", dataToSubmit)
    .then((res) => res.data);
  return {
    type: REGISTER_USER,
    payload: request,
  };
}
export function auth() {
  const request = axios.get("/api/users/auth").then((res) => res.data);
  return {
    type: AUTH_USER,
    payload: request,
  };
}
export function addToCart(productId) {
  let body = {
    productId,
  };
  const request = axios
    .post("/api/users/addToCart", body)
    .then((res) => res.data);
  return {
    type: ADD_TO_CART,
    payload: request,
  };
}
export function getCartItems(cartItems, userCart) {
  const request = axios
    .get(`/api/product/products_by_id?id=${cartItems}&type=array`)
    .then((res) => {
      userCart.forEach((item) => {
        res.data.forEach((productDetail, i) => {
          if (item.id === productDetail._id) {
            res.data[i].quantity = item.quantity;
          }
        });
      });

      return res.data;
    });
  return {
    type: GET_CART_ITEMS,
    payload: request,
  };
}

export function removeToCart(productId) {
  const request = axios
    .get(`/api/users/removeFromCart?id=${productId}`)
    .then((res) => {
      res.data.cart.forEach((item) => {
        res.data.productInfo.forEach((product, i) => {
          if (item.id === product._id) {
            res.data.productInfo[i].quantity = item.quantity;
          }
        });
      });
      return res.data;
    });
  return {
    type: REMOVE_FROM_CART,
    payload: request,
  };
}
export function onSuccessBuy(data) {
  const request = axios
    .post("/api/users/onSuccessBuy", data)
    .then((res) => res.data);
  return {
    type: ON_SUCCESS_BUY,
    payload: request,
  };
}
