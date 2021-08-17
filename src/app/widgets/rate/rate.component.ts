import { WidgetService } from '../widget.service';
import { Component } from '@angular/core';
import { Widget } from '../widget';
import { ServerRateCommand } from 'src/app/server-model';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements Widget {
  from: number;
  to: number;
  labels: number[] = [];

  constructor(private widgetService: WidgetService) {
  }

  setData(command: ServerRateCommand) {
    this.from = command.data[0];
    this.to = command.data[1];
    this.labels = Array.from(Array(this.to - this.from + 1).keys()).map(i => i + this.from);
  }

  complete(rating: number) {
    this.widgetService.completeWidget(rating.toString());
  }

}
