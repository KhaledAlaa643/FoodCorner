import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutRoutes } from './checkout.routing';



@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CheckoutRoutes
  ],
  exports:[]
})
export class CheckoutModule { }
