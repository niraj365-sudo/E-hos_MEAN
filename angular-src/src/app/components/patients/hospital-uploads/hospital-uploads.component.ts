import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from 'src/app/_services/patient.service';

@Component({
  selector: 'app-hospital-uploads',
  templateUrl: './hospital-uploads.component.html',
  styleUrls: ['./hospital-uploads.component.css']
})
export class HospitalUploadsComponent {

  reports: any[] = []
  user: any

  constructor( private patientService : PatientService, private toastr: ToastrService) {
   
  }

  loadAdminReports(){
    this.patientService.myReport()
      .subscribe(
        (response:any)=>{
          console.log(response.images);
          this.reports = response.images
          this.user = response.user
          this.toastr.success(response.message)
        },
        (error)=>{
          this.toastr.error(error.message)
        }
      )
  }
}
