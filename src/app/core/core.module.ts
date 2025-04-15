import { NgModule } from '@angular/core';
import { LocalstorageService } from './services/localstorage.service';
import { AuthGuard } from './guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

export const FOOD_CATEGORIES:string[] = ['*', 'burger', 'pizza', 'pasta', 'fries'];

@NgModule({
  providers:[
    { provide:'FoodCategories', useValue: FOOD_CATEGORIES },
    { provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    LocalstorageService,
    AuthGuard
  ]
})
export class CoreModule {}
