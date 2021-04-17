import { CartDetails } from './cartdetail';

export class Maincart {
  public constructor(
    public CartItems: CartDetails[],
    public GrandTotal: number,
    public u_EmailId: string
  ) { }
}