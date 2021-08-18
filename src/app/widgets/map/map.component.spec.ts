import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { By } from '@angular/platform-browser';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      imports: [
        GoogleMapsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show map', () => {
    component.setData({
      type: 'map', data: {
        'lat': 48.1482933,
        'lng': 11.586628
      }
    });
    fixture.detectChanges();
    const map = fixture.debugElement.query(By.directive(GoogleMap));
    const googleMap = (map.componentInstance as GoogleMap).googleMap;
    expect(googleMap?.getCenter().toJSON()).toEqual({
      'lat': 48.1482933,
      'lng': 11.586628
    });
  });
});
