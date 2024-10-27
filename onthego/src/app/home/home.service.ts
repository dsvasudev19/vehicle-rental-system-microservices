import { Vehicle } from './../models/vehicle';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl=environment.baseUrl+"/vehicle"

  constructor(private http:HttpClient) { }

  getVehiclesByPincode(pincode:string):Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(`${this.apiUrl}`)
  }
}
