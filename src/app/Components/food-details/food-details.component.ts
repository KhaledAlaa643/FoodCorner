import { Component, DestroyRef, inject, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
  currFoodId!: number;
  currentIndex!: number;
  foodData: FoodCorner = {} as FoodCorner;
  cartFoods: FoodCorner[] = [] ;
  allFoods: FoodCorner[] = [] ;
  sub!: Subscription;
  fetchAllFood!: Subscription;
  foodSubscription!: Subscription;
  isItemInCart= false  ;
  isFistDisabled :boolean = false
  isLastDisabled :boolean = false
  constructor(
    @Inject(CART_ITEMS) private getCartItemsToken:any[],
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private location: Location,
    private cartItemsService: CartItemsService,
    private localStorageService:LocalstorageService,
    private destroyRef: DestroyRef,
    private router:Router
  ) {}


ngOnInit(): void {  
  this.sub = this.activatedRoute.params.subscribe((params) => {
    this.currFoodId = parseInt(params['id']);
    this.loadFoodData();
    this.checkNavigationStatus()
  });
  const foodSubscription = this.foodService.getFoodByID(this.currFoodId).subscribe((res)=>{
    this.foodData = res    
    
  })
  
  this.destroyRef.onDestroy(()=>{
    this.sub.unsubscribe()
    foodSubscription.unsubscribe()
  })
  
  this.getAllFoods();
    
}

loadFoodData() {
  this.foodService.getFoodByID(this.currFoodId).subscribe((res) => {
    this.foodData = res;
    this.cartItemsService.cartItems$.subscribe((value)=>
      this.cartFoods = value
    );
    this.isItemInCart =  this.cartFoods.some(food => food.id ==  this.currFoodId)     
  });
}
getAllFoods(){
  this.fetchAllFood = this.foodService.fetchData("food").subscribe( (res:any)=>{
    this.allFoods = res
    this.checkNavigationStatus()
  })
}
checkNavigationStatus() {
  if (!this.allFoods) return;

  this.currentIndex = this.allFoods.findIndex((element: any) => +element.id == this.currFoodId);

  if (this.currentIndex === this.allFoods.length - 1) {
    this.isLastDisabled = true;
  } else {
    this.isLastDisabled = false;
  }

  this.isFistDisabled = this.currentIndex === 0;
}
next (){
  let nextFoodId = +this.allFoods[this.currentIndex + 1]?.id;
  
  if (!this.allFoods || this.currentIndex === -1) return;
  if (this.currentIndex < this.allFoods.length - 1) {
    this.router.navigate(['/food', nextFoodId]);
  }
}
previous (){
  let previousItemId = +this.allFoods[this.currentIndex - 1].id
  if (this.currentIndex  > 0) {
    this.router.navigate(['/food', previousItemId]);
  }
}
  addToCart(): void {
    this.cartItemsService.addToCart(this.foodData);
    this.isItemInCart = true
    this.cartItemsService.updateCartState(this.isItemInCart)
    if (!this.isItemInCart) {
      this.cartFoods.push(this.foodData);
      this.saveItemsToLocalStorage(this.cartFoods);
      this.cartItemsService.updateCartItems(this.cartFoods);
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

