import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-workspace-form',
  templateUrl: './workspace-form.component.html',
  styleUrls: ['./workspace-form.component.css']
})
export class WorkspaceFormComponent {
  evaluationMethods: string[] = [
    'KPI',
    'Story Points'
  ];

  form = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    evaluationMethod: new FormControl('', Validators.required)
  })

  get name(){
    return this.form.controls.name as FormControl;
  }
  get evaluationMethod(){
    return this.form.controls.evaluationMethod as FormControl;
  }

  submit() {
  }
}
