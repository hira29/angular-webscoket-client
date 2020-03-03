import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtChartComponent } from './rtchart.component';

describe('RtChartComponent', () => {
  let component: RtChartComponent;
  let fixture: ComponentFixture<RtChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
