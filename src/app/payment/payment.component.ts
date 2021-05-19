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
  buttonColor = "black";
  buttonType = "buy";
  isCustomSize = false;
  buttonWidth = 300;
  buttonHeight = 50;
  isTop = window === window.top;

  paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["AMEX", "VISA", "MASTERCARD"]
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "example",
            gatewayMerchantId: "exampleGatewayMerchantId"
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: "12345678901234567890",
      merchantName: "Demo Merchant"
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPriceLabel: "Total",
      totalPrice: '2000',
      currencyCode: "USD",
      countryCode: "US"
    }
  };
  onLoadPaymentData(event) {
    console.log("load payment data", event.detail);
    this.cart.u_EmailId=this.UserId;
      console.log(this.UserId);
      let OrderID;
      let objOrder = {
        "user_id_fk": this.id,
        "order_date": dateFormat(now, "yyyy-mm-dd"),
        "order_amount": this.GrandTotal,
        "payment_type": 'google pay',
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
              alert("your order confirm");
              this._router.navigate(['/thanksOrder', OrderID]);
            });
          }
        );

  }






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
        "payment_status": 'pending',
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
              alert("your order confirm");
              this._router.navigate(['/thanksOrder', OrderID]);
            });
          }
        );
    }
  }
  onCheckOutWallet(){}
  UpadteQty() {}
}
