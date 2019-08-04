import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveClientsComponent } from './archive-clients.component';

describe('ArchiveClientsComponent', () => {
  let component: ArchiveClientsComponent;
  let fixture: ComponentFixture<ArchiveClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
