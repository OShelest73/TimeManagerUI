import { Component, OnInit } from '@angular/core';
import { AxiosService } from '../axios.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit{
  componentToShow: string = "login";
  
  constructor(private axiosService: AxiosService){}

  ngOnInit(): void {
    if(this.axiosService.getAuthToken() !== null)
    {
      this.componentToShow = "workspaces";
    }
    else
    {
      this.componentToShow = "login";
    }
  }

  showComponent(componentToShow: string): void {
    this.componentToShow = componentToShow;
  }

  logout(): void {
    this.axiosService.deleteAuthToken();
  }

  onLogin(input: any): void{
    this.axiosService.request(
      "POST",
      "/login",
      {
        email: input.email,
        password: input.password
      }
    ).then(
      response => {
        this.axiosService.setAuthToken(response.data.token);
        this.componentToShow = "workspaces";
    }).catch(
      error => {
          this.axiosService.setAuthToken(null);
          this.componentToShow = "login";
      }
    );
  }
  onRegister(input: any): void{
    this.axiosService.request(
      "POST",
      "/register",
      {
        fullName: input.fullName,
        email: input.email,
        password: input.password
      }
    ).then(
      response => {
        this.axiosService.setAuthToken(response.data.token);
        this.componentToShow = "workspaces";
    }).catch(
      error => {
          this.axiosService.setAuthToken(null);
          this.componentToShow = "login";
      }
    );
  }
}
