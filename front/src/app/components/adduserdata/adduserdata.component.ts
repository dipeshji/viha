import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/loginservice/login.service'
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router'

@Component({
  selector: 'app-adduserdata',
  templateUrl: './adduserdata.component.html',
  styleUrls: ['./adduserdata.component.css']
})
export class AdduserdataComponent implements OnInit {
  adduserdata: any;
  profileimg: any;
  noui: boolean;
  adduserbutton:boolean;
  constructor(private _adduser: LoginService, private _route: Router) { }

  ngOnInit() {
    this.noui = false;
    this.adduserbutton = true;
    this._adduser.get_adduserdata().subscribe(data => {
      if (data.user !== null) {
        this.noui = true;
        this.adduserdata = data.user;
        if(data.user.Status === "Friends"){
          this.adduserbutton = false;
        }
        this.profileimg = environment.basePath + 'uploads/' + data.user.Profile_img;
      } else {
        alert("No user");
        this._route.navigate(['login'])
      }
    })
  }

  adduser() {
    let reqsendto = this.adduserdata.Email;
    let reqsentby = localStorage.getItem('usertoken')
    this._adduser.add_as_friend(reqsendto, reqsentby)
      .subscribe(data => {
        if (data.status) {
          alert(data.msg);
        } else {
          alert(data.msg);
        }
      })
  }

}
