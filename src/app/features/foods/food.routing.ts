import { Routes, RouterModule } from '@angular/router';
import { FoodDetailsComponent } from './components/food-details/food-details.component';

const routes: Routes = [
  {  path:"",component:FoodDetailsComponent },
];

export const FoodRoutes = RouterModule.forChild(routes);
