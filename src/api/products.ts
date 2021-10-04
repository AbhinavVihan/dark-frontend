import axios from "axios";
import { Product } from "../models/Product";
import { BASE_URL, get } from "./base";

interface ProductResponse {
  product: Product;
}

export const fetchProducts = () => {
  const url = BASE_URL + "/products";

  return get<Product>(url, {}).then((response) => {
    console.log(response.data.doc);
    return response.data.doc;
  });
};

export const fetchOneProduct = (id: string) => {
  const url = BASE_URL + "/products/" + id;

  return axios.get<ProductResponse>(url);
};
