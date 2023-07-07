import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDoctorsComponent } from './view-doctors/view-doctors.component';
import { UploadReportsComponent } from './upload-reports/upload-reports.component';
import { FormsModule } from '@angular/forms';
import { MyUploadsComponent } from './my-uploads/my-uploads.component';
import { HospitalUploadsComponent } from './hospital-uploads/hospital-uploads.component';



@NgModule({
  declarations: [
    ViewDoctorsComponent,
    UploadReportsComponent,
    MyUploadsComponent,
    HospitalUploadsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PatientModule { }
