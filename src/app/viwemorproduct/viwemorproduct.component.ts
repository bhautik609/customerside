import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CartDetails } from '../cart/cartdetail';
import { CartoperationService } from '../cart/cartoperation.service';
import { Maincart } from '../cart/maincart';
import { ProductService } from '../product.service';
import { product } from '../producthome/product';

@Component({
  selector: 'app-viwemorproduct',
  templateUrl: './viwemorproduct.component.html',
  styleUrls: ['./viwemorproduct.component.css']
})
export class ViwemorproductComponent implements OnInit {
product_id;
obj:product[];
product_name;
product_color;
product_garr;
product_img1;
product_mfd;
product_price;
product_warr;
product_desc;
cartProductItem: product = null;
currentCartItem: CartDetails = null;
SubTotal = 0;
GrandTotal = 0;
responsiveOptions;
seacrhArray: product[] = [];
TopSellingProducts: any[] = [];
UserId: string = localStorage.getItem('username');
dataTopsell: any[];
  constructor(private _actRoute:ActivatedRoute,private _productdata:ProductService,private _cart:CartoperationService,private _sankbar:MatSnackBar) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
   }

  ngOnInit(): void {
    this.product_id=this._actRoute.snapshot.params['product_id'];
    console.log(this.product_id);
    this._productdata.getproductbyId(this.product_id).subscribe((data:product[])=>{
      console.log(data);
      this.obj=data;
      console.log(this.obj);
      this.product_name=data[0].product_name;
      this.product_img1=data[0].product_img1;
      this.product_desc=data[0].product_desc;
      this.product_price=data[0].product_price;
      this.product_mfd=data[0].product_mfd;
      this.product_color=data[0].product_color;
    });
  }
  onAddToCart(item){
    console.log(item);
    this.cartProductItem=item;
    this.SubTotal = this._cart.doSubTotal(this.cartProductItem.product_price, 1);
    this.currentCartItem = new CartDetails(this.cartProductItem, 1, this.SubTotal);
    if (localStorage.getItem('cart') == null) {
      const cartItems: CartDetails[] = [];
      cartItems.push(this.currentCartItem);
      this.GrandTotal = this._cart.doGrandTotal(cartItems);
      const myCart = new Maincart(cartItems, this.GrandTotal, this.UserId);
      localStorage.setItem('cart', JSON.stringify(myCart));
     } else {
        const cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;
        let index: number = -1;
        if (cart.CartItems?.length>=0){
          index = cart.CartItems.map(function (x) {
            return x.Product.product_id;
          }).indexOf(item.product_id);
        }
        if (index == -1) {
          cart.CartItems?.push(this.currentCartItem);
          cart.GrandTotal = this._cart.doGrandTotal(cart.CartItems);
          // cart.u_EmailId = this.UserId;
          localStorage.setItem('cart', JSON.stringify(cart));
  
        }
        else {
          const cartItem: CartDetails = cart.CartItems[index];
          cartItem.Quantuty += 1;
          cartItem.SubTotal = this._cart.doSubTotal(this.cartProductItem.product_price, cartItem.Quantuty);
          cart.CartItems[index] = cartItem;
  
          cart.GrandTotal = this._cart.doGrandTotal(cart.CartItems);
          // cart.u_EmailId = this.UserId;
  
          localStorage.setItem('cart', JSON.stringify(cart));
        }
  
  
      }
      console.log(localStorage.getItem('cart'));
  
      this._sankbar.open(this.cartProductItem.product_name + 'Added to cart', 'Close', {
        duration: 2000,
        panelClass: ['blue-snackbar']
      });
  
  }
  AddTowishlist(){}

}
