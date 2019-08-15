import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsVenteComponent } from './points-vente.component';

describe('PointsVenteComponent', () => {
  let component: PointsVenteComponent;
  let fixture: ComponentFixture<PointsVenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsVenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
