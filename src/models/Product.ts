import { Category } from "./Category";

export interface Product {
  id: number;
  quantity: number;
  productCategory: Category;
  name: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  description: number;
  images: string[];
  slug: string;
  imageCover: string;
  imageFront: string;
}
