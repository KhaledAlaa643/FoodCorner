import { Injectable } from '@angular/core';
import { FoodCorner } from '../Model/FoodCorner';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Special } from '../Model/special';
import { Service } from '../Model/Service';
import { WhyUs } from '../Model/WhyUs';
import { Slider } from '../Model/slider';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

getFoodByID(id: string | null): Observable<FoodCorner> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.get<FoodCorner>(url).pipe(
    catchError((error: any) => {
      // Handle the error
      return throwError(error);
    })
  );
}
  getAllFoods(): Observable<FoodCorner[]> {
    return this.http.get<FoodCorner[]>(`${this.apiUrl}/cart`)
  }
  getAllSpecial(): Observable<Special[]> {
    return this.http.get<Special[]>(`${this.apiUrl}/special`)
  }
  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/service`)
  }
  getAllWhyUs(): Observable<WhyUs[]> {
    return this.http.get<WhyUs[]>(`${this.apiUrl}/whyus`)
  }
  getAllSlider(): Observable<Slider[]> {
    return this.http.get<Slider[]>(`${this.apiUrl}/slider`)
  }

  getFoodIDs(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}?_fields=id`);
  }
}
