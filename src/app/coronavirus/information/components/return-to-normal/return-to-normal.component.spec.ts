import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnToNormalComponent } from './return-to-normal.component';

describe('ReturnToNormalComponent', () => {
  let component: ReturnToNormalComponent;
  let fixture: ComponentFixture<ReturnToNormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnToNormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnToNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
