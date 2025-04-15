import { Injectable } from '@angular/core';
import { FoodCorner } from '../models/FoodCorner';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { CacheService } from 'src/app/core/services/cache.service';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  url = environment.apiUrl;
  private cache = new Map<string, Observable<any>>();

constructor(private http: HttpClient,
  private cacheService: CacheService
){}

getFoodByID(id: string | null | number): Observable<FoodCorner> {
  return this.http.get<FoodCorner>(`${this.url}/food/${id}`)
  .pipe(
    catchError(this.handleError(id))
  );
}

fetchData<T>(endpoint?: string): Observable<T[]> {
  const dataUrl = endpoint ? `${this.url}/${endpoint}` : `${this.url}`;

  const cached = this.cacheService.get<T>(dataUrl);
  if (cached) return cached;

  const request = this.http.get<T[]>(dataUrl).pipe(
    shareReplay(1),
    catchError(err => {
      this.cacheService.delete(dataUrl);
      throw err;
    })
  );

  this.cacheService.set<T>(dataUrl, request);
  return request;
}

filterFoodsByCategory(foods: FoodCorner[], category: string): FoodCorner[] {
  if (!category || category === '*') {
    return foods;
  }
  return foods.filter(food => food.tag?.toString() === category);
}

handleError(error:string | undefined | any):any{
  return () => throwError(() => new Error(`Failed to Load ${error}. Please try again later.`))
}
toggleFavorite(food: FoodCorner): boolean {
  return food.favorite = !food.favorite;
}
}
