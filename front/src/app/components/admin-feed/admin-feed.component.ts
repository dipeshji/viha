import { Component, OnInit } from '@angular/core';
import { AdminFeedService } from 'src/app/services/admin_feed/admin-feed.service'
 
@Component({
  selector: 'app-admin-feed',
  templateUrl: './admin-feed.component.html',
  styleUrls: ['./admin-feed.component.css']
})
export class AdminFeedComponent implements OnInit {

  constructor(private adminfeed:AdminFeedService) { }

  ngOnInit() {
    this.adminfeed.get_feedbacks()
    .subscribe(data=>{
      console.log(data);
      
    })
  }

}
