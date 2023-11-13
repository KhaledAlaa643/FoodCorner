import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
      public bookTable: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bookTable = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required,
                  Validators.minLength(11),
                  Validators.maxLength(11),
                  Validators.pattern(/^0[0-9]+$/)]],
      people: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      msg: ['', [Validators.required]],
    }

    )
  }
  book() {
  Swal.fire({
  position: 'center',
  icon: 'success',
  title: 'Your Table has been saved',
  showConfirmButton: false,
  timer: 1500
})
}
}
