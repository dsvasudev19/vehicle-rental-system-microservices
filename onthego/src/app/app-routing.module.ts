import { LoginComponent } from './user/login/login.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { VehicleDetailsComponent } from './vehicle/vehicle-details/vehicle-details.component';
import { VehicleListingComponent } from './vehicle/vehicle-listing/vehicle-listing.component';
import { HomeComponent } from './home/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'vehicle-listing',component:VehicleListingComponent
  },
  {
    path:'vehicle-details',component:VehicleDetailsComponent
  },
  {
    path:'user-profile',component:UserProfileComponent
  },
  {
    path:'login',component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
