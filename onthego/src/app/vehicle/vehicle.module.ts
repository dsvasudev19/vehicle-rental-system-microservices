import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehicleListingComponent } from './vehicle-listing/vehicle-listing.component';



@NgModule({
  declarations: [
    VehicleDetailsComponent,
    VehicleListingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class VehicleModule { }
