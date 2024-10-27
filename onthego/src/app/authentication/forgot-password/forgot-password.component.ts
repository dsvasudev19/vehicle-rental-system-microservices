import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {


  forgotPasswordForm:FormGroup=new FormGroup({})

  isSubmitting:boolean = false;

  constructor(private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.forgotPasswordForm=this.formBuilder.group({
      email:['',Validators.required],
      terms:['',Validators.required]
    })
  }

}
