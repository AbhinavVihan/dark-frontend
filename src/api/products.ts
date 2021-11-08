import axios from "axios";
import { Cart, Carts } from "../models/Cart";
import { Product } from "../models/Products";
import { ProductSingle } from "../models/ProductSingle";
import { BASE_URL } from "./base";
import { AUTH_TOKEN } from "./base";

interface ProductResponse {
  product: Product[];
}

export interface ProductRequest {
  query: string;
}

export const fetchProducts = (data: ProductRequest) => {
  const url = BASE_URL + "/products";

  return axios.get<Product[]>(url, { params: data }).then((response) => {
    // console.log(response.data);
    return response.data;
  });
};

export const fetchOneProduct = (id: string) => {
  const url = BASE_URL + "/products/" + id;

  return axios.get<ProductSingle>(url);
};

export const fetchProductsForCategory = (id: string) => {
  const url = BASE_URL + "/categories/" + id + "/products";
  // console.log(id);

  return axios.get<Product[]>(url).then((response) => {
    // console.log(response.data);
    return response.data;
  });
};

// export const addToCart = (pId: string, cId: string) => {
//   const url = BASE_URL + "/products/" + pId + "/cart/" + cId;

//   return axios.get<Cart>(url).then((response) => {
//     return response.data;
//   });
// };

export const createCart = () => {
  const url = BASE_URL + "/cart/create";

  return axios
    .post<Cart>(url, { headers: { Authorization: AUTH_TOKEN } })
    .then((response) => {
      return response.data;
    });
};

export const getCart = () => {
  const url = BASE_URL + "/cart/myCart";
  return axios.get<Carts>(url);
};

export interface addToCartRequest {
  pId: string;
  cId: string;
}

export const addToCart = (pId: string, cId: string) => {
  const url = BASE_URL + "/products/" + pId + "/cart/" + cId;
  return axios
    .post<Carts>(url, { headers: { Authorization: AUTH_TOKEN } })
    .then((response) => {
      return response.data.doc;
    });
};
