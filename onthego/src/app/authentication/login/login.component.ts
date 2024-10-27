import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{


  loginForm:FormGroup=new FormGroup({})
  isSubmitting:boolean=false;

  constructor(private formBuilder:FormBuilder,
    private authService:AuthenticationService){}


  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  onSubmit():any{
    let data=this.loginForm.value;
    console.log(data)
    if(this.loginForm.valid){
      this.authService.login(data).subscribe({
        next:()=>{
          console.log("Success")
        },
        error:(error)=>{
          console.log(error)
        }
      })
    }
  }



}
