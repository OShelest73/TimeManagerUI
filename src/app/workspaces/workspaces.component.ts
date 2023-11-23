import { Component } from '@angular/core';
import { AxiosService } from "../axios.service";
import { Workspace } from '../../models/workspace';
import { JwtService } from '../jwt.service';
import { ModalService } from '../modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workspaces',
  templateUrl: './workspaces.component.html',
  styleUrls: ['./workspaces.component.css']
})
export class WorkspacesComponent {
  data: Workspace[] = [];
  permissions: String[] = [''];

  constructor(private axiosService: AxiosService, private jwtService: JwtService,
    public modalService: ModalService, private router: Router) {}

  ngOnInit(): void {
    this.axiosService.request(
      "GET",
      "/user/workspaces",
      {}
    ).then(
      (response) => {
        this.data = response.data;
      }).catch(
      (error) => {
		    if (error.response.status === 401 ) {
        	this.axiosService.setAuthToken(null);
          this.router.navigate(['']);
        } else {
        	this.data = error.response.code;
        }
      }
    );
    this.roleDefiner();
  }

  roleDefiner() : void {
    const token = this.axiosService.getAuthToken()
    
    if(token !== null)
    {
        this.permissions = this.jwtService.getClaim(token, 'usersPermissions');
    }

  }
}
