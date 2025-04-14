import { ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { WhyUs } from 'src/app/pages/home/articles/models/WhyUs';
import { FoodService } from 'src/app/features/foods/services/food.service';

@Component({
  selector: 'app-whyUs',
  templateUrl: './whyUs.component.html',
  styleUrls: ['./whyUs.component.css']
})
export class WhyUsComponent implements OnInit {
  whyUsItems :WhyUs[]= [];

  constructor(private foodService: FoodService,private cdr:ChangeDetectorRef,
    private destroyRef: DestroyRef

  ) { }

  ngOnInit() {
    const fetchWhyus = this.foodService.fetchData<WhyUs>('whyUs').subscribe ( whyUs => {
      this.whyUsItems = whyUs;
      this.cdr.detectChanges()
    })
    this.destroyRef.onDestroy(()=>fetchWhyus.unsubscribe())

  }

}
