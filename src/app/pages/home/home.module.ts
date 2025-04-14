import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { OfferComponent } from './articles/offer/offer.component';
import { ServicesComponent } from './articles/our-services/services.component';
import { SliderComponent } from './articles/slider/slider.component';
import { SpecialComponent } from './articles/special/special.component';
import { WhyUsComponent } from './articles/whyUs/whyUs.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutes } from './home.routing';
import { AboutComponent } from './articles/about/about.component';


const components = [HomeComponent,OfferComponent,ServicesComponent,SliderComponent,SpecialComponent,WhyUsComponent,AboutComponent]
@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutes
]
})
export class HomeModule { }
