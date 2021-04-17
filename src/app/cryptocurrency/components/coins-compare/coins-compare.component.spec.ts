import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsCompareComponent } from './coins-compare.component';

describe('CoinsCompareComponent', () => {
  let component: CoinsCompareComponent;
  let fixture: ComponentFixture<CoinsCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinsCompareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinsCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
