import axios from "axios";
import { Category } from "../models/Category";
import { BASE_URL, get } from "./base";

interface CategoryResponse {
  doc: Category[];
}

export const fetchCategories = () => {
  const url = BASE_URL + "/categories";

  return get<CategoryResponse>(url, {});
};

export const fetchOneCategory = (id: string) => {
  const url = BASE_URL + "/categories/" + id;

  return axios.get<CategoryResponse>(url);
};
