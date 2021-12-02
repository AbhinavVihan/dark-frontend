import { Customer } from "./Customer";
import { Entity } from "./Entity";

export interface Review extends Entity {
  review: string;
  rating: number;
  createdAt: string;
  customer: Customer;
  product: string;
}
