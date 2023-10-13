import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userForm! : FormGroup;
  constructor(private fb : FormBuilder, private router: Router){
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')]],
      password: ['', [Validators.required, Validators.pattern(/[A-Z]/), Validators.pattern(/\d/), Validators.pattern(/^.{8,}$/), Validators.pattern(/[!@#$%^&*]/)]],
    })
  }
  userFormSubmitted : boolean = false;

  Submit() {
    this.userFormSubmitted = true;
    if (this.userForm.valid) {
      this.router.navigate(['/register']);
      this.userForm.reset();
      this.userFormSubmitted = false;
      alert("Successfully logined")
    }
  }
}
