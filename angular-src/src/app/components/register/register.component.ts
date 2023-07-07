import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any = {};

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  registerUser(): void {
    this.authService.register(this.user).subscribe(
      (response: any) => {
        if (response.success) {
          // Registration successful
          // Clear the form
          this.router.navigate(['/login']);
          this.user = {};
          this.toastr.success(response.msg, 'Success'); // Display success message from the backend
        } else {
          // Registration failed
          this.toastr.error(response.msg, 'Error'); // Display error message from the backend
        }
      },
      (error: any) => {
        console.error(error);
        if (error.error && error.error.msg) {
          this.toastr.error(error.error.msg, 'Error'); // Display error message from the backend
        } else {
          this.toastr.error('Failed to register user', 'Error'); // Fallback error message
        }
      }
    );
  }
  
}
