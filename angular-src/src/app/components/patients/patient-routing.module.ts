import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewDoctorsComponent } from './view-doctors/view-doctors.component';
import { UploadReportsComponent } from './upload-reports/upload-reports.component';
import { MyUploadsComponent } from './my-uploads/my-uploads.component';
import { HospitalUploadsComponent } from './hospital-uploads/hospital-uploads.component';


const routes: Routes = [
  {path: 'view-doctors', component:ViewDoctorsComponent},
  {path: 'upload-report', component:UploadReportsComponent},
  {path: 'my-uploads', component:MyUploadsComponent},
  {path: 'hospital-uploads', component:HospitalUploadsComponent}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PatientRoutingModule { }
