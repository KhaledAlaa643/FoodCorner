import { Component, DestroyRef, inject, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/Service/food.service';
import { FoodCorner } from 'src/app/Model/FoodCorner';
import { Subscription } from 'rxjs';
import { CartItemsService } from 'src/app/Service/cart-items.service';
import { LocalstorageService } from 'src/app/Service/localstorage.service';
import { CART_ITEMS } from 'src/app/cartItemsToken';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.css']
})
export class FoodDetailsComponent implements OnInit {
  currFoodId!: string;
  foodData: FoodCorner = {} as FoodCorner;
  foods: FoodCorner[] = [] ;
  sub!: Subscription;
  isItemInCart= false  ;
  constructor(
    @Inject(CART_ITEMS) private getCartItemsToken:any[],
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private location: Location,
    private cartItemsService: CartItemsService,
    private localStorageService:LocalstorageService,
    private destroyRef: DestroyRef
  ) {}


ngOnInit(): void {
  this.sub = this.activatedRoute.params.subscribe((params) => {
    this.currFoodId = params['id'];
  });
  const foodSubscription = this.foodService.getFoodByID(this.currFoodId).subscribe((res)=>{
    this.foodData = res    
  })
  // show and hide button based on the food is in cart or no
  this.foods = this.cartItemsService.cartItemsSubject.getValue();
  this.isItemInCart =  this.foods.some(item => item.id ===  this.currFoodId) 
  this.destroyRef.onDestroy(()=>{
    this.sub.unsubscribe()
    foodSubscription.unsubscribe()
  })

}


  addToCart(): void {
  this.cartItemsService.addToCart(this.foodData);
  this.isItemInCart = true;
  this.cartItemsService.updateCartState(this.isItemInCart)
  
    if (!this.isItemInCart) {
      this.foods.push(this.foodData);
      this.saveItemsToLocalStorage(this.foods);
      this.cartItemsService.updateCartItems(this.foods);
    }

}


saveItemsToLocalStorage(cartItems: FoodCorner[]): void {
  if (!this.getCartItemsToken.some((item: FoodCorner) => item.id === this.currFoodId && item.quantity > 0)) {
    this.getCartItemsToken.push({
      id: this.currFoodId,
      name: this.foodData.name,
      cookTime: this.foodData.cookTime,
      price: this.foodData.price,
      quantity: this.foodData.quantity,
      imageURL: this.foodData.imageURL,
    }); // Add the item to the cart in the local storage

    // Save the updated cart items to local storage
    
    this.localStorageService.setItem('cartItems', this.getCartItemsToken);
  }
}


toggleLike(food: FoodCorner): void {
    food.favorite = !food.favorite;
  }

back(): void {
    this.location.back();
  }

}

