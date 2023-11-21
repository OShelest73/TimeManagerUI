import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { AuthContentComponent } from './auth-content/auth-content.component';
import { WelcomeContentComponent } from './welcome-content/welcome-content.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ContentComponent } from './content/content.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { WorkspacesComponent } from './workspaces/workspaces.component';
import { WorkspaceFormComponent } from './workspace-form/workspace-form.component';
import { ModalComponentComponent } from './modal-component/modal-component.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthContentComponent,
    WelcomeContentComponent,
    LoginFormComponent,
    ContentComponent,
    ButtonsComponent,
    WorkspacesComponent,
    WorkspaceFormComponent,
    ModalComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
