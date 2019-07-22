import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SouscategorieComponent } from './souscategorie.component';

describe('SouscategorieComponent', () => {
  let component: SouscategorieComponent;
  let fixture: ComponentFixture<SouscategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SouscategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SouscategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
