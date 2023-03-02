export class EmployeeModel{
    paginator: any;
    filter(arg0: (res: any) => any): EmployeeModel {
      throw new Error('Method not implemented.');
    }
    id : number = 0;
    firstName : string = '';
    lastName : string = '';
    email : string = '';
    mobile : string = '';
    salary : string = '';
}