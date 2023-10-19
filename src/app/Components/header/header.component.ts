import { Component, OnInit } from '@angular/core';
import { Subscription} from 'rxjs';
import { FoodCorner } from 'src/app/Model/FoodCorner';
import { CartService } from 'src/app/Service/cart.service';
import { AuthService } from 'src/app/Service/auth.service';
import { CartStatusService } from 'src/app/Service/cart-status.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import {MatDialog, MatDialogRef, MatDialogModule, MatDialogConfig} from '@angular/material/dialog';
import { DialogService } from 'src/app/Service/dialog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartItems: FoodCorner[] = [];
  cartItemsSubscription!: Subscription;
  cartColor: string = 'white';

  constructor(private cartService: CartService,
    private authService: AuthService,
    private cartStatus: CartStatusService,
    private router: Router,
    private dialogService: DialogService) { }
isActive(route: string): boolean {
  return this.router.isActive(route, true);
}
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
    openLoginDialog() {
    this.dialogService.openLoginDialog();
  }


}



