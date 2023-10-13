import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartEventService {

  cartUpdated = new EventEmitter<void>();

  emitCartUpdated(): void {
    this.cartUpdated.emit();
  }
}
