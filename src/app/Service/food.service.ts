import { Injectable } from '@angular/core';
import { FoodCorner } from '../Model/FoodCorner';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Service } from '../Model/Service';
import { WhyUs } from '../Model/WhyUs';
import { Slider } from '../Model/Slider';
import { Special } from '../Model/Special';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

constructor(private http: HttpClient){}

getCartItems(): Observable<FoodCorner[]> {
    return this.http.get<FoodCorner[]>(`${environment.apiUrl}`);
}
getFoodByID(id: string | null): Observable<FoodCorner> {
  const url = `${environment.apiUrl}/${id}`;
  return this.http.get<FoodCorner>(url).pipe(
    catchError((error: any) => {
      // Handle the error
      return throwError(error);
    })
  );
}
getAllFoods(): Observable<FoodCorner[]> {
  return this.http.get<FoodCorner[]>(`${environment.apiUrl}/cart`)
}
getAllSpecial(): Observable<Special[]> {
  return this.http.get<Special[]>(`${environment.apiUrl}/special`)
}
getAllServices(): Observable<Service[]> {
  return this.http.get<Service[]>(`${environment.apiUrl}/service`)
}
getAllWhyUs(): Observable<WhyUs[]> {
  return this.http.get<WhyUs[]>(`${environment.apiUrl}/whyus`)
}
getAllSlider(): Observable<Slider[]> {
  return this.http.get<Slider[]>(`${environment.apiUrl}/slider`)
}
getFoodIDs(): Observable<string[]> {
  return this.http.get<string[]>(`${environment.apiUrl}?_fields=id`);
}
}
