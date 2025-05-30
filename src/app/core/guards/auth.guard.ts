import { CanActivate  } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { Injectable } from '@angular/core';
import { ModalService } from '../../shared/layouts/header/modal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,private modalService:ModalService) { }
  canActivate(){
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      alert("You Should Login First")
      this.modalService.showLoginModal()
      return false;
    }
  }
}