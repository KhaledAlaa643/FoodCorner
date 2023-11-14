import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FoodCorner } from '../Model/FoodCorner';
import { CartEventService } from './cart-event.service';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {
  private cartKey = 'cartItems';
  public cartItemsSubject = new BehaviorSubject<FoodCorner[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();
  private itemAddedToCartSubject = new BehaviorSubject<boolean>(false);
  private itemRemovedSubject = new Subject<void>();
  private hasItemsSubject = new BehaviorSubject<boolean>(false);
  
  hasItems$ = this.hasItemsSubject.asObservable();
  itemAddedToCart$: Observable<boolean> = this.itemAddedToCartSubject.asObservable();
  itemRemoved$ = this.itemRemovedSubject.asObservable();

  constructor(private cartEventService: CartEventService) {
    this.loadCartItemsFromLocalStorage();
    this.itemAddedToCartSubject.next(true)
    
}
  id(id:any) {
  const currentCartItems = this.cartItemsSubject.getValue();
  return currentCartItems.some((item: { id: any }) => item.id === id);
    
  
  }
    updateCartState(hasItems: boolean) {
    this.hasItemsSubject.next(hasItems);
  }

  updateCartItems(cartItems: FoodCorner[]): void {
    this.cartItemsSubject.next(cartItems);
  }


setCartItems(cartItems: FoodCorner[]): Observable<FoodCorner[]> {
      return this.cartItems$;

  }
sendCartItems(cartItems: FoodCorner[]): void {
    this.cartItemsSubject.next(cartItems);
  }


loadCartItemsFromLocalStorage(): void {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  // Filter out undefined or items without an ID
  const filteredCartItems = cartItems.filter((item: any) => item && item.id);
  this.cartItemsSubject.next(filteredCartItems);
}

loadCartItems(): void {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  const filteredCartItems = cartItems.filter((item: any) => item && item.id); // Filter out undefined or items without an ID
  this.cartItemsSubject.next(filteredCartItems);
  
}

private saveCartItemsToLocalStorage(cartItems: FoodCorner[]): void {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

addToCart(item: FoodCorner): void {
  this.itemAddedToCartSubject.next(true);
  const currentItems = this.cartItemsSubject.getValue();

  // Check if the item is valid (not empty and has an 'id')
  if (item && item.id) {
    const existingItem = currentItems.find((food) => food.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      currentItems.push(item);
    }

    // Filter out any empty or invalid items
    const filteredCartItems = currentItems.filter((food) => food && food.id);

    this.cartItemsSubject.next(filteredCartItems);
    this.saveCartItemsToLocalStorage(filteredCartItems);
  }
}

notifyItemRemoved() {
  this.itemRemovedSubject.next();
}

updateCartItemsInLocalStorage(cartItems: FoodCorner[]): void {
    this.cartItems$
    // Push the new items to the array before setting them in local storage
    this.cartItemsSubject.next(cartItems);

    // Set the updated cart items in local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));


  }

private updateCartLocalStorage(cartItems: FoodCorner[]): void {
  localStorage.setItem(this.cartKey, JSON.stringify(cartItems));
  }

removeFromCart(food: FoodCorner): void {
  const currentItems = this.cartItemsSubject.getValue();
  const updatedItems = currentItems.filter(item => item.id !== food.id);
  this.cartItemsSubject.next(updatedItems);
  this.updateCartLocalStorage(updatedItems);
  this.cartEventService.emitCartUpdated();
  }


}
