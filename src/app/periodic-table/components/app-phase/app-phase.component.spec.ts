import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPhaseComponent } from './app-phase.component';

describe('AppPhaseComponent', () => {
  let component: AppPhaseComponent;
  let fixture: ComponentFixture<AppPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppPhaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
