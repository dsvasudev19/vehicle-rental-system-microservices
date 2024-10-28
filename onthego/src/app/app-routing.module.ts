import { CheckoutComponent } from './booking/checkout/checkout.component';
import { ViewDetailsComponent } from './vehicle/view-details/view-details.component';
import { RegisterComponent } from './authentication/register/register.component';

import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { VehicleDetailsComponent } from './vehicle/vehicle-details/vehicle-details.component';
import { VehicleListingComponent } from './vehicle/vehicle-listing/vehicle-listing.component';
import { HomeComponent } from './home/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '',component: HomeComponent,},
  {path: 'vehicle-listing',component: VehicleListingComponent,canActivate:[AuthGuard]},
  {path:'details/:id',component:VehicleDetailsComponent},
  {path: 'vehicle-details/:id',component: VehicleDetailsComponent,},
  {path: 'user-profile',component: UserProfileComponent,},
  {path: 'auth/login',component: LoginComponent},
  {path:'auth/register',component:RegisterComponent},
  {path:'auth/forgot-password',component:ForgotPasswordComponent},
  {path:'auth/reset-password',component:ResetPasswordComponent},
  {path:'view-details/:id',component:ViewDetailsComponent},
  {path:'checkout',component:CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
