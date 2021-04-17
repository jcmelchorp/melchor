import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinMultChartComponent } from './coin-mult-chart.component';

describe('CoinMultChartComponent', () => {
  let component: CoinMultChartComponent;
  let fixture: ComponentFixture<CoinMultChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinMultChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinMultChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
