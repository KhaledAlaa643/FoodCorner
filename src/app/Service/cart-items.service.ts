import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FoodCorner } from '../Model/FoodCorner';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {

  public cartItemsSubject = new BehaviorSubject<FoodCorner[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

    private itemAddedToCartSubject = new BehaviorSubject<boolean>(false);

  itemAddedToCart$: Observable<boolean> = this.itemAddedToCartSubject.asObservable();

  constructor() {
    this.loadCartItemsFromLocalStorage();
    this.itemAddedToCartSubject.next(true)

}

  updateCartItems(cartItems: FoodCorner[]): void {
    this.cartItemsSubject.next(cartItems);
  }

  getCartItemById(id: string): FoodCorner | undefined {
    const cartItems = this.cartItemsSubject.getValue();
    return cartItems.find((item) => item.id === id);
  }

  getCartItems(): Observable<FoodCorner[]> {
    return this.cartItems$;
  }

  private loadCartItemsFromLocalStorage(): void {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.cartItemsSubject.next(savedCartItems);
  }

  private saveCartItemsToLocalStorage(cartItems: FoodCorner[]): void {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  addToCart(item: FoodCorner): void {
    this.itemAddedToCartSubject.next(true);
    const currentCartItems = this.cartItemsSubject.getValue();
    const existingItem = currentCartItems.find((food) => food.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      currentCartItems.push(item);
    }

    this.cartItemsSubject.next(currentCartItems);
    this.saveCartItemsToLocalStorage(currentCartItems);
  }

  updateCartItemsInLocalStorage(cartItems: FoodCorner[]): void {
    this.cartItems$
    // Push the new items to the array before setting them in local storage
    this.cartItemsSubject.next(cartItems);

    // Set the updated cart items in local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));


  }


}
