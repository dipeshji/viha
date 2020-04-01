import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { LoginService } from '../../../../services/loginservice/login.service'
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { AdminFeedService } from 'src/app/services/admin_feed/admin-feed.service'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  user: any;
  shownotification: any;
  dialogtoopen: String;
  feedbackform: FormGroup;
  formtype = new FormControl(null)

  constructor(private dialogRef: MatDialogRef<ModalComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private _notification: LoginService, private feedback:AdminFeedService) {
    this.dialogtoopen = data  
    this.feedbackform =  new FormGroup({
      formfeed: new FormControl(null),
    })
   }

  ngOnInit() {
    this._notification.authenticate(localStorage.getItem('usertoken')).subscribe(data => {
      this.user = data.user;
      this.shownotification = data.user.Notification[0];
    })
  }

  ignore(): void {
    this.dialogRef.close();
    let senttouser = this.user.Email;
    this._notification.confirm(senttouser, null).subscribe(data=>{
      this._notification.sendData(null)
    })
  }
  confirm(): void {
    let sentbyuser = this.user.Notification[1];
    let senttouser = this.user.Email;
    this.dialogRef.close();
    this._notification.confirm(senttouser, sentbyuser).subscribe(data => {
      this._notification.sendData(data.Notification);
    })

  }
  submitfeedback(){
    console.log("submit");
    
    const add_to_form = new FormData();
    add_to_form.append('formfeed', this.feedbackform.value.formfeed);
    add_to_form.append('name', this.user.Name);
    
    this.feedback.submit_feedback(add_to_form).subscribe(data=>{
      if(data.status){
        alert("Feedback submitted");
        this.dialogRef.close();
      }
    })
  }
}
