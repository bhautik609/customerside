import { NgIfContext } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Maincart } from 'src/app/cart/maincart';
import { MyorderService } from '../myorder.service';
import { orders } from '../orders';

@Component({
  selector: 'app-viewmororder',
  templateUrl: './viewmororder.component.html',
  styleUrls: ['./viewmororder.component.css']
})
export class ViewmororderComponent implements OnInit {
  fk_u_EmailId: string;
  len: number;
  u_EmailId: string = '';
  order_id: number;
  qty: any[];
  cart: Maincart = JSON.parse(localStorage.getItem('cart')) as Maincart;
  orderAssignarr: any[];
  OrderNotAssignArr: any[];
  orderDetails: any[];
  dataproqty: any[];
  processing: string;
  arrMyOrder: any[];
  Display: boolean = false;
  Display2: boolean = false;
  od: number;
  status: string;
  delivery_date: string;
  bill_date: string;
  delId: string;
  warncancel: boolean = false;
  payment_method: string;
  order_amt: number;
  orderDelDialog: boolean = true;
  walletDetails: any[];
  wallet_amt: number;
  wallet_id: number;
  detail_id: number;
  btnflag: boolean = false;
  orderDetailsarr: orders[];
  constructor(private _router:Router,private act_route:ActivatedRoute,private orderdata:MyorderService) { }

  ngOnInit(): void {
    this.order_id = this.act_route.snapshot.params['order_id'];
    this.u_EmailId = localStorage.getItem('username');
    this.orderdata.getUserOrderCheck(this.order_id).subscribe(
      (dataOrderCheck: any[]) => {
        console.log(dataOrderCheck);
        this.orderdata.getMyOrderByIdNotAssign(this.order_id).subscribe(
          (dataOrderNotAssign: any[]) => {
            console.log(dataOrderNotAssign);
            this.OrderNotAssignArr = dataOrderNotAssign;
          }
        );
      });
  }
  confirmOrderCancel(od){
    
    this.orderdata.getOrderById(this.order_id).subscribe(
      (dataOrder: orders[]) => {
        console.log(dataOrder);
        this.payment_method = dataOrder[0].payment_type;
        this.order_amt = dataOrder[0].order_amount;
        this.bill_date = dataOrder[0].order_date;
        console.log(this.order_amt, this.payment_method, this.bill_date);
      }
    );
    // this.orderCancel.getWalletDetails(this.u_EmailId).subscribe(
    //   (dataWalletDetails: any[]) => {
    //     console.log(dataWalletDetails);
    //     this.walletDetails = dataWalletDetails;
    //     //this.wallet_amt = this.walletDetails[0].wallet_amount;
    //     // this.wallet_id = this.walletDetails[0].wallet_id;
    //   }
    // );

    this.orderdata.getPtroductById(this.order_id).subscribe(
      (dataOrderAssigned: any[]) => {
        console.log(dataOrderAssigned);


        //order assigend
        if (dataOrderAssigned.length > 0) {
          //this.UpadteQty();
          if (dataOrderAssigned[0].status == 'Packing') {
            console.log(dataOrderAssigned[0].status);
            this.detail_id = dataOrderAssigned[0].del_id;
            console.log(this.detail_id);
            this.orderdata.cancelTrack(this.detail_id).subscribe(
              (dataTrackCancel: any[]) => {
                console.log(dataTrackCancel);
                console.log('track cancel');
                this.orderdata.cancelDeliveryDetails(this.od).subscribe(
                  (dataDeliveryDetailsCancel: any[]) => {
                    console.log(dataDeliveryDetailsCancel);
                    console.log('data delivery details cancel');

                    this.orderdata.cancelOrderDetails(this.od).subscribe(
                      (dataCancelOrderDetails: any[]) => {
                      console.log(dataCancelOrderDetails);
                        console.log('data order  details cancel');
                        this.orderdata.cancelOrder(this.order_id).subscribe(
                          (dataOrderCancel: any[]) => {
                            console.log(dataOrderCancel);


                            console.log('order data cancel');
                            if (this.payment_method === 'paypal' || this.payment_method == 'wallet') {
                              if (this.walletDetails.length > 0) {
                                this.wallet_amt = this.walletDetails[0].wallet_amount;
                                this.wallet_id = this.walletDetails[0].wallet_id;

                                let total: number = this.wallet_amt + this.order_amt;
                                let WalletAddDetails = {
                                  wallet_amount: total
                                };
                                this.orderdata.updateWalletAmount(this.wallet_id, WalletAddDetails).subscribe(
                                  (dataWalletDetailsUpdates: any[]) => {
                                    console.log('wallet amount updated', total);
                                  }
                                );
                              }
                              else {
                                let WallDetailsFirstTime = {
                                  fk_u_EmailId: this.u_EmailId,
                                  order_amt: this.order_amt
                                };
                                // console.log(WallDetailsFirstTime);
                                this.orderdata.addWalletAmount(WallDetailsFirstTime).subscribe(
                                  (dataWalletFirst: any[]) => {
                                    console.log('amount 1st time credited to account', dataWalletFirst);
                                  }
                                );
                              }
                            }

                          });
                      }
                    );

                  }
                );
              }
            );
          }
        }
        else {
          // order not assigned
          //this.UpadteQty();
          this.orderdata.cancelOrderDetails(this.order_id).subscribe(
            (dataOrderDetails: any[]) => {

              console.log('order details mathi delete');

              this.orderdata.cancelOrder(this.order_id).subscribe(
                (dataOrderBill: any[]) => {

                  console.log('order mthi delete');
                  this.orderDelDialog = true;
                  if (this.payment_method === 'paypal' || this.payment_method == 'wallet') {
                    if (this.walletDetails.length > 0) {
                      this.wallet_amt = this.walletDetails[0].wallet_amount;
                      this.wallet_id = this.walletDetails[0].wallet_id;

                      let total: number = this.wallet_amt + this.order_amt;
                      let WalletAddDetails = {
                        wallet_amount: total
                      };
                      this.orderdata.updateWalletAmount(this.wallet_id, WalletAddDetails).subscribe(
                        (dataWalletDetailsUpdates: any[]) => {
                          console.log('wallet amount updated', total);
                        }
                      );
                    }
                    else {
                      let WallDetailsFirstTime = {
                        fk_u_EmailId: this.u_EmailId,
                        order_amt: this.order_amt
                      };
                      console.log(WallDetailsFirstTime);
                      this.orderdata.addWalletAmount(WallDetailsFirstTime).subscribe(
                        (dataWalletFirst: any[]) => {
                          console.log('amount 1st time credited to account', dataWalletFirst);
                        }
                      );
                    }
                  }

                });

            }
          );

        }
      }
    );
    // location.reload();
  //  this.route.navigate(['/']);
  }

  OnStatusChack(order_id:number){
    this.orderdata.getUserOrderCheck(order_id).subscribe(
      (dataOrderCheck: any[]) => {

        console.log(dataOrderCheck);
        if (dataOrderCheck.length > 0) {
          this.orderdata.getUserOrderCheckedDetails(order_id).subscribe(
            (dataOrderCheckedDetails: any[]) => {
              console.log(dataOrderCheckedDetails);
              this.orderDetails = dataOrderCheckedDetails;
              

              this.od = order_id;
              this.status = this.orderDetails[0].status;
              this.delivery_date = this.orderDetails[0].del_date;
              this.bill_date = this.orderDetails[0].order_date;
              this.delId = this.orderDetails[0].DelIveryBoyId;
              this.processing='Bill Id :'+this.od+'\n'+'Deliver Boy Email Id :'+this.delId+'\n'+'Delivery Date :'+this.delivery_date+'\n'+'Bill Date :'+this.bill_date+'\n'+'Status :'+this.status;
              alert(this.processing);
            }
          );
         
        }
        else {
          // 'order under Processing';
          this.processing = 'Your Order Id ' + order_id + '\n' + 'Is under processing, Order will be delivered Soon';
          console.log(this.processing);
          alert(this.processing);


        }
      }
    );

  }

  OnOrderCancel(order_id){
  
    console.log(order_id);
    this.od = order_id;
    if(confirm("are you sure you want to cancle this order")){
    this.orderdata.getOrderById(this.order_id).subscribe(
      (dataOrder: orders[]) => {
        console.log(dataOrder);
        this.payment_method = dataOrder[0].payment_type;
        this.order_amt = dataOrder[0].order_amount;
        this.bill_date = dataOrder[0].order_date;
        console.log(this.order_amt, this.payment_method, this.bill_date);
      }
    );
    // this.orderCancel.getWalletDetails(this.u_EmailId).subscribe(
    //   (dataWalletDetails: any[]) => {
    //     console.log(dataWalletDetails);
    //     this.walletDetails = dataWalletDetails;
    //     //this.wallet_amt = this.walletDetails[0].wallet_amount;
    //     // this.wallet_id = this.walletDetails[0].wallet_id;
    //   }
    // );

    this.orderdata.getPtroductById(this.order_id).subscribe(
      (dataOrderAssigned: any[]) => {
        console.log(dataOrderAssigned);


        //order assigend
        if (dataOrderAssigned.length > 0) {
          //this.UpadteQty();
          if (dataOrderAssigned[0].status == 'Packing') {
            console.log(dataOrderAssigned[0].status);
            this.detail_id = dataOrderAssigned[0].del_id;
            console.log(this.detail_id);
            this.orderdata.cancelTrack(this.detail_id).subscribe(
              (dataTrackCancel: any[]) => {
                console.log(dataTrackCancel);
                console.log('track cancel');
                this.orderdata.cancelDeliveryDetails(this.od).subscribe(
                  (dataDeliveryDetailsCancel: any[]) => {
                    console.log(dataDeliveryDetailsCancel);
                    console.log('data delivery details cancel');

                    this.orderdata.cancelOrderDetails(this.od).subscribe(
                      (dataCancelOrderDetails: any[]) => {
                      console.log(dataCancelOrderDetails);
                        console.log('data order  details cancel');
                        this.orderdata.cancelOrder(this.order_id).subscribe(
                          (dataOrderCancel: any[]) => {
                            console.log(dataOrderCancel);


                            console.log('order data cancel');
                            if (this.payment_method === 'paypal' || this.payment_method == 'wallet') {
                              if (this.walletDetails.length > 0) {
                                this.wallet_amt = this.walletDetails[0].wallet_amount;
                                this.wallet_id = this.walletDetails[0].wallet_id;

                                let total: number = this.wallet_amt + this.order_amt;
                                let WalletAddDetails = {
                                  wallet_amount: total
                                };
                                this.orderdata.updateWalletAmount(this.wallet_id, WalletAddDetails).subscribe(
                                  (dataWalletDetailsUpdates: any[]) => {
                                    console.log('wallet amount updated', total);
                                  }
                                );
                              }
                              else {
                                let WallDetailsFirstTime = {
                                  fk_u_EmailId: this.u_EmailId,
                                  order_amt: this.order_amt
                                };
                                // console.log(WallDetailsFirstTime);
                                this.orderdata.addWalletAmount(WallDetailsFirstTime).subscribe(
                                  (dataWalletFirst: any[]) => {
                                    console.log('amount 1st time credited to account', dataWalletFirst);
                                  }
                                );
                              }
                            }

                          });
                      }
                    );

                  }
                );
              }
            );
          }
        }
        else {
          // order not assigned
          //this.UpadteQty();
          this.orderdata.cancelOrderDetails(this.order_id).subscribe(
            (dataOrderDetails: any[]) => {

              console.log('order details mathi delete');

              this.orderdata.cancelOrder(this.order_id).subscribe(
                (dataOrderBill: any[]) => {

                  console.log('order mthi delete');
                  this.orderDelDialog = true;
                  if (this.payment_method === 'paypal' || this.payment_method == 'wallet') {
                    if (this.walletDetails.length > 0) {
                      this.wallet_amt = this.walletDetails[0].wallet_amount;
                      this.wallet_id = this.walletDetails[0].wallet_id;

                      let total: number = this.wallet_amt + this.order_amt;
                      let WalletAddDetails = {
                        wallet_amount: total
                      };
                      this.orderdata.updateWalletAmount(this.wallet_id, WalletAddDetails).subscribe(
                        (dataWalletDetailsUpdates: any[]) => {
                          console.log('wallet amount updated', total);
                        }
                      );
                    }
                    else {
                      let WallDetailsFirstTime = {
                        fk_u_EmailId: this.u_EmailId,
                        order_amt: this.order_amt
                      };
                      console.log(WallDetailsFirstTime);
                      this.orderdata.addWalletAmount(WallDetailsFirstTime).subscribe(
                        (dataWalletFirst: any[]) => {
                          console.log('amount 1st time credited to account', dataWalletFirst);
                        }
                      );
                    }
                  }

                });

            }
          );

        }
      }
    ); 

  }
  alert("your orde cancle successfully");
   this._router.navigate(['/myorder']);  
  }

}
