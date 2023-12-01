import { Component, Input } from '@angular/core';
import { AxiosService } from "../axios.service";
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuthorized: boolean = false;

  permissions: String[] = [];

  constructor(private axiosService: AxiosService, private jwtService: JwtService,
    private router: Router) { }

  ngDoCheck() {
    this.roleDefiner();
  }

  logout(): void{
    this.axiosService.setAuthToken(null);
    this.router.navigate(['']);
    this.isAuthorized = false;
  }

  roleDefiner() : void {
    const token = this.axiosService.getAuthToken()
    
    if(token !== null)
    {
        this.isAuthorized = true;
        this.permissions = this.jwtService.getClaim(token, 'usersPermissions');
    }
    else{
      this.isAuthorized = false;
    }
  }
}
