import { Vehicle } from './../models/vehicle';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl=environment.baseUrl+"/vehicle"

  private token=localStorage.getItem("__auth")

  public headers=new HttpHeaders({
    'Authorization':`Bearer ${this.token}`
  })

  constructor(private http:HttpClient) { }

  getVehiclesByPincode(pincode:string):Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(`${this.apiUrl}`,{headers:this.headers})
  }
}
