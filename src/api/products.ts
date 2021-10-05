import axios from "axios";
import { Products } from "../models/Products";
import { BASE_URL, get } from "./base";

interface ProductResponse {
  product: Products;
}

export const fetchProducts = () => {
  const url = BASE_URL + "/products";

  return get<Products>(url, {}).then((response) => {
    console.log(response.data.doc);
    return response.data.doc;
  });
};

export const fetchOneProduct = (id: string) => {
  const url = BASE_URL + "/products/" + id;

  return axios.get<ProductResponse>(url);
};
