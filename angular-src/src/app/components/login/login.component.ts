import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService){ }
    
  login(): void {
    const user = {
      username: this.username,
      password: this.password,
    };
  
    this.authService.login(user).subscribe(
      (response: any) => {
        if (response.success) {
          // Successful login
          const token = response.token;
          // Store the token in local storage or a cookie
          localStorage.setItem('token', token);
          // Redirect to the dashboard or any other authorized page
          this.router.navigate(['/dashboard']);
          // Display the success message from the backend using Toastr
          this.toastr.success(response.msg, 'Success');
        } else {
          // Login failed, display the error message from the backend using Toastr
          this.toastr.error(response.msg, 'Error');
        }
      },
      (error: any) => {
        // Failed login
        console.error('Login failed:', error);
        // Display an error message using Toastr
        this.toastr.error('Login failed. Please check your credentials.', 'Error');
      }
    );
  }
  
}
