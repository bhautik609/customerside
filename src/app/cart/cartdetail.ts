import { product } from "../producthome/product";
export class CartDetails {
    public constructor(
      public Product: product,
      public Quantuty: number,
      public SubTotal: number,
    ) { }
  }