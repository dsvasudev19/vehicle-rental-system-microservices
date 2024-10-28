import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = environment.baseUrl + '/bookings';

  constructor(private http: HttpClient) {}

  createNewBooking(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getAllBookingOfUser(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/users/' + id);
  }

  getCouponDetails(coupon:string):Observable<any>{
    return this.http.get(environment.baseUrl+"/coupon/code/"+coupon);
  }

  getVehicleById(id:any):Observable<any>{
    return this.http.get(environment.baseUrl+"/vehicle/"+id);
  }

}
