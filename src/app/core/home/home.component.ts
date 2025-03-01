import { ChangeDetectionStrategy, Component, DestroyRef, Inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FoodCorner } from 'src/app/Model/FoodCorner';
import { FoodService } from 'src/app/Service/food.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CartItemsService } from 'src/app/Service/cart-items.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';

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
  currFoodId!: number;
  isInCart= false  ;
  constructor(
    @Inject('FoodCategories') FoodCategories:string[],
    private router: Router,
    private foodService: FoodService,
    private cartItemsService: CartItemsService,
    private destroyRef: DestroyRef
  ) { this.categories = FoodCategories}
  
  ngOnInit() {
    this.loadFoods();
    this.subscribeToCart();
  }
  
  private loadFoods() {
    this.foodService.fetchData<FoodCorner>('food')
    .pipe(
      startWith([]),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe(foods => {
      this.foodsOriginal = foods;
      this.filteredFoodsSignal.set(foods);
    });
}

private subscribeToCart() {
  this.cartItemsService.cartItems$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(items => this.foodsItemsCart = items);
}

filterFoodsByCategory(category: string) {
    const filtered = this.foodService.filterFoodsByCategory(this.foodsOriginal, category);
    this.filteredFoodsSignal.set(filtered);
    this.selectedCategory = category
}

openFoodDetails(food: FoodCorner): void {
  this.router.navigate(['/food', food.id]);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

isInCartItem(id: number): boolean {
  return this.cartItemsService.isInCartItem(id)
}

addToCart(food: FoodCorner): void {
    this.cartItemsService.addToCart(food);
}

toggleShowAllProducts() {
    this.showAllProducts = !this.showAllProducts;
}
toggleLike(food: FoodCorner): void {
    this.foodService.toggleFavorite(food);
}
}
