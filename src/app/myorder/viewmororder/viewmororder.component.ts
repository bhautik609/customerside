import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private act_route:ActivatedRoute,private orderdata:MyorderService) { }

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
  confirmOrderCancel(od){}
  OnStatusChack(id:number){}

  OnOrderCancel(order_id){}

}
