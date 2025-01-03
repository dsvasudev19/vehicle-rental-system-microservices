import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl: string = environment.baseUrl;
  
  private isAuthenticated:boolean=false;

  private token=localStorage.getItem("__auth")

  public headers=new HttpHeaders({
    'Authorization':`Bearer ${this.token}`
  })

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.apiUrl + '/auth/login', data,{headers:this.headers});
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/auth//user/register', data,{headers:this.headers});
  } 

  checkAuthentication():Observable<any>{
    let storedToken=localStorage.getItem("__auth")
    return this.http.get<any>(this.apiUrl+"/auth/validate/token?token="+storedToken,{headers:this.headers})
  }
}