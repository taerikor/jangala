import axios from "axios";
import { ADD_REVIEW, GET_PRODUCT_DETAIL } from "./types";

export function addReviewAction(data) {
  // const request = axios
  //   .post("/api/product/review", data)
  //   .then((res) => res.data);
  return {
    type: ADD_REVIEW,
    payload: data,
  };
}

export function getProductDetailAction(productId) {
  const request = axios
    .get(`/api/product/products_by_id?id=${productId}&type=single`)
    .then((res) => res.data);
  return {
    type: GET_PRODUCT_DETAIL,
    payload: request,
  };
}
