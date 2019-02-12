import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'bwm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formData: any = {};
  errors: any[] = [];

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.formData = {};
  }

  register() {
    this.auth.register(this.formData).subscribe(
      () => {
        // debugger
        // console.log('success');
        this.router.navigate(['/login', {registered: 'success'}]);
      },
      (errorResponse) => {
        debugger
        //console.log(errorResponse);
        this.errors.push(errorResponse.error.error);
        console.log(this.errors[0].detail)
      }
    );
    // console.log(this.formData);
  }

}
