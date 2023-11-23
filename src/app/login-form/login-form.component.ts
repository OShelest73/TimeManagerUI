import { Component, EventEmitter, Output } from '@angular/core';
import { AxiosService } from '../axios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  active: string = "login";
  fullName: string = ""
  email: string = "";
  password: string = "";

  constructor(private axiosService: AxiosService, private router: Router){

  }

  onLoginTab(): void {
    this.active = "login";
  }

  onRegisterTab(): void {
    this.active = "register";
  }

  onSubmitLogin(): void{
    this.axiosService.request(
      "POST",
      "/login",
      {
        email: this.email,
        password: this.password
      }
    ).then(
      response => {
        this.axiosService.setAuthToken(response.data.token);
        this.router.navigate(['workspaces']);
    }).catch(
      error => {
          this.axiosService.setAuthToken(null);
          this.router.navigate(['']);
      }
    );
  }
  onSubmitRegister(): void{
    this.axiosService.request(
      "POST",
      "/register",
      {
        fullName: this.fullName,
        email: this.email,
        password: this.password
      }
    ).then(
      response => {
        this.axiosService.setAuthToken(response.data.token);
        this.router.navigate(['workspaces']);
    }).catch(
      error => {
          this.axiosService.setAuthToken(null);
          this.router.navigate(['']);
      }
    );
  }
}
