import { Categories } from "./Categories";

export interface Products {
  status: string;
  results: number;
  doc: Doc[];
}

interface Doc {
  quantity: number;
  productCategory: Categories;
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
