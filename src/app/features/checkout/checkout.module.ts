import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  exports:[]
})
export class CheckoutModule { }
