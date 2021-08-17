import { ServerMapCommand } from './../../server-model';
import { Widget } from './../widget';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements Widget {
  data: ServerMapCommand['data'];

  setData(command: ServerMapCommand) {
    this.data = command.data;
  }
}
