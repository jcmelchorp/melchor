import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnFireComponent } from './on-fire.component';

describe('OnFireComponent', () => {
  let component: OnFireComponent;
  let fixture: ComponentFixture<OnFireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnFireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnFireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
