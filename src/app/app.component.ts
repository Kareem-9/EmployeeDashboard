import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin-panel-layout';
  // sideBarOpen = true;
  login:boolean = false;
  constructor(private activatedRoute:ActivatedRoute,private route:Router){

  }


  ngOnInit(){
    // alert(this.activatedRoute.component)
    // console.log(this.activatedRoute.routeConfig)
    // if(this.activatedRoute.component==="LoginComponent"){
    //   this.login=false
    // }
    // else{
    //   this.login=true
    // }
    if(localStorage.getItem('login')){
      this.login=true
    }
    else{
      this.login=false
    }
  }

  // sideBarToggler() {
  //   this.sideBarOpen = !this.sideBarOpen;
  // }
}
