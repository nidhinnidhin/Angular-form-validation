import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userForm! : FormGroup;
  constructor(private fb : FormBuilder){
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')]],
      mobile: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.pattern(/^\d{10}$/)]],
      date: ['', [Validators.required, this.ageValidator]],
      gender: ['', [Validators.required]],
      address: ['']
    });
  }
  userFormSubmitted : boolean = false;
  selectedValue: string = "male";
  userList : Array<any> = [];
  userFormType : any = 'Create';
  userIndex :any;


  ageValidator(control:any){
    const birthDate = new Date(control.value);
    const ageInMilliseconds = Date.now() - birthDate.getTime();
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

    if (ageInYears >= 18) {
      return null; 
    } else {
      return { invalidAge: true }; 
    }
  }

  Submit() {
    this.userFormSubmitted = true;
    if (this.userForm.valid) {
      if(this.userFormType == 'Create'){
        this.userList.push(this.userForm.getRawValue())
      }
      else{
        this.userList[this.userIndex] = this.userForm.getRawValue();
      }
      console.log(this.userList)
      this.userForm.reset();
      this.userFormSubmitted = false;
      this.userFormType = 'Create'
    }
  }

  editUser(user:any, index:any){
    this.userForm.patchValue(user)
    this.userIndex = index;
    this.userFormType = 'Update'
  }

  deleteUser(index:any){
    this.userList.splice(index, 1)
  }

}
