import { ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { Service } from 'src/app/Model/Service';
import { FoodService } from 'src/app/Service/food.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  servicesItems :Service[] = []

  constructor(private foodService: FoodService,private cdr:ChangeDetectorRef,
    private destroyRef: DestroyRef

  ) { }

  ngOnInit() {
     const fetchServices = this.foodService.fetchData<Service>('service').subscribe( ser => {
      this.servicesItems = ser
      this.cdr.detectChanges()
     })
     this.destroyRef.onDestroy(()=>fetchServices.unsubscribe())

  }

}
