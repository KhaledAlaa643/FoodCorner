import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodDetailsComponent } from './components/food-details/food-details.component';
import { FoodService } from './services/food.service';
import { SharedModule } from "../../shared/shared.module";
import { FoodRoutes } from './food.routing';



@NgModule({
  declarations: [FoodDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    FoodRoutes
],
  providers:[FoodService]
})
export class FoodModule { }
