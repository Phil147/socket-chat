import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateComponent } from './date.component';

describe('DateComponent', () => {
  let component: DateComponent;
  let fixture: ComponentFixture<DateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct weekdays', () => {
    component.setData({
      type: 'date', data: '2021-07-28T15:22:25.030Z'
    });
    fixture.detectChanges();
    const expected = ['Wednesday', 'Thursday', 'Friday', 'Monday', 'Tuesday'];
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(component.days).toEqual(expected);
    expect(buttons.length).toBe(5);
    for (let i = 0; i < expected.length; i++) {
      expect(buttons.item(i).textContent.trim()).toBe(expected[i]);
    }
  });
  
});
