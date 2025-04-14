import { ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { Slider } from 'src/app/pages/home/articles/models/Slider';
import { FoodService } from 'src/app/features/foods/services/food.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  sliderItems: Slider[] = [];

  constructor(private foodService: FoodService,
    private cdr:ChangeDetectorRef,
    private destroyRef: DestroyRef

  ) { }

  ngOnInit() {
    const fetchSlider = this.foodService.fetchData<Slider>('slider').subscribe(slider => {
      this.sliderItems = slider;
      this.cdr.detectChanges()
    })
    this.destroyRef.onDestroy(()=>fetchSlider.unsubscribe())

  }

}
