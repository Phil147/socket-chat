import { WidgetService } from './../widgets/widget.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatComponent],
      imports: [
        MatIconModule,
        MatButtonModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render map component', () => {
    component.addWidget({
      type: 'map', data: {
        'lat': 48.1482933,
        'lng': 11.586628
      }
    })
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-map')).toBeTruthy();
  });

  it('should render date component', () => {
    component.addWidget({
      type: 'date', data: '2021-07-28T15:22:25.030Z'
    })
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-date')).toBeTruthy();
  });

  it('should render rate component', () => {
    component.addWidget({
      type: 'rate', data: [1, 5]
    })
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-rate')).toBeTruthy();
  });

  it('should render complete component', () => {
    component.addWidget({
      type: 'complete', data: ['Yes', 'No']
    })
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-complete')).toBeTruthy();
  });

  it('should hide when widget completes and print message', (done) => {
    inject([WidgetService], (widgetService: WidgetService) => {
      widgetService.widgetCompleted$.subscribe(message => {
        expect(message).toBe('Wednesday');
        done();
      });
      component.addWidget({
        type: 'date', data: '2021-07-28T15:22:25.030Z'
      })
      fixture.detectChanges();
      const widgetElement = fixture.nativeElement.querySelector('app-date');
      const buttons = widgetElement.querySelectorAll('button');
      buttons.item(0).click();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('app-date')).toBeFalsy();
    })();
  });
  
});
