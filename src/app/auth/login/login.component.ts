import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'bwm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errors: any[] = [];
  notifyMessage: string;
  
  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute, 
              private auth: AuthService) { }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe(
      (params) => {
        if(params['registered'] === 'success') {
          this.notifyMessage = 'You have been successfuly registered, you can login now';
        }
      }
    );

  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ''
    })
  }

  isInvalidForm(fieldName) {
    return this.loginForm.controls[fieldName].invalid && 
          (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }

  isRequired(fieldName) {
    return this.loginForm.controls['email'].errors.pattern;
  }

  login() {
    // console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value).subscribe(
      (token) => {
        this.router.navigate(['/rentals']);
      },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
      }
    );
  }

}
