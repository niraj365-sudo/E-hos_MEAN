import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyUploadsComponent } from './my-uploads.component';

describe('MyUploadsComponent', () => {
  let component: MyUploadsComponent;
  let fixture: ComponentFixture<MyUploadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyUploadsComponent]
    });
    fixture = TestBed.createComponent(MyUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
