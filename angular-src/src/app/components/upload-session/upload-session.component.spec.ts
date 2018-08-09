import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSessionComponent } from './upload-session.component';

describe('UploadSessionComponent', () => {
  let component: UploadSessionComponent;
  let fixture: ComponentFixture<UploadSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
