import { LowerCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginForm ! : FormGroup
  constructor(private formBuilder: FormBuilder, private http : HttpClient, private router : Router,private appcomponent:AppComponent,private toast: NgToastService){
    this.loginForm = this.formBuilder.group({
      email:['', Validators.required,Validators.email],
      password:['',Validators.required],
    })
  }

  //Control the fields purpose
  ngOnInit(){
    localStorage.clear()
    this.appcomponent.ngOnInit()
    // this.loginForm = this.formBuilder.group({
    //   email:[''],
    //   password:[''],
    // })
  }
  login()
  {
    this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        console.log(res);
        
        //Checking the  login user  likes res to already existing user.
        
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      
        

      });
      if(user){
        //alert("Login Success!!");
        this.toast.success({detail: "Success Message",summary:"Login success!!",duration:3000})
        localStorage.setItem('login','sucess')
        this.loginForm.reset();
        this.router.navigate(['dashboard'])
      }else{
        //alert("user not found!!")
        this.toast.error({detail:"Error Message", summary:"User not Found !!",duration:3000})
      }
    }, err=>{
      //alert("Something went wrong!!")
      this.toast.error({detail:"Error Message", summary:"Something Went Wrong !!",duration:3000})
    })
  }
}
