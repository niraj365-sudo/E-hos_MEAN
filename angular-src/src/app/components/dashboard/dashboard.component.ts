import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { HeaderService } from 'src/app/_services/header.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  role: string | undefined;
  welcomeMessage: string | undefined;
  user: any;

  constructor(private authService: AuthService, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.authService.getUserRole().subscribe(
      (response: any) => {
        this.role = response.role;
        this.setWelcomeMessage();
      },
      (error: any) => {
        console.error('Failed to get user role:', error);
      }
    );
  }

  updateHeaderItems() {
    const items = ['view reports', 'submit report', 'hospital uploads'];
    this.headerService.updatePatientItems(items);
  }

  

  setWelcomeMessage(): void {
    
    this.authService.getProfile().subscribe(
      (response: any) => {
        this.user = response.user.role;
        console.log(this.user);
        
      },
      (error: any) => {
        console.error('Failed to retrieve profile:', error);
      }


    )
    
  
    }

}
