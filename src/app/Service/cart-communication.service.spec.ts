import { TestBed } from '@angular/core/testing';

import { CartCommunicationService } from './cart-communication.service';

describe('CartCommunicationService', () => {
  let service: CartCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
