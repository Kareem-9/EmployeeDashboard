import { Injectable } from '@angular/core';
import { SidenavComponent } from './sidenav/sidenav.component';
@Injectable({
  providedIn: 'root'
})
export class SideBarToggleService {

  constructor(private sideNav:SidenavComponent) { }

  sideBarToggle(){
    this.sideNav.sideBarToggler()
  }
}
