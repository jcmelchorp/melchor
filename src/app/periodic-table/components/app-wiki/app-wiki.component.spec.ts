import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppWikiComponent } from './app-wiki.component';

describe('AppWikiComponent', () => {
  let component: AppWikiComponent;
  let fixture: ComponentFixture<AppWikiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppWikiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppWikiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
