import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalByCountryComponent } from './historical-by-country.component';

describe('HistoricalByCountryComponent', () => {
  let component: HistoricalByCountryComponent;
  let fixture: ComponentFixture<HistoricalByCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalByCountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalByCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
