import { Component, OnInit } from '@angular/core';
import { AdminFeedService } from 'src/app/services/admin_feed/admin-feed.service'
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/loginservice/login.service'

@Component({
  selector: 'app-admin-feed',
  templateUrl: './admin-feed.component.html',
  styleUrls: ['./admin-feed.component.css']
})
export class AdminFeedComponent implements OnInit {
  data: any;
  feeds = [];
  constructor(private adminfeed: AdminFeedService, private _router: Router, private _login: LoginService) { }

  ngOnInit() {
    if (localStorage.getItem('loggedin') !== null && localStorage.getItem('loggedin')) {
      console.log(localStorage.getItem('loggedin'));
      this._login.authenticate(localStorage.getItem('usertoken'))
        .subscribe(data => {
          if (!data.status) {
            this._router.navigate(['login'])
            alert("Please login")
          } else {
            this.adminfeed.get_feedbacks()
              .subscribe(data => {
                this.data = data.feedbacks;
                this.data.forEach((element) => {
                  this.feeds.push(element)
                });
                this.feeds.reverse();
              })
          }
        })
    } else {
      this._router.navigate(['login'])
      setTimeout(()=>{
        alert("Please login")
      },100)
    }
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['login'])
  }

}
