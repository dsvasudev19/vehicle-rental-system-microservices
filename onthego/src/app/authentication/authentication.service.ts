import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl: string = environment.baseUrl;
  
  private isAuthenticated:boolean=false;

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.apiUrl + '/auth/login', data);
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/auth//user/register', data);
  } 

  checkAuthentication():Observable<any>{
    let storedToken=localStorage.getItem("__auth")
    return this.http.get<any>(this.apiUrl+"/auth/validate/token?token="+storedToken)
  }
}
