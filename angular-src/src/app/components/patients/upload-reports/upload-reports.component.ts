// upload-reports.component.ts
import { Component } from '@angular/core';
import { PatientService } from 'src/app/_services/patient.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-reports',
  templateUrl: './upload-reports.component.html',
  styleUrls: ['./upload-reports.component.css']
})
export class UploadReportsComponent {
  title: string = '';
  selectedFile: File | undefined;
  previewImage: string | undefined;

  constructor(private patientService: PatientService, private toastr: ToastrService) { }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewSelectedFile();
  }

  previewSelectedFile() {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile as Blob);
  }

  cancel() {
    this.selectedFile = undefined;
    this.previewImage = undefined;
  }

  upload() {
    if (!this.selectedFile || !this.title) {
      this.toastr.error('Please give title and upload your report','Error')
      return;
    }


    this.patientService.uploadReport(this.title, this.selectedFile)
      .subscribe(
        (response) => {
          console.log('Report uploaded successfully:', response);
          this.toastr.success('Report uploaded successfully');

          this.title = ''
          this.selectedFile = undefined;
          this.previewImage = undefined;
        },
        (error) => {
          console.error('Failed to upload report:', error);
          this.toastr.error('Failed to upload report');
        }
      );
  }
}
