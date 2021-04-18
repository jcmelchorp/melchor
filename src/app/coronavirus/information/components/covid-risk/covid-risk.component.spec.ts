import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidRiskComponent } from './covid-risk.component';

describe('CovidRiskComponent', () => {
  let component: CovidRiskComponent;
  let fixture: ComponentFixture<CovidRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
