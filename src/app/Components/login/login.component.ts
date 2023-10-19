import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/Model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = {} as User
  public jobForm: FormGroup;
  hide = true;
  private isOverlayVisible = true;
  constructor(private fb: FormBuilder,private dialog: MatDialog,
  public dialogRef: MatDialogRef<LoginComponent>) {
    this.jobForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  goBack() {
    this.dialogRef.close('cancel');
  }
closeDialog(): void {
  this.dialogRef.close();
  this.toggleOverlayContainer();
}
toggleOverlayContainer(): void {
  // Find the overlay container element by its class
  const overlayContainer = document.querySelector('.cdk-overlay-container') as HTMLElement;

  // Toggle the display property
  if (overlayContainer) {
    this.isOverlayVisible = !this.isOverlayVisible;
    overlayContainer.style.display = this.isOverlayVisible ? 'flex' : 'none';
  }
}
}
