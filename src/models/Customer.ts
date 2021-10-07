import { Entity } from "./Entity";

export interface Customer {
  _id: string;
  name: string;
  email: string;
  photo: string;
  address: string;
  passwordResetExpires: Date;
  passwordResetToken: string;
  role: "customer" | "admin" | "retailor";
}
