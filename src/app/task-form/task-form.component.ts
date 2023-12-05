import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AxiosService } from '../axios.service';
import { ModalService } from '../modal.service';
import { Router } from '@angular/router';
import { currentDateValidator, dateRangeValidator } from '../dateTimeValidators';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  constructor(private axiosService: AxiosService,
    private modalService: ModalService,
    private router: Router) { }

  @Input() workspaceId: number = 0;
  storyPoints: number[] = [];

  form = new FormGroup({
    taskName: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    notes: new FormControl<string>(''),
    startDate: new FormControl(new Date(), currentDateValidator),
    finishDate: new FormControl(new Date(), currentDateValidator),
    dropdownControl: new FormControl()
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
  get dropdownControl() {
    return this.form.controls.dropdownControl as FormControl;
  }

  ngOnInit() {
    this.axiosService.request(
      "GET",
      "/task/sp/all",
      {}
    ).then(
      (response) => {
        this.storyPoints = response.data;
      }).catch(
      (error) => {
        if (error.response.status === 401) {
          this.axiosService.setAuthToken(null);
        }
      }
    );
  }

  submitTask() {
    if (!this.form.invalid) {
      this.axiosService.request(
        "POST",
        "/task/add",
        {
          taskName: this.form.controls.taskName.value,
          description: this.form.controls.description.value,
          notes: this.form.controls.notes.value,
          startDate: this.form.controls.startDate.value,
          finishDate: this.form.controls.finishDate.value,
          workspaceId: this.workspaceId,
          storyPoint: this.dropdownControl.value
        }
      ).catch(
        (error) => {
          if (error.response.status === 401) {
            this.axiosService.setAuthToken(null);
          }
        }
      );
      this.modalService.close();
      
      this.router.navigate([`workspace/${this.workspaceId}`]);
    }
  }
}
