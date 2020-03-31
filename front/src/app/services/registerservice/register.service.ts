import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  register_user(user:any):Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json')
    return this.http.post(`${environment.basePath}register/registeruser`, user);
  }
}


