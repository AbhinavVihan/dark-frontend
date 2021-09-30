import { Entity } from "./Entity";
import { Customer } from "./Customer";

export interface Category extends Entity {
  categoryName: string;
  description: string;
  photo: string;
  slug: string;
  maker: Customer;
}
