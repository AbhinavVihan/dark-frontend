import { Entity } from "./Entity";

export interface Customer extends Entity {
  name: string;
  email: string;
  address: string;
  photo: string;
  role: "customer" | "admin" | "retailor";
}
