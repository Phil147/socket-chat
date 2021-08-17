import { WidgetService } from './../widget.service';
import { Widget } from './../widget';
import { Component, OnInit } from '@angular/core';
import { ServerDateCommand } from 'src/app/server-model';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements Widget {
  days: string[] = [];

  constructor(private widgetService: WidgetService) {}

  complete(day: string) {
    this.widgetService.completeWidget(day, 'date');
  }

  setData(command: ServerDateCommand) {
    const startDate = new Date(command.data);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const curr = new Date(startDate);
      curr.setDate(startDate.getDate() + i);
      if (curr.getDay() !== 0 && curr.getDay() !== 6) {
        days.push(curr.toLocaleDateString('en', { weekday: 'long' }));
      }
    }
    this.days = days;
  }
}
