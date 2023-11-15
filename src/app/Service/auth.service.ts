import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInValue: BehaviorSubject<boolean>;

    private showModalSubject = new Subject<void>();

  showModal$ = this.showModalSubject.asObservable();


constructor( ) {
  this.isLoggedInValue = new BehaviorSubject<boolean> (false)
}
  login(email: string, password: string) {
    let userToken = "User Loggin"
    localStorage.setItem("Is User Logged", userToken);
    this.isLoggedInValue.next(true)
  }

  logout(): void {
    localStorage.removeItem("IsLoggin")
    this.isLoggedInValue.next(false)
  }

  get isLoggedIn(): boolean {
    return (localStorage.getItem("IsLoggin")) ? true : false
  }
  userStatus() {
    return this.isLoggedInValue.asObservable()
  }

    showLoginModal() {
    this.showModalSubject.next();
  }
}
