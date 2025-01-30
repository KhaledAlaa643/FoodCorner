import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { SliderComponent } from './slider/slider.component';
import { SpecialComponent } from './special/special.component';
import { WhyUsComponent } from './whyUs/whyUs.component';
import { ServicesComponent } from './services/services.component';
import { OfferComponent } from './offer/offer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AboutComponent,
    SliderComponent,
    SpecialComponent,
    WhyUsComponent,
    ServicesComponent,
    OfferComponent
  ],
  exports:[
    AboutComponent,
    SliderComponent,
    SpecialComponent,
    WhyUsComponent,
    ServicesComponent,
    OfferComponent,
    
  ]
})
export class SharedModule { }
