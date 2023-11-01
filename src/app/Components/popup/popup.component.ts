import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { AuthService } from 'src/app/Service/auth.service';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit  {
  modal_name: string = 'modalID';
  @ViewChild('close_btn') close_btn!: ElementRef;
  @ViewChild('open_btn') open_btn!: ElementRef;
  @Output() loginAndNavigate = new EventEmitter<void>();
  user: User = {} as User
  hide = true;
  showLogin = true;
  showSignUp = false;
  // loginPop = false
  public jobForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router,
    private authService:AuthService
  ) {
    this.jobForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
    openLoginSection() {
    // this.showLogin  = true;
  }
  open_modal() {
    this.open_btn.nativeElement.click();
  }

  getDialogTitle() {
    return this.showLogin ? 'LOGIN' : 'SIGN UP';
  }
  close_modal(e: any) {
    this.close_btn.nativeElement.click();
  }
    closeAndGoHome() {
    this.loginAndNavigate.emit();
    }

  login() {
    this.authService.login("khaled","n2KA643n2!")
    this.close_modal(null)
    this.router.navigate(['/home']);
  }

  onSubmit() {
      // this.dialogRef.close();
  }



passwordMatchValidator(control: AbstractControl): ValidationErrors | null  {
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


}
