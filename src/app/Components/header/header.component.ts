import { Component,  HostListener,  OnInit, ViewChild } from '@angular/core';
import { Subscription} from 'rxjs';
import { FoodCorner } from 'src/app/Model/FoodCorner';
import { CartService } from 'src/app/Service/cart.service';
import { AuthService } from 'src/app/Service/auth.service';
import { CartStatusService } from 'src/app/Service/cart-status.service';
import { Router } from '@angular/router';
import { PopupComponent } from '../popup/popup.component';
import { CartItemsService } from 'src/app/Service/cart-items.service';
import { FoodDetailsComponent } from '../food-details/food-details.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartItems: FoodCorner[] = [];
  cartItemsSubscription!: Subscription;
  colorCart!:any;
  userStatus: boolean = false
  isMobile = false;
  length !:any
  @ViewChild('popupComp') popupComponent!:PopupComponent
  constructor(
    private authService: AuthService,
    private CartItemsService: CartItemsService,
    private router: Router,
  ) {
    const savedValue = localStorage.getItem('isItemInCart');
      if (savedValue !== null) {
      this.colorCart = savedValue === 'true' ? 'orange' : 'white';
      }
  }
isActive(route: string): boolean {
  return this.router.isActive(route, true);
}
  ngOnInit(): void {
    this.cartItemsSubscription = this.CartItemsService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
    FoodDetailsComponent.isItemInCart$.subscribe((isItemInCart) => {
      this.colorCart = isItemInCart ? 'orange' : 'white';
      localStorage.setItem('isItemInCart', isItemInCart ? 'true' : 'false');
    });

    // subscribe in login & logout
    this.authService.userStatus().subscribe(status => {
      this.userStatus = status
    })
    this.checkScreenWidth();

    this.CartItemsService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.length = cartItems.length;
    });
    
  }


ngOnDestroy(): void {
  this.cartItemsSubscription.unsubscribe();
  }

logout(): void {
    this.authService.logout();
  }

openPopup() {
  this.popupComponent?.open_modal();
}
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    this.isMobile = window.innerWidth <= 993; // Adjust the breakpoint as needed
  }
}
