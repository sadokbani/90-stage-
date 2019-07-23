import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveCategorieComponent } from './archive-categorie.component';

describe('ArchiveCategorieComponent', () => {
  let component: ArchiveCategorieComponent;
  let fixture: ComponentFixture<ArchiveCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
