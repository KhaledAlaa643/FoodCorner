import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { register } from 'swiper/element/bundle';
register();

const components = [HomeComponent,OfferComponent,ServicesComponent,SliderComponent,SpecialComponent,WhyUsComponent,AboutComponent]
@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutes
],
schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
