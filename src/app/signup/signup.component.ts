import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  public signupForm ! : FormGroup
  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router:Router,private toast:NgToastService){}

  ngOnInit(): void{
    this.signupForm = this.formBuilder.group({
      fullname:['', Validators.required],
      email:['',[Validators.required,Validators.email,Validators.pattern(/^[^\s@]+@[^\s@]+.[^\s@]+$/)]],
      password:['',[Validators.required,Validators.minLength(6),Validators.pattern(/^(?=.*\d)(?=.*[A-Z]).{6,}$/)]], //atleat One letter Cap and NUM
      mobile:['',Validators.required],

    })
  }

  signUp(){
     this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
     .subscribe(res=>{
      //alert("Signup Successfully");
      this.toast.success({detail: "Success Message",summary:"Signup Successfully!!",duration:5})
      this.signupForm.reset();
      this.router.navigate(['login']);
     },err=>{
      //alert("Something went Wrong")
      this.toast.error({detail:"Error Message", summary:"Something Went Wrong !!",duration:5})
     })
  }

}
