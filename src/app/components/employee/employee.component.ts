import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from "../../services/employee.service";
import { NgForm } from "@angular/forms";
import { Employee } from "../../models/employee";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"],
  providers: [EmployeeService],
})
export class EmployeeComponent  implements  OnInit{
  constructor(private employeeService: EmployeeService, private activatedRoute: ActivatedRoute,private router: Router) {}

  
  employee: FormGroup;
  submitted = false;

  ngOnInit(): void {
   const params = this.activatedRoute.snapshot.params;
   console.log(params._id)
   if(params._id){
    this.employeeService.getEmployee(params._id).subscribe(res => {
      this.employeeService.selectedEmployee = res
    })
   }




    this.employee = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      firtsLastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      country: new FormControl('', [Validators.required,]),
      document: new FormControl('', [Validators.required]),
      documentType: new FormControl('', [Validators.required]),
      admissionDate: new FormControl('', [Validators.required]),
      area: new FormControl('', [Validators.required]),
    });

  }



  addEmployee(form?: NgForm) {
    this.submitted = true;
 
    // if (this.employee.invalid) {
    //     return;
    // }

    if (form.value._id) {
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.getEmployees();
      });
    } else {
       this.employeeService.postEmployee(form.value).subscribe((res) => {
        this.getEmployees();
        this.resetForm(form);
      });

  
    }
    this.router.navigateByUrl('/');
  }

  eliminarCaracteres(event: any) {
    if ((event.keyCode != 32) && (event.keyCode < 65) || (event.keyCode > 90) && (event.keyCode < 97) || (event.keyCode > 122))
     return event.returnValue = false;
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
}
