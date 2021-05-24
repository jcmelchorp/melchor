import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SepomexToolbarComponent } from './sepomex-toolbar.component';

describe('SepomexToolbarComponent', () => {
  let component: SepomexToolbarComponent;
  let fixture: ComponentFixture<SepomexToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SepomexToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SepomexToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
