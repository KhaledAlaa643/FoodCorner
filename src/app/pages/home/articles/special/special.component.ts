import { ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { Special } from 'src/app/pages/home/articles/models/Special';
import { FoodService } from 'src/app/features/foods/services/food.service';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.css'],
})
export class SpecialComponent implements OnInit {
  activeTabIndex: number = 0;
  specialMenuItems :Special[] = []

  constructor(
    private foodService: FoodService,
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef
  ) { }
  ngOnInit(): void {    
    const fetchSpecial = this.foodService.fetchData<Special>('special').subscribe(specialItems=>{
      this.specialMenuItems = specialItems
      this.cdr.detectChanges()
    })
    this.destroyRef.onDestroy(()=>fetchSpecial.unsubscribe())

  }
  setActiveTab(index: number): void {
    this.activeTabIndex = index;
  }
}
