import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePtvComponent } from './update-ptv.component';

describe('UpdatePtvComponent', () => {
  let component: UpdatePtvComponent;
  let fixture: ComponentFixture<UpdatePtvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePtvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePtvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
