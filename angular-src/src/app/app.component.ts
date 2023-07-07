import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-src';
  constructor(private toastr: ToastrService) {
    this.toastr.toastrConfig.positionClass = 'toast-bottom-right';
  }
}
