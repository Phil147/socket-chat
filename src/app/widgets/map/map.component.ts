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
  options: google.maps.MapOptions;
  marker: google.maps.LatLngLiteral;

  setData(command: ServerMapCommand) {
    this.data = command.data;
    this.options = {
      center: { lat: command.data.lat, lng: command.data.lng },
      zoom: 15
    }
    this.marker = { lat: command.data.lat, lng: command.data.lng };
  }
}
