import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
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
