// patient.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:3000/patient';

  constructor(private http: HttpClient, private authService: AuthService) { }

  uploadReport(title: string, file: File) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', file);

    const headers = new HttpHeaders({
      Authorization: this.authService.getToken()
    });

    return this.http.post(`${this.apiUrl}/upload_reports`, formData, { headers });
  }

  myReport(){
    const headers = new HttpHeaders({
      Authorization: this.authService.getToken()
    });
    
    return this.http.get(`${this.apiUrl}/view_reports`, {headers})
  }
}
