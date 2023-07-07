import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalUploadsComponent } from './hospital-uploads.component';

describe('HospitalUploadsComponent', () => {
  let component: HospitalUploadsComponent;
  let fixture: ComponentFixture<HospitalUploadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalUploadsComponent]
    });
    fixture = TestBed.createComponent(HospitalUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
