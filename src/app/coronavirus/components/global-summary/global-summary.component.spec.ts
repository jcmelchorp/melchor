import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSummaryComponent } from './global-summary.component';

describe('GlobalSummaryComponent', () => {
  let component: GlobalSummaryComponent;
  let fixture: ComponentFixture<GlobalSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
