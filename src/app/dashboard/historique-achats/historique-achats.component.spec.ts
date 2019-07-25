import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueAchatsComponent } from './historique-achats.component';

describe('HistoriqueAchatsComponent', () => {
  let component: HistoriqueAchatsComponent;
  let fixture: ComponentFixture<HistoriqueAchatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriqueAchatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueAchatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
