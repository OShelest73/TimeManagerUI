import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AxiosService } from '../axios.service';
import { ModalService } from '../modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workspace-form',
  templateUrl: './workspace-form.component.html',
  styleUrls: ['./workspace-form.component.css']
})
export class WorkspaceFormComponent {
  constructor(private axiosService: AxiosService, 
              private modalService: ModalService,
              private router: Router) {}

  evaluationMethods: string[] = [
    'KPI',
    'Story Points'
  ];

  form = new FormGroup({
    workspaceName: new FormControl<string>('', Validators.required),
    evalMethod: new FormControl(this.evaluationMethods[0], Validators.required)
  });

  get workspaceName(){
    return this.form.controls.workspaceName as FormControl;
  }
  get evalMethod(){
    return this.form.controls.evalMethod as FormControl;
  }

  submitWorkspace() {
    if(this.form.controls.workspaceName.errors === null && this.form.controls.evalMethod.errors === null)
    {
      this.axiosService.request(
        "POST",
        "/workspace/add",
        {
          name : this.form.controls.workspaceName.value,
          evaluationMethod : this.form.controls.evalMethod.value
        }
      ).catch(
        (error) => {
          if (error.response.status === 401) {
            this.axiosService.setAuthToken(null);
          }
        }
      );
      this.modalService.close();
      this.router.navigate(['workspaces']);
    }
    
  }
}
