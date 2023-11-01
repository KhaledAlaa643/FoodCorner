import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FoodCorner } from '../Model/FoodCorner';

@Injectable({
  providedIn: 'root'
})
export class CartStatusService {
  private isItemInCart = false;
  private cartItemsSubject = new BehaviorSubject<FoodCorner[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private hasItemsSubject = new BehaviorSubject<boolean>(false);
  hasItems$: Observable<boolean> = this.hasItemsSubject.asObservable();

  constructor() {
    // const savedColor = localStorage.getItem('cartIconColor');
    // if (savedColor) {
    //   this.cartColorSubject.next(savedColor);
    // }

  }
    addToCart(item: FoodCorner) {
    const currentCartItems = this.cartItemsSubject.getValue();
    const updatedCartItems = [...currentCartItems, item];
      this.cartItemsSubject.next(updatedCartItems);

  }
  updateCartState(hasItems: boolean) {
    this.hasItemsSubject.next(hasItems);
  }
  setCartStatus(status: boolean): void {
    this.isItemInCart = status;
  }

  getCartStatus(): boolean {
    return this.isItemInCart;
  }
}
