import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDoughnutComponent } from './country-doughnut.component';

describe('CountryDoughnutComponent', () => {
  let component: CountryDoughnutComponent;
  let fixture: ComponentFixture<CountryDoughnutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryDoughnutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryDoughnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
