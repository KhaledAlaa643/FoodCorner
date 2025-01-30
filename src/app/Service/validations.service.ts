import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, debounceTime, switchMap, map, catchError, distinctUntilChanged, fromEvent } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../Model/User';
import { filter } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

constructor(private httpClient: HttpClient) { }
passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  
  const password = control.get('password')?.value;
  const passwordConfirm = control.get('passwordConfirm')?.value;
    if ((password === passwordConfirm) && (password !== null && passwordConfirm !== null)) {
      control.get('passwordConfirm')!.setErrors(null);
      return null;
    } else {
          control.get('passwordConfirm')!.setErrors({ passwordsNotMatching: true });
          return { passwordsNotMatching: true };
    }
  }
  checkFieldExists(field: string, value: string): Observable<any> {

    const fetchData = this.httpClient.get<User[]>(`${environment.apiUrl}/users?${field}=${value}`).pipe(
      map(users => users.length > 0),
      catchError(() => of(false))
    );
    return fetchData
  }
    asyncFieldValidator(field: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);       
      return (control.valueChanges).pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(value => {
          console.log('Value after debounce:', value); 
          return this.checkFieldExists(field, value).pipe(
            map(exists => 
            {
              if (exists) {
                console.log("exists",{ [`${field}Exists`]: true });
                
                return { [`${field}Exists`]: true };  // Error object when field exists
              } else {
                return null;  // No validation error when field doesn't exist
              }
            }
            ), 
            catchError(() => of(null))
          );
        })
      );
  }
}
}
