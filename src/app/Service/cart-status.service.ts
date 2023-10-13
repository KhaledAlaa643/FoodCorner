import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FoodCorner } from '../Model/FoodCorner';

@Injectable({
  providedIn: 'root'
})
export class CartStatusService {
  private isItemInCart = false;
  private cartItemsSubject = new BehaviorSubject<FoodCorner[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  private cartColorSubject = new BehaviorSubject<string>('white');
  cartColor$ = this.cartColorSubject.asObservable();

    addToCart(item: FoodCorner) {
    const currentCartItems = this.cartItemsSubject.getValue();
    const updatedCartItems = [...currentCartItems, item];
    this.cartItemsSubject.next(updatedCartItems);
  }
  updateCartColor(color: string) {
    this.cartColorSubject.next(color);
  }

  setCartStatus(status: boolean): void {
    this.isItemInCart = status;
  }

  getCartStatus(): boolean {
    return this.isItemInCart;
  }
}
