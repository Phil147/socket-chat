import { WidgetService } from './../widget.service';
import { Component, OnInit } from '@angular/core';
import { ServerCompleteCommand } from 'src/app/server-model';
import { Widget } from '../widget';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements Widget {
  labels: string[] = [];

  constructor(private widgetService: WidgetService) {}

  complete(selection: string) {
    this.widgetService.completeWidget(selection);
  }

  setData(command: ServerCompleteCommand) {
    this.labels = command.data;
  }
}
