import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SIRComponent } from './s-i-r.component';

describe('SIRComponent', () => {
  let component: SIRComponent;
  let fixture: ComponentFixture<SIRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SIRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SIRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
