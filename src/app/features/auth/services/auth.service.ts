import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from '../../../core/services/localstorage.service';
import { AuthInterface } from '../../foods/models/data.interface';


@Injectable({
  providedIn: 'root'
})
// login, logout, signup, and status tracking
export class AuthService implements AuthInterface{
  private isLoggedInValue: BehaviorSubject<boolean>;

  constructor( private httpClient: HttpClient,
    private localStorageService:LocalstorageService
  ) {
    const tokenExists = !!this.getToken();
    this.isLoggedInValue = new BehaviorSubject<boolean>(tokenExists);
  }
  getToken ():string | null{
    return localStorage.getItem("auth-token")
  }
  login(email: string, password: string) {
    this.localStorageService.setItem("IsLoggin", "true");
    this.localStorageService.setItem("auth-token","test-token")
    this.isLoggedInValue.next(true)
  }
  logout(): void {
    this.localStorageService.removeItem("IsLoggin")
    this.localStorageService.removeItem("auth-token")
    this.isLoggedInValue.next(false)
  }
  signup(body:User):Observable<User> {
    return this.httpClient.post<User>(`${environment.apiUrl}/users`,body)
  }

  get isLoggedIn(): boolean {
    return !!this.localStorageService.getItem("auth-token");
  }
  userStatus() {
    return this.isLoggedInValue.asObservable()
  }

}
