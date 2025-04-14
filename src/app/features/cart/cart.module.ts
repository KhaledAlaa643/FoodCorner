import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartItemsService } from './services/cart-items.service';
import { CartStorageService } from './services/cart-storage.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartModule,
    FormsModule,
    NgxPaginationModule 
  ],
  providers:[CartItemsService,CartStorageService],
})
export class CartModule { }
