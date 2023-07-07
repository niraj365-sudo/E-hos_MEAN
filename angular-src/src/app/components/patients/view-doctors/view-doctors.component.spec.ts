import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDoctorsComponent } from './view-doctors.component';

describe('ViewDoctorsComponent', () => {
  let component: ViewDoctorsComponent;
  let fixture: ComponentFixture<ViewDoctorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDoctorsComponent]
    });
    fixture = TestBed.createComponent(ViewDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
