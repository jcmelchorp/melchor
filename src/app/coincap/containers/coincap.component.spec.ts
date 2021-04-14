import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoincapComponent } from './coincap.component';

describe('CoincapComponent', () => {
  let component: CoincapComponent;
  let fixture: ComponentFixture<CoincapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoincapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoincapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
