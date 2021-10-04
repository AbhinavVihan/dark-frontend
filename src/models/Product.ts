import { Category } from "./Category";

export interface Product {
  status: string;
  results: number;
  doc: Doc[];
}

interface Doc {
  quantity: number;
  productCategory: Category;
  name: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  description: string;
  images: string[];
  slug: string;
  id: string;
  imageCover: string;
  imageFront: string;
}
