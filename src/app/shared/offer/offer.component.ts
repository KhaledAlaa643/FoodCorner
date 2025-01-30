import { ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { Offer } from 'src/app/Model/Offer';
import { FoodService } from 'src/app/Service/food.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {
  offerItems:Offer[] = []

  constructor(private foodService: FoodService,
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef

  ) { }

  ngOnInit() {
    const fetchOffer = this.foodService.fetchData<Offer>('offer').subscribe(offer=> {
      this.offerItems = offer
      this.cdr.detectChanges()
    })
    this.destroyRef.onDestroy(()=>fetchOffer.unsubscribe())
  }

}
