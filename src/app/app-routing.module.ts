import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { WorkspacesComponent } from './workspaces/workspaces.component';

const routes: Routes = [
  {path: '', component: LoginFormComponent},
  {path: 'workspaces', component: WorkspacesComponent},
  {path: 'tasks', component: WorkspacesComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
