import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private token=localStorage.getItem("__auth")

  public headers=new HttpHeaders({
    'Authorization':`Bearer ${this.token}`
  })
}
