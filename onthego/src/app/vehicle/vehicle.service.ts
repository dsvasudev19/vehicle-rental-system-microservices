import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http:HttpClient) { }

  private apiUrl=environment.baseUrl+"/vehicle";

  getAllVehicles():Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(this.apiUrl);
  }

  getVehicleById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${id}`);
  }

  deleteVehicleById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAllVehiclesByLocation(location: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}/location/${location}`);
  }

  getAllVehiclesByPincode(pincode: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}/pincode/${pincode}`);
  }

  getAllVehiclesByVendorId(vendorId: number): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}/vendor/${vendorId}`);
  }

  getVehiclesBasedOnSearchString(searchString:string):Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(`${this.apiUrl}/search/vehicle/${searchString}`)
  }

  postReviewToVehicle(rating:number,content:string,vehicleId:any,userId:number,username:string):Observable<any>{
    return this.http.post(environment.baseUrl+"/review",{rating,content,vehicleId,userId,username:""})
  }



}
