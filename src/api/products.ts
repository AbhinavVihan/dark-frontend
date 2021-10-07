import axios from "axios";
import { Product } from "../models/Products";
import { BASE_URL } from "./base";

interface ProductResponse {
  product: Product[];
}

export interface ProductRequest {
  query?: string;
}

export const fetchProducts = (data: ProductRequest) => {
  const url = BASE_URL + "/products";

  return axios.get<Product[]>(url, { params: data }).then((response) => {
    console.log(response.data);
    return response.data;
  });
};

export const fetchOneProduct = (id: string) => {
  const url = BASE_URL + "/products/" + id;

  return axios.get<ProductResponse>(url);
};
