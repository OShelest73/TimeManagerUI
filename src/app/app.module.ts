import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { AuthContentComponent } from './auth-content/auth-content.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ContentComponent } from './content/content.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { WorkspacesComponent } from './workspaces/workspaces.component';
import { WorkspaceFormComponent } from './workspace-form/workspace-form.component';
import { ModalComponentComponent } from './modal-component/modal-component.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { UsersComponent } from './users/users.component';
import { KanbanComponent } from './kanban/kanban.component';
import { ListComponent } from './list/list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WorkspaceUsersComponent } from './workspace-users/workspace-users.component';
import { StatsComponent } from './stats/stats.component';
import { TimelineComponent } from './timeline/timeline.component';
import { UsersSidebarComponent } from './users-sidebar/users-sidebar.component';
import { JobTitleComponent } from './job-title/job-title.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { JobTitleFormComponent } from './job-title-form/job-title-form.component';
import { SparklineChartComponent } from './chart/sparkline-chart/sparkline-chart.component';
import { SparklineLineComponent } from './chart/sparkline-line/sparkline-line.component';
import { SparklineDotsComponent } from './chart/sparkline-dots/sparkline-dots.component';
import { SparklineAreaComponent } from './chart/sparkline-area/sparkline-area.component';
import { MatTooltipModule } from "@angular/material/tooltip";
import { TaskEditFormComponent } from './task-edit-form/task-edit-form.component';
import { WorkspaceInviteFormComponent } from './workspace-invite-form/workspace-invite-form.component';
import { AppointUserComponent } from './appoint-user/appoint-user.component';
import { AppointFormComponent } from './appoint-form/appoint-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthContentComponent,
    LoginFormComponent,
    ContentComponent,
    ButtonsComponent,
    WorkspacesComponent,
    WorkspaceFormComponent,
    ModalComponentComponent,
    WorkspaceComponent,
    TasksComponent,
    TaskFormComponent,
    UsersComponent,
    KanbanComponent,
    ListComponent,
    SidebarComponent,
    WorkspaceUsersComponent,
    StatsComponent,
    TimelineComponent,
    UsersSidebarComponent,
    JobTitleComponent,
    UserCreateComponent,
    JobTitleFormComponent,
    SparklineChartComponent,
    SparklineLineComponent,
    SparklineDotsComponent,
    SparklineAreaComponent,
    TaskEditFormComponent,
    WorkspaceInviteFormComponent,
    AppointUserComponent,
    AppointFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
