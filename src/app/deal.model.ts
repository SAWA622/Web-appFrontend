// deal.model.ts
import { Product } from "./product.model";

export interface Deal {
  _id?: string;
  name: string;
  description: string;
  discount: number;
  products: Product[];
}
