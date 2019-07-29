import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentaireDesacComponent } from './commentaire-desac.component';

describe('CommentaireDesacComponent', () => {
  let component: CommentaireDesacComponent;
  let fixture: ComponentFixture<CommentaireDesacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentaireDesacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentaireDesacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
