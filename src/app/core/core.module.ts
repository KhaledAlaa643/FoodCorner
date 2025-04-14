import { NgModule } from '@angular/core';
import { LocalstorageService } from './services/localstorage.service';
import { AuthGuard } from './guards/auth.guard';

export const FOOD_CATEGORIES:string[] = ['*', 'burger', 'pizza', 'pasta', 'fries'];

@NgModule({
  providers:[
    { provide:'FoodCategories', useValue: FOOD_CATEGORIES },
    LocalstorageService,
    AuthGuard
  ]
})
export class CoreModule {}
