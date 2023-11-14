import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { AuthService } from 'src/app/Service/auth.service';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @ViewChild('close_btn') close_btn!: ElementRef;
  @ViewChild('open_btn') open_btn!: ElementRef;
  @Output() loginAndNavigate = new EventEmitter<void>();
  @Output() showLoginSection = new EventEmitter<void>();
  modal_name: string = 'modalID';
  user: User = {} as User
  loginHide = true;
  signHidePw = true
  signHideConf = true
  showLogin = true;
  showSignUp = false;
  public registrationForm: FormGroup;
  public jobForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
    private authService:AuthService
  ) {
    this.jobForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
        this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),
        Validators.pattern
          (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/)],
    ],
      passwordConfirm: [null, [Validators.required]],
    }
      , { validator: this.passwordMatchValidator }
    )
  }

  openLoginSection() {
    this.showLoginSection.emit();
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
    this.close_btn.nativeElement.click();
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
