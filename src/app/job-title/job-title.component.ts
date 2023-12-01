import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { AxiosService } from '../axios.service';
import { Router } from '@angular/router';

export interface JobTitle{
  title: String;
  permissions: String[];
}

@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.css']
})
export class JobTitleComponent {
constructor(private axiosService: AxiosService,
  private router: Router){}

  showDropdown = false;
  jobTitles: JobTitle[] = [];
  presetPermissions = [
    {permission: 'Workspaces', isPresent: false},
    {permission: 'Tasks', isPresent: false},
    {permission: 'Employees', isPresent: false},
  ];

  responcePermissions: String[] = [];

  ngOnInit(){
    this.axiosService.request(
      "GET",
      "/jobTitle/allAsObj",
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
  
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  buildForm(permissions: String[]) {
    console.log(this.jobTitles);
    if (this.showDropdown === true)
    {
      for(let i = 0; i < permissions.length; i++)
      {
        this.presetPermissions.forEach(item => {
          if (item.permission === permissions[i]) {
            item.isPresent = true;
          }
        });
      }
    }
    else{
      this.presetPermissions.forEach(item => {
        item.isPresent = false;
      });
    }
  }

  submitJobTitle(jobTitle: JobTitle) {
    
    this.presetPermissions.forEach(item => {
      if(item.isPresent)
      {
        this.responcePermissions.push(item.permission);
      }
    })

    this.axiosService.request(
      "PUT",
      "/jobTitle/update",
      {
        title: jobTitle.title,
        permissions: this.responcePermissions
      }
    ).catch(
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
}
