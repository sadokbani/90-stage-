import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePtvComponent } from './create-ptv.component';

describe('CreatePtvComponent', () => {
  let component: CreatePtvComponent;
  let fixture: ComponentFixture<CreatePtvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePtvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePtvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
