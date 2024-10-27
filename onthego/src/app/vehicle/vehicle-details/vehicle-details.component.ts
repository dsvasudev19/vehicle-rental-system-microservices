import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from '../../models/vehicle';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css'],
})
export class VehicleDetailsComponent implements OnInit {
  vehicleDetails: Vehicle | null = null;
  vehicleId:number | null = null;
  loading: boolean = false;
  sameLocationVehicles: Vehicle[] = [];
  content:string=""
  rating:number=5

  constructor(
    private vehicleService: VehicleService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.vehicleId=parseInt(id);
      this.getVehicleById(this.vehicleId);
    }
  }

  getVehicleById(id: number) {
    this.loading = true;
    this.vehicleService.getVehicleById(id).subscribe({
      next: (data) => {
        this.vehicleDetails = data;
        this.getVehiclesByPincode(data.pincode)
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      },
    });
  }

  getVehiclesByPincode(pincode: string) {
    this.loading = true;
    this.vehicleService.getAllVehiclesByPincode(pincode).subscribe({
      next: (data) => {
        this.sameLocationVehicles = data;
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      },
    });
  }

  changeIdAndGetVehicle(id:number){
    this.vehicleId=id
    this.getVehicleById(this.vehicleId)
  }

  postReview(){

    if(this.content){
      this.vehicleService.postReviewToVehicle(this.rating,this.content,this.vehicleDetails?.vehicleId,1,"").subscribe({
        next:(data)=>{
          console.log("Successfully Posted")
          this.getVehicleById(data.vehicleId)
        },
        error:(error)=>{
          console.log(error)
        }
      })
    }
  }
}
