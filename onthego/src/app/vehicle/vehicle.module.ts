import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehicleListingComponent } from './vehicle-listing/vehicle-listing.component';
import { RouterModule } from '@angular/router';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    VehicleDetailsComponent,
    VehicleListingComponent,
    ViewDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class VehicleModule { }
