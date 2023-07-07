import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from 'src/app/_services/patient.service';

@Component({
  selector: 'app-my-uploads',
  templateUrl: './my-uploads.component.html',
  styleUrls: ['./my-uploads.component.css'],
  providers: [DatePipe]
})
export class MyUploadsComponent {
  reports: any[] = []
  user: any

  constructor(private patientService: PatientService, private toastr:ToastrService){
    this.loadReports()
  }

  loadReports(){
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
