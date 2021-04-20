import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartDetails } from '../cart/cartdetail';
import { CartoperationService } from '../cart/cartoperation.service';
import { Maincart } from '../cart/maincart';
declare var require: any;
const dateFormat = require('dateformat');
const now = new Date();

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})



export class PaymentComponent implements OnInit,AfterViewInit {
  finalAmount: number = 1;
  arrcartItems: CartDetails[] = [];
  productarr: string[] = [];
  qty: any[];
  spcl_instruction: string;
  cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;
  quantityarr: number[] = [];
  GrandTotal: number = 0;
  UserId: string = localStorage.getItem('username');
  paymenterr: boolean = false;
  walltetFlag: boolean = false;
  walletDetails: any[];
  insuff: boolean = false;
  walletAmount: number;
  id;
  @ViewChild("paypal") paypalele: ElementRef;

  constructor(private _cat:CartoperationService,private _router:Router) { }

  ngOnInit(): void {
    let GT = localStorage.getItem('Finalamount');
    this.id= localStorage.getItem('id');
     // console.log(GT, localStorage.getItem('Finalamount'));
    this.GrandTotal = +GT;
  }
  //product = {
    //price: this.GrandTotal,
    //description: this.spcl_instruction
    // img: "assests/x.png",
  //};
  //padiFor = false;
  ngAfterViewInit(){
    //  payple
    //   .Buttons({
    //     createOrder: (data, actions) => {
    //       return actions.order.create({
    //         purchase_units: [
    //           {
    //             description: this..description,
    //             amount: {

    //               currency_code: "INR",
    //               value: this.GrandTotal,
    //             },
    //           },
    //         ],
    //         application_context: {
    //           shipping_preference: 'NO_SHIPPING',
    //         }
    //       });
  }
  onCheckOutCash() {
    if (this.UserId == null) {
      this._router.navigate(['/loginpage']);
    }
    else
    {
      this.cart.u_EmailId=this.UserId;
      console.log(this.UserId);
      let OrderID;
      let objOrder = {
        "user_id_fk": this.id,
        "order_date": dateFormat(now, "yyyy-mm-dd"),
        "order_amount": this.GrandTotal,
        "payment_type": 'cash',
        "payment_status": 'done',
      };
      this._cat.addorder(objOrder).subscribe(
        (dataOrder: any) => {
          console.log(dataOrder);

          OrderID = dataOrder.insertId;
          console.log(OrderID);

        },
        (err) => { },
        () => {
          let objOrderDetail = {
            'order_id_fk': OrderID,
            'cartItems': this.cart.CartItems
          };

          for (let i = 0; i < this.cart.CartItems.length; i++) {
            this.productarr.push(this.cart.CartItems[i].Product.product_name);
            this.quantityarr.push(this.cart.CartItems[i].Quantuty);
          }
          this._cat.addOrderDetail(objOrderDetail).subscribe(
            (y: any[]) => {
              console.log(y);
              this._router.navigate(['/thanksOrder', OrderID]);
            });
          }
        );
    }
  }
  onCheckOutWallet(){}
  UpadteQty() {}
}
