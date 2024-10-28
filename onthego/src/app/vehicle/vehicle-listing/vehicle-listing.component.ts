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
  searchString: string = '';
  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.getAllVehicles();
  }

  getAllVehicles() {
    this.vehicleService.getAllVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  searchVehicles() {
    console.log(this.searchString)
    if (this.searchString) {
      this.vehicleService
        .getVehiclesBasedOnSearchString(this.searchString)
        .subscribe({
          next: (data) => {
            this.vehicles=data
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
}
