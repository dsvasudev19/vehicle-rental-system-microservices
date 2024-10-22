import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



@NgModule({
  declarations: [
    LoginComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
