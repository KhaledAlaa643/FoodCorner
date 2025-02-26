import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FoodCorner } from '../Model/FoodCorner';
import { CartStorageService } from './cart-storage.service';
import { CART_ITEMS } from '../cartItemsToken';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {
  public cartItemsSubject = new BehaviorSubject<FoodCorner[]>([]);
  private hasItemsSubject = new BehaviorSubject<boolean>(false);
  private itemAddedToCart = new BehaviorSubject<boolean>(false);
  private itemRemovedSubject = new Subject<void>();

  public cartItems$ = this.cartItemsSubject.asObservable();
  itemAddedToCart$: Observable<boolean> = this.itemAddedToCart.asObservable();

  hasItems$ = this.hasItemsSubject.asObservable();
  itemRemoved$ = this.itemRemovedSubject.asObservable();

  private isLoaded = false;
constructor(
  private cartStorageService:CartStorageService 
) {  
  this.itemAddedToCart.next(true)
  this.loadCartItems()
}

isInCartItem(id:number) {
  const currentCartItems = this.cartItemsSubject.getValue() as {id:number}[]
  return currentCartItems.some(item => item.id === id);
}
updateCartState(hasItems: boolean) {
  this.hasItemsSubject.next(hasItems);
}

updateCartItems(cartItems: FoodCorner[]): void {
  this.cartItemsSubject.next(cartItems);
}

setCartItems(cartItems: FoodCorner[]): Observable<FoodCorner[]> {
  this.cartItemsSubject.next(cartItems);
  return this.cartItems$;
}

loadCartItems(): void {
  if (!this.isLoaded) {
    const storedItems = this.cartStorageService.loadCartItems();
    this.cartItemsSubject.next(storedItems);
    this.isLoaded = true; 
  }
}

saveCartItemsToLocalStorage(cartItems: FoodCorner[]): void {
  this.cartStorageService.saveCartItems(cartItems);
  }

addToCart(item: FoodCorner): void {
    if (!item || !item.id) return;
    
    try {
      this.itemAddedToCart.next(true);
  
      const updatedCart = this.getUpdatedCartWithItem(item);
      
      this.cartItemsSubject.next(updatedCart);

      this.saveCartItemsToLocalStorage(updatedCart);
    } 
    catch (error) {
      console.error('Error adding item to cart:', error);
    }
  }

private getUpdatedCartWithItem(item: FoodCorner): FoodCorner[] {
  const currentItems = [...this.cartItemsSubject.getValue()]; // Create a new array (avoid mutation)
  const existingItem = currentItems.find((food) => food.id === item.id);

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    currentItems.push(item);
  }

  return currentItems.filter((food) => food && food.id); // Remove invalid items
}

notifyItemRemoved():void{
  this.itemRemovedSubject.next();
  }

updateCartItemsInLocalStorage(cartItems: FoodCorner[]): void {
    this.cartItemsSubject.next(cartItems);
    this.saveCartItemsToLocalStorage(cartItems);
  }

removeFromCart(food: FoodCorner): void {
  try {
    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.filter(item => item.id !== food.id);
    this.cartItemsSubject.next(updatedItems);
    this.cartStorageService.saveCartItems(updatedItems);
  } 
  catch (error) {
    console.error('Error removing item from cart:', error);
  }
}
}
