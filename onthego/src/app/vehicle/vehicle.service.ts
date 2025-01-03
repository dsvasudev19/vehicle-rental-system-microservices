import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http:HttpClient) { }

  private token=localStorage.getItem("__auth")

  public headers=new HttpHeaders({
    'Authorization':`Bearer ${this.token}`
  })

  private apiUrl=environment.baseUrl+"/vehicle";



  getAllVehicles():Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(this.apiUrl,{headers:this.headers});
  }

  getVehicleById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${id}`,{headers:this.headers});
  }

  deleteVehicleById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{headers:this.headers});
  }

  getAllVehiclesByLocation(location: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}/location/${location}`,{headers:this.headers});
  }

  getAllVehiclesByPincode(pincode: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}/pincode/${pincode}`,{headers:this.headers});
  }

  getAllVehiclesByVendorId(vendorId: number): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}/vendor/${vendorId}`,{headers:this.headers});
  }

  getVehiclesBasedOnSearchString(searchString:string):Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(`${this.apiUrl}/search/vehicle/${searchString}`,{headers:this.headers})
  }

  postReviewToVehicle(rating:number,content:string,vehicleId:any,userId:number,username:string):Observable<any>{
    return this.http.post(environment.baseUrl+"/review",{rating,content,vehicleId,userId,username:""},{headers:this.headers})
  }



}
