import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutCommentaireComponent } from './ajout-commentaire.component';

describe('AjoutCommentaireComponent', () => {
  let component: AjoutCommentaireComponent;
  let fixture: ComponentFixture<AjoutCommentaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutCommentaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutCommentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
