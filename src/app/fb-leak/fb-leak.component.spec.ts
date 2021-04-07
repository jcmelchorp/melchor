import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbLeakComponent } from './fb-leak.component';

describe('FbLeakComponent', () => {
  let component: FbLeakComponent;
  let fixture: ComponentFixture<FbLeakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FbLeakComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FbLeakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
