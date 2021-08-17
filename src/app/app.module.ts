import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DateComponent } from './widgets/date/date.component';
import { MapComponent } from './widgets/map/map.component';
import { RateComponent } from './widgets/rate/rate.component';
import { CompleteComponent } from './widgets/complete/complete.component';

@NgModule({
  declarations: [
    AppComponent,
    DateComponent,
    MapComponent,
    RateComponent,
    CompleteComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
