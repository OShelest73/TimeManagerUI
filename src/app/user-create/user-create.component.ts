import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AxiosService } from '../axios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  constructor(private axiosService: AxiosService,
    private router: Router){}

    jobTitles: String[] = [''];

    form = new FormGroup({
      fullName: new FormControl<string>('', Validators.required),
      email: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
      jobTitle: new FormControl<string>('', Validators.required),
    });

    ngOnInit(){
      this.axiosService.request(
        "GET",
        "/jobTitle/all",
        {}
      ).then((response) => {
        this.jobTitles = response.data;
      }).catch(
        (error) => {
          if (error.response.status === 401 ) {
            this.axiosService.setAuthToken(null);
            this.router.navigate(['']);
          } else {
            this.jobTitles = error.response.code;
          }
        }
      );
    }
  
    get fullName(){
      return this.form.controls.fullName as FormControl;
    }
    get email(){
      return this.form.controls.email as FormControl;
    }
    get password(){
      return this.form.controls.password as FormControl;
    }
    get jobTitle(){
      return this.form.controls.jobTitle as FormControl;
    }

    submitUser() {
      if(this.form.valid)
      {
        console.log(12212);
        this.axiosService.request(
          "POST",
          "/user/add",
          {
            fullName: this.form.controls.fullName.value,
            email: this.form.controls.email.value,
            jobTitle: this.form.controls.jobTitle.value,
            password: this.form.controls.password.value
          }
        ).then(response => {
          this.router.navigate(['users']);
        }).catch(
          error => {
            console.log(error);
              this.axiosService.setAuthToken(null);
              this.router.navigate(['']);
          }
        );
      }
      
    }
}
