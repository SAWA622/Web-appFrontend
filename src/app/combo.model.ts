// combo.model.ts
import { Product } from "./product.model";

export interface Combo {
  discount: number;
  _id?: string;
  name: string;
  description: string;
  price: number;
  products: Product[];
}
