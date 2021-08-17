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

  private widgetState = new Map(Object.keys(widgets).map(key => [key, { completed: false }]))
  
  completeWidget(data: string, type: WidgetKey) {
    this.widgetCompleted$.next(data);
    this.widgetState.set(type, { completed: true })
  }

  getWidget(name: WidgetKey) {
    return widgets[name];
  }

  hasCompleted(type: WidgetKey) {
    return this.widgetState.get(type)?.completed || false;
  }
}