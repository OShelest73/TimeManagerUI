import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { WorkspacesComponent } from './workspaces/workspaces.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { WorkspaceUsersComponent } from './workspace-users/workspace-users.component';
import { StatsComponent } from './stats/stats.component';
import { UsersComponent } from './users/users.component';
import { JobTitleComponent } from './job-title/job-title.component';
import { UserCreateComponent } from './user-create/user-create.component';

const routes: Routes = [
  {path: '', component: LoginFormComponent},
  {path: 'workspaces', component: WorkspacesComponent},
  {path: 'users', component: UsersComponent},
  {path: 'users/jobTitles', component: JobTitleComponent},
  {path: 'users/create', component: UserCreateComponent},
  {path: 'workspace/:id', component: WorkspaceComponent},
  {path: 'workspace/users/:id', component: WorkspaceUsersComponent},
  {path: 'workspace/users/:id/stats/:userId', component: StatsComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
