import { Component, OnInit ,ElementRef, ViewChild, DestroyRef } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { User } from 'src/app/features/auth/models/User';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { ModalService } from 'src/app/shared/layouts/header/modal.service';
import { ValidationsService } from 'src/app/features/auth/services/validations.service';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],

})
export class PopupComponent implements OnInit{
  @ViewChild('close_btn') close_btn!: ElementRef;
  @ViewChild('open_btn') open_btn!: ElementRef;
  modal_name: string = 'modalID';
  user: User = {} as User
  loginHide = true;
  signHidePw = true
  signHideConf = true
  showLogin = true;
  showSignUp = false;
  signupSubscription !:Subscription
  registrationForm!: FormGroup;
  loginForm: FormGroup;


  constructor(
    private fb: FormBuilder, 
    private authService:AuthService, 
    private validationService:ValidationsService,
    private modalService: ModalService,
    private destroyRef: DestroyRef,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  createForm() {
    this.registrationForm = this.fb.group(
      {
        userName: new FormControl('', {
          validators: [Validators.required],
          asyncValidators: [this.validationService.asyncFieldValidator('userName')],
        }),
        email: new FormControl('', {
          validators: [Validators.required, Validators.email],
          asyncValidators: [this.validationService.asyncFieldValidator('email')],
        }),
        password: ['', [
          Validators.required, 
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/)
        ]],
        passwordConfirm: [null, [Validators.required]]
      },
      { validator: this.validationService.passwordMatchValidator }
    );
  }
  ngOnInit(): void {
    
    const authSubscription = this.modalService.showModal$.subscribe(() => this.open_modal());
    this.createForm();
    this.destroyRef.onDestroy(()=>{
      authSubscription.unsubscribe();
      this.signupSubscription.unsubscribe()
    })
  }
  open_modal() {
    this.open_btn.nativeElement.click();
  }

  getDialogTitle() {
    return this.showLogin ? 'LOGIN' : 'SIGN UP';
  }
  resetForm (form:FormGroup){
    form.reset() 
  }
  close_modal() {
    this.close_btn.nativeElement.click();
  }
  signup(body:User) : void{
    if (this.registrationForm.invalid) {
      return; 
    }
    const formdata = {
      userName: body.userName,
      email:body.email,
      password:body.password,
      passwordConfirm: body.passwordConfirm
    }
    this.signupSubscription = this.authService.signup(formdata).subscribe()
    this.resetForm(this.registrationForm)
    this.close_modal()
  }

  login() {
    if (this.loginForm.invalid) {
      return; 
    }
    this.authService.login("khaled","n2KA643n2!")
    this.resetForm(this.loginForm)
    this.close_modal()
  }

}
