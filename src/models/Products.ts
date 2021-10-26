import { Categories } from "./Categories";
import { Entity } from "./Entity";

export interface Products {
  doc: Product[];
}

export interface Product extends Entity {
  quantity: number;
  productCategory: Categories;
  name: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  description: string;
  images: string[][];
  slug: string;
  imageCover: string;
  imageFront: string;
}
