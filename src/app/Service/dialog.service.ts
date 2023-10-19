import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../Components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }
openLoginDialog() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = '40vw';
  dialogConfig.disableClose = true;
  this.dialog.open(LoginComponent, dialogConfig);
}

closeOverlayContainer(): void {
  const overlayContainer = document.querySelector('.cdk-overlay-container') as HTMLElement;
  if (overlayContainer) {
    overlayContainer.style.display = 'none';
  }
}






}
