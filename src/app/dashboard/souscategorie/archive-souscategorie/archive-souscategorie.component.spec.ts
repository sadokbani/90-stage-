import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveSouscategorieComponent } from './archive-souscategorie.component';

describe('ArchiveSouscategorieComponent', () => {
  let component: ArchiveSouscategorieComponent;
  let fixture: ComponentFixture<ArchiveSouscategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveSouscategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveSouscategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
