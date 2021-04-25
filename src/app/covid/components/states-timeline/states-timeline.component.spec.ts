import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesTimelineComponent } from './states-timeline.component';

describe('StatesTimelineComponent', () => {
  let component: StatesTimelineComponent;
  let fixture: ComponentFixture<StatesTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatesTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatesTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
