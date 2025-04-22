import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaticValidationService {

constructor() { }
checkFieldExists(field: string, value: string): Observable<any> {
  return of(null);
}
}
