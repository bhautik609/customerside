import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ContactusComponent } from './contactus/contactus.component';
import { LoginComponent } from './login/login.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { PaymentComponent } from './payment/payment.component';
import { ProducthomeComponent } from './producthome/producthome.component';
import { RegistartionComponent } from './registartion/registartion.component';
import { ShippingComponent } from './shipping/shipping.component';
import { ViwemorproductComponent } from './viwemorproduct/viwemorproduct.component';

const routes: Routes = [
  {path:'',component:ProducthomeComponent},
  {path:'login',component:LoginComponent},
  {path:'regi',component:RegistartionComponent},
  {path:'myaccount',component:MyaccountComponent},
  {path:'viewmoreproduct/:product_id',component:ViwemorproductComponent},
  {path:'cart',component:CartComponent},
  {path:'shipping',component:ShippingComponent},
  {path:'payment',component:PaymentComponent},
  {path:'con',component:ContactusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
