import { Component, DestroyRef, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/Service/food.service';
import { FoodCorner } from 'src/app/Model/FoodCorner';
import { Subscription } from 'rxjs';
import { CartItemsService } from 'src/app/Service/cart-items.service';
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
  allFoods: FoodCorner[] = [] ;
  sub!: Subscription;
  fetchAllFood!: Subscription;
  foodSubscription!: Subscription;
  isItemInCart= false  ;
  isFirstDisabled :boolean = false
  isLastDisabled :boolean = false
  cartItemIds = this.cartItemsService.cartItemIds;   
  constructor(
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private location: Location,
    private cartItemsService: CartItemsService,
    private destroyRef: DestroyRef,
    private router:Router
  ) {}


ngOnInit(): void {  
  this.sub = this.activatedRoute.params.subscribe((params) => {
    this.currFoodId = params['id'];
    this.loadFoodData();
    this.checkNavigationStatus()
  });
  
  this.destroyRef.onDestroy(()=>{
    this.sub.unsubscribe()
  })
  
  this.getAllFoods();
    
}

loadFoodData() {
  this.foodService.getFoodByID(this.currFoodId).subscribe(res=> this.foodData = res);
}

getAllFoods(){
  this.fetchAllFood = this.foodService.fetchData("food").subscribe( (res:any)=>{
    this.allFoods = res
    this.checkNavigationStatus()
  })
}

checkNavigationStatus() {
  if (!this.allFoods) return;

  this.currentIndex = this.allFoods.findIndex((element: any) => element.id == this.currFoodId);

  if (this.currentIndex === this.allFoods.length - 1) {
    this.isLastDisabled = true;
  } else {
    this.isLastDisabled = false;
  }

  this.isFirstDisabled = this.currentIndex === 0;
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
}

toggleLike(food: FoodCorner): void {
    food.favorite = !food.favorite;
}
back(): void {
    this.location.back();
}

}

