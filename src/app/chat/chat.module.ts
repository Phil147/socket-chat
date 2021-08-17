import { ChatBotRoutingModule } from './chat-routing.module';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GoogleMapsModule } from '@angular/google-maps';

import { ChatComponent } from '../chat/chat.component';
import { CompleteComponent } from '../widgets/complete/complete.component';
import { DateComponent } from '../widgets/date/date.component';
import { MapComponent } from '../widgets/map/map.component';
import { RateComponent } from '../widgets/rate/rate.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ChatBotRoutingModule,
    MatButtonModule,
    MatIconModule,
    GoogleMapsModule,
  ],
  exports: [],
  declarations: [
    DateComponent,
    MapComponent,
    RateComponent,
    CompleteComponent,
    ChatComponent
  ],
  providers: [],
})
export class ChatModule { }
