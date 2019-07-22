import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSouscategorieComponent } from './update-souscategorie.component';

describe('UpdateSouscategorieComponent', () => {
  let component: UpdateSouscategorieComponent;
  let fixture: ComponentFixture<UpdateSouscategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSouscategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSouscategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
