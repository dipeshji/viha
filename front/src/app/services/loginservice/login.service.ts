import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  adduserdata:any;
  private profileObs: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  currentModuleTitle = this.profileObs.asObservable();

  private click: BehaviorSubject<any> = new BehaviorSubject<any>([])
  clicked = this.click.asObservable();
  public mydata;
  constructor(private http: HttpClient) { }

  login_user(user_id:any, password:any):Observable<any>{
    let headers = new HttpHeaders();
    let params = new HttpParams().set('id',user_id).set('pass', password)
    headers.append('Content-Type','application/json')
    return this.http.get(`${environment.basePath}login/loginuser`,{headers:headers, params:params})
  }

  authenticate(token:any):Observable<any>{
    let headers = new HttpHeaders();
    let params = new HttpParams().set('token',token);
    headers.append('Content-Type','application/json')
    return this.http.get(`${environment.basePath}login/authenticate`,{headers:headers, params:params})
  }

  searched_user(user:any):Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post(`${environment.basePath}login/searcheduser`,user,{headers:headers});
  }

  add_as_friend(user,token):Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    let params = new HttpParams().set('token',token).set('user', user)
    return this.http.get(`${environment.basePath}login/addasfriend`,{headers:headers, params:params})
  }

  set_adduserdata(userdata){
    this.adduserdata = userdata;
  }

  get_adduserdata():Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    let params = new HttpParams().set('user', this.adduserdata)
    return this.http.get(`${environment.basePath}login/getadduser`, {headers:headers, params:params})
  }

  confirm(senttouser, sentbyuser):Observable<any>{
    let params = new HttpParams().set('senttouser', senttouser).set('sentbyuser', sentbyuser);
    return this.http.get(`${environment.basePath}login/confirm`, {params:params})
  }

  sendData(rec){
    this.profileObs.next({value:rec});
  }

  clickevent(rec){
    this.click.next(rec);
  }
}
