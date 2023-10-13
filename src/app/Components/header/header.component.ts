import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, map, of } from 'rxjs';
import { FoodCorner } from 'src/app/Model/FoodCorner';
import { CartService } from 'src/app/Service/cart.service';
import { NgClass } from '@angular/common';
import { AuthService } from 'src/app/Service/auth.service';
import { CartStatusService } from 'src/app/Service/cart-status.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartItems: FoodCorner[] = [];
  cartItemsSubscription!: Subscription;
  cartColor: string = 'white';

  constructor(private cartService: CartService,
    private authService: AuthService,
      private cartStatus: CartStatusService
) { }

  ngOnInit(): void {
    this.cartItemsSubscription = this.cartService.cartItems$.subscribe((cartItems) => {
        this.cartItems = cartItems;
        this.updateCartStatus();
    });
  }
  updateCartStatus() {
    // Update the cart color based on the cart items length
    const color = this.cartItems.length > 0 ? 'orange' : 'white';
    this.cartStatus.updateCartColor(color);
  }
  ngOnDestroy(): void {
    this.cartItemsSubscription.unsubscribe();
  }

    get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userFirstName(): string {
    return this.authService.userFirstName;
  }

  logout(): void {
    this.authService.logout();
  }
}



