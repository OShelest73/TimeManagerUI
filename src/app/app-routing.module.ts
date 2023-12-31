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
import { TasksComponent } from './tasks/tasks.component';
import { AppointUserComponent } from './appoint-user/appoint-user.component';
import { AppointedTasksComponent } from './appointed-tasks/appointed-tasks.component';

const routes: Routes = [
  {path: '', component: LoginFormComponent},
  {path: 'workspaces', component: WorkspacesComponent},
  {path: 'tasks', component: AppointedTasksComponent},
  {path: 'users', component: UsersComponent},
  {path: 'users/jobTitles', component: JobTitleComponent},
  {path: 'users/create', component: UserCreateComponent},
  {path: 'workspace/:id', component: WorkspaceComponent},
  {path: 'workspace/:id/task/:taskId', component: TasksComponent},
  {path: 'workspace/:id/task/:taskId/appoint', component: AppointUserComponent},
  {path: 'workspace/users/:id', component: WorkspaceUsersComponent},
  {path: 'workspace/users/:id/:userId', component: StatsComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
