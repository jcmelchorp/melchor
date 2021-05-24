import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchTheCatComponent } from './catch-the-cat.component';

describe('CatchTheCatComponent', () => {
  let component: CatchTheCatComponent;
  let fixture: ComponentFixture<CatchTheCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatchTheCatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatchTheCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
