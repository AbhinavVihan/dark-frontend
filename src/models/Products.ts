import { Categories } from "./Categories";

export interface Products {
  status: string;
  results: number;
  doc: Product[];
}

export interface Product {
  quantity: number;
  productCategory: Categories;
  name: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  description: string;
  images: string[];
  slug: string;
  _id: string;
  imageCover: string;
  imageFront: string;
}
