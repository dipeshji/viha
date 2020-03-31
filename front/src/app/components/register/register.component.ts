import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms'
import { RegisterService } from 'src/app/services/registerservice/register.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  pimg = null;
  myform: FormGroup
  constructor(private _myregister: RegisterService, private router: Router) {
    this.myform = new FormGroup({
      email: new FormControl(null, Validators.email),
      name: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      mobile_number: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      cnfpass: new FormControl(null, this.passValidator),
    })
    this.myform.controls.password.valueChanges
      .subscribe(x => this.myform.controls.cnfpass.updateValueAndValidity())
  }

  ngOnInit() {
  }

  isvalid(controlName) {
    return this.myform.get(controlName).invalid && this.myform.get(controlName).touched;
  }

  passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const cnfpassvalue = control.value

      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== cnfpassvalue || passValue === '') {
          return {
            isError: true
          }
        }
      }
    }
    return null;
  }

  register() {
    if (this.myform.valid) {
      const fd = new FormData();
      fd.append('profileimg',this.pimg);
      fd.append('name', this.myform.value.name);
      fd.append('email', this.myform.value.email);
      fd.append('dob', this.myform.value.dob);
      fd.append('mobile_number', this.myform.value.mobile_number);
      fd.append('password', this.myform.value.password);
      fd.append('status', "Not Friends");
      this._myregister.register_user(fd)
        .subscribe(data => {
          alert(data.msg)
          if (data.status) {
            this.myform.reset();
          }
        })
    } else {
      alert("Inavlid Form Submission!!");
    }
  }

  profileimg(event) {
    this.pimg = event.target.files[0];
  }
}
