import { Vehicle } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';


@Component({
  selector: 'app-vehicle-listing',
  templateUrl: './vehicle-listing.component.html',
  styleUrl: './vehicle-listing.component.css',
})
export class VehicleListingComponent implements OnInit {
  vehicles: Vehicle[] = [];
  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.getAllVehicles();
  }

  getAllVehicles() {
    this.vehicleService.getAllVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
      },
      error:(error)=>{
        console.log(error)
      }
    });
  }
}
