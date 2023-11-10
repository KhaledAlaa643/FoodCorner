import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FoodCorner } from '../Model/FoodCorner';
import { CartEventService } from './cart-event.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {
  private cartKey = 'cartItems';
  private apiUrl = 'http://localhost:3000';
  public cartItemsSubject = new BehaviorSubject<FoodCorner[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();
  private itemAddedToCartSubject = new BehaviorSubject<boolean>(false);
  itemAddedToCart$: Observable<boolean> = this.itemAddedToCartSubject.asObservable();
  private hasItemsSubject = new BehaviorSubject<boolean>(false);
  hasItems$ = this.hasItemsSubject.asObservable();


  constructor(private cartEventService: CartEventService,
  private http: HttpClient,) {
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

  getCartItemById(id: string): FoodCorner | undefined {
    const cartItems = this.cartItemsSubject.getValue();
    return cartItems.find((item) => item.id === id);
  }

  getCartItems(): Observable<FoodCorner[]> {
    return this.cartItems$;
  }
  getCartItemsApi(): Observable<FoodCorner[]> {
    return this.http.get<FoodCorner[]>(this.apiUrl);
  }

  setCartItems(cartItems: FoodCorner[]): Observable<FoodCorner[]> {
      return this.cartItems$;

  }
  sendCartItems(cartItems: FoodCorner[]): void {
    this.cartItemsSubject.next(cartItems);
  }

  loadCartItemsFromLocalStorage(): void {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.cartItemsSubject.next(savedCartItems);
  }
loadCartItems(): void {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  const filteredCartItems = cartItems.filter((item: any) => item && item.id); // Filter out undefined or items without an ID
  this.cartItemsSubject.next(filteredCartItems);
  
  }
  private saveCartItemsToLocalStorage(cartItems: FoodCorner[]): void {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
length (cartItems: any){
  cartItems = this.cartItems$.subscribe;
  return cartItems
}

removeLastItemFromCart(): void {
  // Retrieve the current cart items from local storage
  const currentCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

  // Check if there are items in the cart
  if (currentCartItems.length > 0) {
    // Remove the last item from the cart items array
    currentCartItems.pop();

    // Update the local storage with the modified cart items
    localStorage.setItem('cartItems', JSON.stringify(currentCartItems));

    // Update the cart items subject if needed
    this.cartItemsSubject.next(currentCartItems);
  }
}

addToCart(item: FoodCorner): void {
  this.itemAddedToCartSubject.next(true);
  const currentCartItems = this.cartItemsSubject.getValue();

  // Check if the item is valid (not empty and has an 'id' property)
  if (item && item.id) {
    const existingItem = currentCartItems.find((food) => food.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      currentCartItems.push(item);
    }

    // Filter out any empty or invalid items
    const filteredCartItems = currentCartItems.filter((food) => food && food.id);

    this.cartItemsSubject.next(filteredCartItems);
    this.saveCartItemsToLocalStorage(filteredCartItems);
  } else {
    // Handle the case of an empty or invalid item (optional)
    console.log("Invalid item, not adding to the cart");
  }
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
