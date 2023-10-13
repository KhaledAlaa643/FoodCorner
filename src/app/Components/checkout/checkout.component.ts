import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FoodCorner } from 'src/app/Model/FoodCorner';
import { CartItemsService } from 'src/app/Service/cart-items.service';
import { CartService } from 'src/app/Service/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cartItems: FoodCorner[] = [];
  private cartItemsSubscription!: Subscription;

  constructor(private cartService: CartService,
      private router: Router,
) { }

ngOnInit(): void {
    this.cartItemsSubscription = this.cartService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
}

calculateTotalPrice(): number {
    // Calculate the total price from the cartItems array
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  ngOnDestroy(): void {
    this.cartItemsSubscription.unsubscribe();
  }
  track() {
      this.router.navigate(['/track']);

}

}
