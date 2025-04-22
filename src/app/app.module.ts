import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthInterface, DataInterface, ValidationInterface } from './features/foods/models/data.interface';
import { environment } from 'src/environments/environment.development';
import { StaticDataService } from './features/foods/services/static-data.service';
import { FoodService } from './features/foods/services/food.service';
import { ValidationsService } from './features/auth/services/validations.service';
import { StaticValidationService } from './features/auth/static-data-services/static-validation.service';
import { StaticAuthService } from './features/auth/static-data-services/static-auth.service';
import { AuthService } from './features/auth/services/auth.service';


export const DATA_SERVICE_TOKEN = new InjectionToken<DataInterface>('DATA_SERVICE_TOKEN')
export const VALIDATION_SERVICE_TOKEN = new InjectionToken<ValidationInterface>('VALIDATION_SERVICE_TOKEN');
export const AUTH_SERVICE_TOKEN = new InjectionToken<AuthInterface>('AUTH_SERVICE_TOKEN');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    {
      provide: DATA_SERVICE_TOKEN,
      useClass: environment.useFakeData ? StaticDataService : FoodService
    },
    {
      provide: VALIDATION_SERVICE_TOKEN,
      useClass: environment.useFakeData ? StaticValidationService : ValidationsService
    },
    {
      provide: AUTH_SERVICE_TOKEN,
      useClass: environment.useFakeData ? StaticAuthService : AuthService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
