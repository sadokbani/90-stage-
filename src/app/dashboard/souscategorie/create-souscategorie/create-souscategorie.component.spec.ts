import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSouscategorieComponent } from './create-souscategorie.component';

describe('CreateSouscategorieComponent', () => {
  let component: CreateSouscategorieComponent;
  let fixture: ComponentFixture<CreateSouscategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSouscategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSouscategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
