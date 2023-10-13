import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartCommunicationService {
  private itemRemovedSubject = new Subject<void>();

  itemRemoved$ = this.itemRemovedSubject.asObservable();

  notifyItemRemoved() {
    this.itemRemovedSubject.next();
  }
}
