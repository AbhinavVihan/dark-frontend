// import axios from "axios";
// import { Categories } from "../models/Categories";
// import { BASE_URL, get } from "./base";

// interface CategoryResponse {
//   doc: Categories[];
// }

// export const fetchCategories = () => {
//   const url = BASE_URL + "/categories";

//   return get<CategoryResponse>(url, {});
// };

// export const fetchOneCategory = (id: string) => {
//   const url = BASE_URL + "/categories/" + id;

//   return axios.get<CategoryResponse>(url);
// };

import axios from "axios";
import { Category } from "../models/Categories";
import { CategoriesSingle } from "../models/CategorySingle";
import { BASE_URL } from "./base";

export interface CategoryRequest {
  query?: string;
}

export const fetchCategories = (data: CategoryRequest) => {
  const url = BASE_URL + "/categories";

  return axios.get<Category[]>(url, { params: data }).then((response) => {
    // console.log(response.data);
    return response.data;
  });
};

export const fetchOneCategory = (id: string) => {
  const url = BASE_URL + "/categories/" + id;

  return axios.get<CategoriesSingle>(url);
};
