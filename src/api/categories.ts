import axios from "axios";
import { Categories } from "../models/Categories";
import { BASE_URL, get } from "./base";

interface CategoryResponse {
  doc: Categories[];
}

export const fetchCategories = () => {
  const url = BASE_URL + "/categories";

  return get<CategoryResponse>(url, {});
};

export const fetchOneCategory = (id: string) => {
  const url = BASE_URL + "/categories/" + id;

  return axios.get<CategoryResponse>(url);
};
