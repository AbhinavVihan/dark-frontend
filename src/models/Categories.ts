import { Customer } from "./Customer";

export interface Categories {
  status: string;
  doc: Doc;
}

interface Doc {
  categoryName: string;
  maker: Customer;
  description: string;
  photo: string;
  slug: string;
  id: string;
}