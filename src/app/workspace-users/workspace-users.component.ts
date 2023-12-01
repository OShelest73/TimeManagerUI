import { Component } from '@angular/core';
import { AxiosService } from "../axios.service";
import { User } from '../../models/user';
import { JwtService } from '../jwt.service';
import { ModalService } from '../modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-workspace-users',
  templateUrl: './workspace-users.component.html',
  styleUrls: ['./workspace-users.component.css']
})
export class WorkspaceUsersComponent {
  users: User[] = [];
  permissions: String[] = [''];
  public workspaceId: number = 0;
  private subscription: Subscription;


  constructor(private axiosService: AxiosService, private jwtService: JwtService,
    public modalService: ModalService, private router: Router, private activateRoute: ActivatedRoute){
      this.subscription = activateRoute.params.subscribe(params=>this.workspaceId=params["id"])
    }

  ngOnInit(): void {
    this.axiosService.request(
      "GET",
      "/user/all",
      {}
    ).then(
      (response) => {
        this.users = response.data;
      }).catch(
      (error) => {
		    if (error.response.status === 401 ) {
        	this.axiosService.setAuthToken(null);
          this.router.navigate(['']);
        } else {
        	this.users = error.response.code;
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
