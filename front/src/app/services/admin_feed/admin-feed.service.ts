import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminFeedService {

  constructor(private http:HttpClient) { }

  submit_feedback(feedback:any):Observable<any>{
    feedback.forEach((value,key) => {
      console.log(key+" "+value)
    });
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json')
    return this.http.post(`${environment.basePath}feed/feedback`, feedback);
  }

  get_feedbacks():Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json')
    return this.http.get(`${environment.basePath}feed/feedbacks`,{headers:headers});
  }
}
