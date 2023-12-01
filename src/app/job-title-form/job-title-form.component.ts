import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AxiosService } from '../axios.service';
import { ModalService } from '../modal.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-job-title-form',
  templateUrl: './job-title-form.component.html',
  styleUrls: ['./job-title-form.component.css']
})
export class JobTitleFormComponent {
  constructor(private axiosService: AxiosService,
    private modalService: ModalService,
    private router: Router) { }

  responcePermissions: String[] = [];
  jobTitle: String = '';

  presetPermissions = [
    { permission: 'Workspaces', isPresent: false },
    { permission: 'Tasks', isPresent: false },
    { permission: 'Employees', isPresent: false },
  ];

  submitJobTitle() {
    this.presetPermissions.forEach(item => {
      if (item.isPresent) {
        this.responcePermissions.push(item.permission);
      }
    })

    this.axiosService.request(
      "POST",
      "/jobTitle/add",
      {
        title: this.jobTitle,
        permissions: this.responcePermissions
      }
    ).catch(
      (error) => {
        if (error.response.status === 401) {
          this.axiosService.setAuthToken(null);
        }
      }
    );
    this.modalService.close();
    this.router.navigate(['users/jobTitles']);
  }
}
