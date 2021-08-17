import { RateComponent } from './rate/rate.component';
import { MapComponent } from './map/map.component';
import { DateComponent } from './date/date.component';
import { CompleteComponent } from './complete/complete.component';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

const widgets =
{
  complete: CompleteComponent,
  date: DateComponent,
  map: MapComponent,
  rate: RateComponent
}

export type WidgetKey = keyof typeof widgets;
export type WidgetComponent = typeof widgets[WidgetKey];

@Injectable({providedIn: 'root'})
export class WidgetService {
  readonly widgetCompleted$ = new Subject<string>();
  alreadyShown = [];
  currentWidget: any;
  
  
  completeWidget(data: string) {
    this.widgetCompleted$.next(data);
  }

  getWidget(name: WidgetKey) {
    return widgets[name];
  }
}