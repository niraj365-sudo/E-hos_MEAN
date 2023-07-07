import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { HeaderService } from 'src/app/_services/header.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  userRole: string = '';
  patientItems: string[] = [];

  constructor(
    private headerService: HeaderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.headerService.patientItems$.subscribe(items => {
      this.patientItems = items;
      console.log(this.patientItems);
    });

    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      this.authService.getProfile().subscribe(
        (response: any) => {
          this.userRole = response.user.role;
          console.log("Role",this.userRole);
        },
        (error: any) => {
          console.error('Failed to retrieve profile:', error);
        }
      )
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
