import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { FoodCorner } from '../Model/FoodCorner';

@Injectable({
  providedIn: 'root'
})
export class CartStorageService {
  private cartKey = 'cartItems';

  constructor(private localStorageService:LocalstorageService) {}
  saveCartItems(cartItems: FoodCorner[]): void {
    this.localStorageService.setItem(this.cartKey, cartItems);
  }
  
  loadCartItems(): FoodCorner[] {
    const storedItems = this.localStorageService.getItem(this.cartKey);
    return storedItems ? JSON.parse(storedItems) : [];
  }
}
