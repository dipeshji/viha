import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/loginservice/login.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'viha';
  navbarOpen = false;
  useropen = false;
  tosearch: String;
  users: any;
  showaddbutton=true;

  constructor(private _searchservice: LoginService , private _route: Router) { 
    _searchservice.clicked.subscribe(click=>{
      this.useropen = false;
    })
  } 

  ngOnInit(){
    this.useropen = false;
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  serchbox(event) {
    this.tosearch += event.key;
  }
  search() {
    this._searchservice.searched_user({ "name": this.tosearch }).subscribe(data => {
      if (data.status) {
        if (data.user.Name === localStorage.getItem('user')) {
          alert("Current User")
        } else {
          this.users = data.user;
          this.useropen = !this.useropen;
          if(data.user.Status === "Friends"){
            this.showaddbutton = false;
          }
        }
      } else {
        alert("User dosent exists")
      }
    })

  }

  add_as_friend() {
    if (localStorage.getItem('usertoken')) {
      let reqsendto = this.users.Email
      let reqsentby = localStorage.getItem('usertoken')
      this._searchservice.add_as_friend(reqsendto, reqsentby)
        .subscribe(data => {
          if (data.status) {
            this.useropen = !this.useropen;
            alert(data.msg);
          } else {
            alert(data.msg);
          }
        })
    } else {
      this.useropen = !this.useropen;
      alert("Please Login!!")
    }
  }

  clickeduser(value){
    this.useropen = !this.useropen;
    this._searchservice.set_adduserdata(value);
    this._route.navigate(['adduserdata']);
  }

}
