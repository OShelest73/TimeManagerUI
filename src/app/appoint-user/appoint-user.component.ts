import { Component } from '@angular/core';
import { AxiosService } from "../axios.service";
import { User } from '../../models/user';
import { JwtService } from '../jwt.service';
import { ModalService } from '../modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-appoint-user',
  templateUrl: './appoint-user.component.html',
  styleUrls: ['./appoint-user.component.css']
})
export class AppointUserComponent {
  users: User[] = [];
  permissions: String[] = [''];
  public workspaceId: number = 0;
  public taskId: number = 0;

  constructor(private axiosService: AxiosService, private jwtService: JwtService,
    public modalService: ModalService, private router: Router, private activateRoute: ActivatedRoute) {
      this.activateRoute.params.subscribe(params => {
        this.workspaceId = params['id'];
      });

      this.activateRoute.params.subscribe(params => {
        this.taskId = params['taskId'];
      });
  }

  ngOnInit(): void {
    this.axiosService.request(
      "GET",
      `task/appointed/${this.taskId}`,
      {}
    ).then(
      (response) => {
        this.users = response.data;
      }).catch(
        (error) => {
          if (error.response.status === 401) {
            this.axiosService.setAuthToken(null);
            this.router.navigate(['']);
          } else {
            this.users = error.response.code;
          }
        }
      );
    this.roleDefiner();
  }

  onRemove(user: User){
    this.axiosService.request(
      "POST",
      "task/user/remove",
      {
        userId: user.id,
        taskId: Number(this.taskId)
      }
    ).catch(
        (error) => {
          if (error.response.status === 401) {
            this.axiosService.setAuthToken(null);
            this.router.navigate(['']);
          } else {
            this.users = error.response.code;
          }
        }
      );
    this.roleDefiner();
  }

  roleDefiner(): void {
    const token = this.axiosService.getAuthToken()

    if (token !== null) {
      this.permissions = this.jwtService.getClaim(token, 'usersPermissions');
    }
  }
}
