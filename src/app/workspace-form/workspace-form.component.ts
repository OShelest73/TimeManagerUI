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

  form = new FormGroup({
    workspaceName: new FormControl<string>('', Validators.required),
  });

  get workspaceName(){
    return this.form.controls.workspaceName as FormControl;
  }
  submitWorkspace() {
    if(this.form.controls.workspaceName.errors === null)
    {
      this.axiosService.request(
        "POST",
        "/workspace/add",
        {
          name : this.form.controls.workspaceName.value
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
