import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { Injectable, ViewChild } from '@angular/core';
import { PopupComponent } from '../Components/popup/popup.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  @ViewChild('popupComp') popupComponent!:PopupComponent

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      alert("You Should Login First")
      this.authService.showLoginModal()
      return false;
    }
  }
}