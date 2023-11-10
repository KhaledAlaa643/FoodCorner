import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FoodCorner } from 'src/app/Model/FoodCorner';
import { CartItemsService } from 'src/app/Service/cart-items.service';
import { CartService } from 'src/app/Service/cart.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cartItems: FoodCorner[] = [];
  private cartItemsSubscription!: Subscription;
  totalPrice: number = 0
  constructor(private cartItemsService: CartItemsService,
) { }

ngOnInit(): void {
    this.cartItemsSubscription = this.cartItemsService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
  this.totalPrice = this.calculateTotalPrice()
}

calculateTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  ngOnDestroy(): void {
    this.cartItemsSubscription.unsubscribe();
  }


}
