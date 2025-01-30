import { ChangeDetectionStrategy, Component, DestroyRef, Inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FoodCorner } from 'src/app/Model/FoodCorner';
import { FoodService } from 'src/app/Service/food.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CartItemsService } from 'src/app/Service/cart-items.service';
import { Special } from 'src/app/Model/Special';
import { forkJoin } from 'rxjs';
import { LocalstorageService } from 'src/app/Service/localstorage.service';
import { CART_ITEMS } from 'src/app/cartItemsToken';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      state('show', style({
        opacity: 1,
      })),
      state('hide', style({
        opacity: 0,
        height: '0',
        overflow: 'hidden',
      })),
      transition('show <=> hide', animate('500ms ease-in-out')),
    ]),
  ],
})
export class HomeComponent implements OnInit{
  food: FoodCorner = {} as FoodCorner;
  selectedCategory: string = "";
  categories:string[]= []
  foodsItemsCart :FoodCorner[] = [];
  foodsOriginal :FoodCorner[] = [];
  filteredFoodsSignal = signal<FoodCorner[]>(this.foodsOriginal);
  showAllProducts: boolean = false;
  currFoodId!: string;
  isInCart= false  ;
  isScrollbarEnabled = false;
  activeTabIndex: number = 0;
  constructor(
    @Inject(CART_ITEMS) private getCartItemsToken:any[],
    @Inject('FoodCategories') FoodCategories:string[],
    private router: Router,
    private foodService: FoodService,
    private cartItemsService: CartItemsService,
    private localStorageService:LocalstorageService,
    private destroyRef: DestroyRef
  ) { this.categories = FoodCategories}

  ngOnInit(): void {
      const fetchFood = this.foodService.fetchData<FoodCorner>('food').subscribe((foods)=>{
        this.foodsOriginal = foods
        this.filteredFoodsSignal.set(foods)
    })
    this.foodsItemsCart = this.cartItemsService.cartItemsSubject.getValue();
    this.destroyRef.onDestroy(()=>{
      fetchFood.unsubscribe()
    })
  }

  filterFoodsByCategory(category: string | any) {
    this.selectedCategory = category;
    if (category === '*' || category === '') {
      this.filteredFoodsSignal.set(this.foodsOriginal);    
    } else {
      const filteredFoods = this.foodsOriginal.filter(food => food.tag === category);
      this.filteredFoodsSignal.set(filteredFoods);
    }
  }


  setActiveTab(index: number): void {
    this.activeTabIndex = index;
  }
  toggleScrollbar() {
    this.isScrollbarEnabled = !this.isScrollbarEnabled;
  }
  
openFoodDetails(food: FoodCorner): void {
  this.router.navigate(['/food', food.id]);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


isInCartItem(id: number): boolean {  
  return this.foodsItemsCart.some(item => item.id === id);
}

addToCart(food: FoodCorner): void {
  const isItemInCart = this.cartItemsService.id(food.id);  
  if (!isItemInCart) {
    this.cartItemsService.addToCart(food);
    const currentCartItems = this.cartItemsService.cartItemsSubject.getValue();
    this.foodsItemsCart = currentCartItems;
  }
}

saveItemsToLocalStorage(cartItems: FoodCorner[]): void {
  const foodData = {
    id: this.currFoodId,
    name: this.food.name,
    cookTime: this.food.cookTime,
    price: this.food.price,
    quantity: this.food.quantity,
    imageURL: this.food.imageURL,
  }
  if (!this.getCartItemsToken.some((item: FoodCorner) => item.id === this.currFoodId && item.quantity > 0)) {
    this.getCartItemsToken.push(foodData); 
    this.localStorageService.setItem('cartItems', this.getCartItemsToken);
  }
}


toggleShowAllProducts() {
    this.showAllProducts = !this.showAllProducts;
  }
  toggleLike(food: FoodCorner): void {
    food.favorite = !food.favorite;
  }


}
