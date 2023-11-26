import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AxiosService } from '../axios.service';
import { ModalService } from '../modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
constructor(private axiosService: AxiosService, 
              private modalService: ModalService,
              private router: Router) {}

  @Input() workspaceId: number = 0;

  form = new FormGroup({
    taskName: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    notes: new FormControl<string>(''),
    startDate: new FormControl(new Date()),
    finishDate: new FormControl(new Date())
  });

  get taskName(){
    return this.form.controls.taskName as FormControl;
  }
  get description(){
    return this.form.controls.description as FormControl;
  }
  get notes(){
    return this.form.controls.notes as FormControl;
  }
  get startDate(){
    return this.form.controls.startDate as FormControl;
  }
  get finishDate(){
    return this.form.controls.finishDate as FormControl;
  }

  submitTask() {
    if(!this.form.invalid)
    {
      this.axiosService.request(
        "POST",
        "/task/add",
        {
          taskName : this.form.controls.taskName.value,
          description : this.form.controls.description.value,
          notes : this.form.controls.notes.value,
          startDate : this.form.controls.startDate.value,
          finishDate : this.form.controls.finishDate.value,
          workspaceId : this.workspaceId,
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
