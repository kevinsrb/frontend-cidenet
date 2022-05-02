import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';

import { EmployeeService } from "../../services/employee.service";
import { DataTableDirective } from 'angular-datatables';
import { Employee } from "../../models/employee";


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: [EmployeeService],
})
export class EmployeeListComponent implements OnDestroy, OnInit {
  constructor(public employeeService: EmployeeService, private http: HttpClient, private router: Router) {
    
  }


  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.employeeService.getEmployees().subscribe((res) => {
      console.log(res)
        this.employeeService.employees = res;
        this.dtTrigger.next();
      });
  }



  deleteEmployee(_id: string, form: NgForm) {
    if (confirm("Are you sure you want to delete it?")) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.getEmployees();
        this.resetForm(form);
      });
    }
  }

  

  getEmployees() {
    this.employeeService.getEmployees().subscribe((res) => {
      this.employeeService.employees = res;
    });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.employeeService.selectedEmployee = new Employee();
    }
  }
 
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

 

}
