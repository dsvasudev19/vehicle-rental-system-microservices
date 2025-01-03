import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = environment.baseUrl + '/bookings';

  private token=localStorage.getItem("__auth")

  public headers=new HttpHeaders({
    'Authorization':`Bearer ${this.token}`
  })
  

  constructor(private http: HttpClient) {}

  createNewBooking(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data,{headers:this.headers});
  }

  getAllBookingOfUser(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/users/' + id,{headers:this.headers});
  }

  getCouponDetails(coupon:string):Observable<any>{
    return this.http.get(environment.baseUrl+"/coupon/code/"+coupon,{headers:this.headers});
  }

  getVehicleById(id:any):Observable<any>{
    return this.http.get(environment.baseUrl+"/vehicle/"+id,{headers:this.headers});
  }

}
