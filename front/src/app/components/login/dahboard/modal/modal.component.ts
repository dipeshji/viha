import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { LoginService } from '../../../../services/loginservice/login.service'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  user: any;
  shownotification: any;
  dialogtoopen: String;
  constructor(private dialogRef: MatDialogRef<ModalComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private _notification: LoginService) {
    this.dialogtoopen = data    
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
}
