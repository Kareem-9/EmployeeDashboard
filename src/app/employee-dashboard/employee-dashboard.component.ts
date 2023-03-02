import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';
import { AppComponent } from '../app.component';
import { MatPaginator } from '@angular/material/paginator';
import { NgToastService } from 'ng-angular-popup';



@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {

 

  formValue !: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  //Add&Update button Disble Purpose
  showAdd!: boolean;
  showUpdate !: boolean;
 
  firstName: any; //search
  @ViewChild(MatPaginator) paginator! : MatPaginator; //Pagination

  constructor(private formbuilder: FormBuilder,
    private api: ApiService,
    private appComponent: AppComponent,
    private toast: NgToastService) { }

  ngOnInit(): void {
  
    this.appComponent.ngOnInit()
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: [''],
      
    })

    this.getEmployee();
    this.employeeModelObj.paginator = this.paginator;
  }
  

  //ADD & Update button Disbled Purpose
  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails() {
    //All value update this obj and this obj will passed to post an the server
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Employee added successfully")
         this.toast.success({detail: "Success Message",summary:"Employee added successfully"})
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getEmployee();
      },
        (): void => {
          alert("Something went wrong")
           this.toast.error({detail:"Error Message", summary:"Something Went Wrong !!"})
        })
  }
  getEmployee() {
    this.api.getEmployee()
      .subscribe(res => {
        this.employeeData = res;
      })
     
  }
  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id)
      .subscribe(res => {
        alert("Employee Deleted")
         this.toast.success({detail: "Success Message", summary:"Employee deleted successfully"})
        //When delete the data page can't refresh get latest record so use getemployee()
        this.getEmployee();
      })
  }
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }
  updateEmployeeDetails() 
  {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.UpdateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe(res => {
        alert("Update Successfully")
         this.toast.success({detail: "Success Message", summary:"Employee updated successfully"})
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getEmployee();
      })
  }

  Search() {
    if (this.firstName == "") {
      this.ngOnInit();
    } else {
      this.employeeData = this.employeeData.filter((res: { firstName: string; }) => {
        return res.firstName.toLocaleLowerCase().match(this.firstName.toLocaleLowerCase());
      })
    }
  }

  key: string = 'id';
  reverse:boolean = false;
  sort(key:string){
    this.key = key;
    this.reverse = !this.reverse;
  }
}
