import { Component, OnInit, ElementRef } from '@angular/core';
import { LoginService } from 'src/app/services/loginservice/login.service'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ModalComponent } from '../../login/dahboard/modal/modal.component';

@Component({
  selector: 'app-dahboard',
  templateUrl: './dahboard.component.html',
  styleUrls: ['./dahboard.component.css']
})
export class DahboardComponent implements OnInit {

  constructor(private dialog: MatDialog, private _login: LoginService, private _router: Router) {
    _login.currentModuleTitle.subscribe(res => {
      this.badgeContent = 0;
    })
  }

  profileimg: any;
  name: String;
  email: String;
  number: Number;
  dob: Number;
  badgeContent: Number;
  usernotifi: boolean;
  dialogtoopen: String;



  ngOnInit() {
    this.badgeContent = 0;
    this.usernotifi = false;
    this._login.authenticate(localStorage.getItem('usertoken'))
      .subscribe(data => {
        if (!data.status) {
          this._router.navigate(['/login'])
        } else {
          localStorage.setItem('user', data.user.Name);
          localStorage.setItem('usermail', data.user.Email)
          this.name = data.user.Name;
          this.email = data.user.Email;
          this.dob = data.user.DOB;
          this.number = data.user.Mobile_Number;
          if (data.user.Notification[0]) {
            this.badgeContent = 1;
            if (data.user.Notification[1] === "accepted") {
              console.log(data.user.Notification[1]);

              this.dialogtoopen = "accepted";
            } else {
              console.log(data.user.Notification[1]);
              this.dialogtoopen = "request";
            }
          }
        }

        this.profileimg = environment.basePath + 'uploads/' + data.user.Profile_img;
      })
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['/login']);
  }

  feedback() {
    this.dialog.open(ModalComponent, {
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: "Feedback"
    })
  }

  opennotifi() {
    if (this.badgeContent > 0) {
      // const dialogConfig = new MatDialogConfig();

      //   dialogConfig.disableClose = true;
      //   dialogConfig.autoFocus = true;
      this.dialog.open(ModalComponent, {
        backdropClass: 'custom-dialog-backdrop-class',
        panelClass: 'custom-dialog-panel-class',
        data: this.dialogtoopen
      });
    } else {
      alert("No notifications")
    }
  }

  Clicked() {
    this._login.clickevent("clicked")
  }
}