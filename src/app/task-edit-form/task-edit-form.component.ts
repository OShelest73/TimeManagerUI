import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AxiosService } from '../axios.service';
import { ModalService } from '../modal.service';
import { Router } from '@angular/router';
import { Task } from 'src/models/task';
import { currentDateValidator, dateRangeValidator } from '../dateTimeValidators';
import { Workspace } from 'src/models/workspace';
import { format } from 'date-fns';

@Component({
  selector: 'app-task-edit-form',
  templateUrl: './task-edit-form.component.html',
  styleUrls: ['./task-edit-form.component.css']
})
export class TaskEditFormComponent {
  constructor(private axiosService: AxiosService,
    private modalService: ModalService,
    private router: Router) { }

  @Input() task: Task = {
    id: 0, taskName: '', description: '', startDate: new Date('0000-00-00'),
    finishDate: new Date('0000-00-00'), notes: '', status: '', storyPoint: 0
  };
  @Input() workspaceId = 0;

  workspace: Workspace = {
    id: 0, name: ''
  };

  form = new FormGroup({
    taskName: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    notes: new FormControl<string>(''),
    startDate: new FormControl(new Date(), currentDateValidator),
    finishDate: new FormControl(new Date(), currentDateValidator)
  }, { validators: dateRangeValidator() });

  get taskName() {
    return this.form.controls.taskName as FormControl;
  }
  get description() {
    return this.form.controls.description as FormControl;
  }
  get notes() {
    return this.form.controls.notes as FormControl;
  }
  get startDate() {
    return this.form.controls.startDate as FormControl;
  }
  get finishDate() {
    return this.form.controls.finishDate as FormControl;
  }

  submitTask() {
    if (!this.form.invalid) {
      console.log(this.workspaceId);
      this.axiosService.request(
        "GET",
        `/workspace/find/${this.workspaceId}`,
        {}
      ).then(
        (response) => {
          this.workspace = response.data;

          this.axiosService.request(
            "PUT",
            "/task/update",
            {
              id: this.task.id,
              taskName: this.form.controls.taskName.value,
              description: this.form.controls.description.value,
              notes: this.form.controls.notes.value,
              startDate: this.form.controls.startDate.value,
              finishDate: this.form.controls.finishDate.value,
              workspace: this.workspace,
            }
          ).catch(
            (error) => {
              if (error.response.status === 401) {
                this.axiosService.setAuthToken(null);
              }
            }
          );
        })
      this.modalService.close();
      this.router.navigate([`workspace/${this.workspaceId}/task/${this.task.id}`]);
    }
    console.log(this.form);
  }
}
