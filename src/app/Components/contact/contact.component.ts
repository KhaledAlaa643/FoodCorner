import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
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
