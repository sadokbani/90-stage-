import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivePtvComponent } from './archive-ptv.component';

describe('ArchivePtvComponent', () => {
  let component: ArchivePtvComponent;
  let fixture: ComponentFixture<ArchivePtvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivePtvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivePtvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
