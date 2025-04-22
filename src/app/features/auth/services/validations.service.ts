import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, debounceTime, switchMap, map, catchError, distinctUntilChanged, first } from 'rxjs';
import { User } from '../models/User';
import { environment } from 'src/environments/environment.development';
import { ValidationInterface } from '../../foods/models/data.interface';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService implements ValidationInterface {
isExist !:Boolean
constructor(private httpClient: HttpClient) { }
passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const passwordConfirm = control.get('passwordConfirm')?.value;
  if (!password || !passwordConfirm) return null;

  return password === passwordConfirm ? null : { passwordsNotMatching: true };
    
  }
  checkFieldExists(field: string, value: string): Observable<any> {
    return this.httpClient.get<User[]>(`${environment.apiUrl}/users?${field}=${value}`)
    .pipe(
      map(users =>users.length > 0 ? users[0] : null),
      catchError(error =>  of(null))
    )
  }
  
  asyncFieldValidator(field: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);
      
      return control.valueChanges.pipe(
        debounceTime(500), 
        distinctUntilChanged(),
        switchMap(value => 
          this.checkFieldExists(field, value).pipe(
            map(exists => exists ? { [`${field}Exists`]: true } : null),
            catchError(() => of(null)) 
          )),
        first()
      )};
  }
  
  
  
  
  
  
  

  
  
  
  
}
