import { Vehicle } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  vehicles:Vehicle[]=[];

  constructor(private homeService:HomeService,private router:Router){}

  ngOnInit(): void {
    this.getAllVehiclesByPincode("990990")
  }

  getAllVehiclesByPincode(pincode:string){
    this.homeService.getVehiclesByPincode(pincode).subscribe({
      next:(data)=>{
        this.vehicles=data;
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

 

  



}
