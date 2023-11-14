import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/Service/food.service';
import { FoodCorner } from 'src/app/Model/FoodCorner';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CartItemsService } from 'src/app/Service/cart-items.service';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.css']
})
export class FoodDetailsComponent implements OnInit, OnDestroy {
  currFoodId!: string;
  food: FoodCorner = {} as FoodCorner;
  foods: FoodCorner[] = [] ;
  sub!: Subscription;
  isItemInCart= false  ;
  cartItem = true
  length!:any
  private static isItemInCartSubject = new BehaviorSubject<boolean>(false);
  static isItemInCart$ = FoodDetailsComponent.isItemInCartSubject.asObservable();

  constructor(
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private location: Location,
    private cartItemsService: CartItemsService,
  ) {
    const savedValue = localStorage.getItem('isItemInCart');
    if (savedValue !== null) {
      this.isItemInCart = savedValue === 'true';
      FoodDetailsComponent.isItemInCartSubject.next(this.isItemInCart);
    }
  }


ngOnInit(): void {
  this.sub = this.activatedRoute.params.subscribe((params) => {
    this.currFoodId = params['id'];
    this.food = history.state.foodData;

    // Check if the item is already in the cart
    this.checkIfItemInCart();

  });
}



  getFoodDetails(): void {
    this.foodService.getFoodByID(this.currFoodId).subscribe(
      (res: FoodCorner) => {
        this.food = res;
        this.checkIfItemInCart();
      },
      (err: any) => {
        console.error('Error fetching food details:', err);
      }
    );
  }


  checkIfItemInCart(): any {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const itemIdToCheck =  this.currFoodId; // Use either food.id or currFoodId
    const isItemInCart = savedCartItems.some((item: any) => item.id === itemIdToCheck && item.quantity > 0);

    this.isItemInCart = isItemInCart;

  return isItemInCart;
}





  addToCart(): void {
  this.cartItemsService.addToCart(this.food);
  this.isItemInCart = true;
  this.cartItemsService.updateCartState(this.isItemInCart)
  const currentCartItems = this.cartItemsService.cartItemsSubject.getValue();


  // Check if the food item is already in the cart
  const isItemInCart = currentCartItems.some((item) => item.id === this.food.id);

    if (!isItemInCart) {
      currentCartItems.push(this.food);
      // Save the updated cart items to local storage
      this.saveItemsToLocalStorage(currentCartItems);

      this.isItemInCart = true;
      // Update the cart items in the service
      this.cartItemsService.updateCartItems(currentCartItems);
    }

}


saveItemsToLocalStorage(cartItems: any[]): void {
  const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

  if (!savedCartItems.some((item: any) => item.id === this.currFoodId && item.quantity > 0)) {
    savedCartItems.push({
      id: this.currFoodId,
      name: this.food.name,
      cookTime: this.food.cookTime,
      price: this.food.price,
      quantity: this.food.quantity,
      imageURL: this.food.imageURL,
    }); // Add the item to the cart in the local storage

    // Save the updated cart items to local storage
    localStorage.setItem('cartItems', JSON.stringify(savedCartItems));

    // Update the isItemInCart flag and save it in local storage
    localStorage.setItem('isItemInCart', 'true');
  } else {
    // If the item is already in the cart, set isItemInCart to false and remove it from local storage
    localStorage.setItem('isItemInCart', 'false');

    // Handle removing the item from the cartItems array in local storage if needed
    // (remove the logic to remove the item from cartItems if not needed)
    const updatedCartItems = savedCartItems.filter((item: any) => item.id !== this.currFoodId);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  }
}


toggleLike(food: FoodCorner): void {
    food.favorite = !food.favorite;
  }

back(): void {
    this.location.back();
  }

ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getStarsArray(stars: number): any{
    const fullStars = Math.floor(stars); // Number of full stars
    const hasHalfStar = stars % 1 !== 0; // Check if there is a half star

    if (hasHalfStar) {
      // Add half star if present
      return Array(fullStars).fill(0).concat(0.5);
    } else {
      // Only full stars
      return Array(fullStars).fill(0);
    }
  }
}

