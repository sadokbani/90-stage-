import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivePaysComponent } from './archive-pays.component';

describe('ArchivePaysComponent', () => {
  let component: ArchivePaysComponent;
  let fixture: ComponentFixture<ArchivePaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivePaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivePaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
