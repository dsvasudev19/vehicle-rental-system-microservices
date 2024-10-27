import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.apiUrl + '/auth/login', data);
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/auth//user/register', data);
  } 
}
