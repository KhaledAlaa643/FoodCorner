import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {


    public contact: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contact = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      msg: ['', [Validators.required]],
    })
  }

msg(){
  Swal.fire({
  position: 'center',
  icon: 'success',
  title: 'Your Message has been sent',
  showConfirmButton: false,
  timer: 1500
})
}

}
