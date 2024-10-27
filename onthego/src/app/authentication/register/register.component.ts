import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,private authService:AuthenticationService) {}

  registrationForm: FormGroup = new FormGroup({});
  isSubmitting: boolean = false;

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      terms: ['', Validators.required],
    });
  }

  onSubmit():any{
    let data=this.registrationForm.value;
    if(this.registrationForm.valid){
      this.authService.register(data).subscribe({
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
