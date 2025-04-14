import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { OfferComponent } from './articles/offer/offer.component';
import { ServicesComponent } from './articles/our-services/services.component';
import { SliderComponent } from './articles/slider/slider.component';
import { SpecialComponent } from './articles/special/special.component';
import { WhyUsComponent } from './articles/whyUs/whyUs.component';
import { AboutModule } from "../about/about.module";
import { SharedModule } from 'src/app/shared/shared.module';


const components = [HomeComponent,OfferComponent,ServicesComponent,SliderComponent,SpecialComponent,WhyUsComponent]
@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    AboutModule,
    SharedModule
]
})
export class HomeModule { }
