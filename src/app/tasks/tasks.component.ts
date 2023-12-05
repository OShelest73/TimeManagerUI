import { Component } from '@angular/core';
import { AxiosService } from '../axios.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs";
import { Task } from 'src/models/task';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  private subscription: Subscription;
  taskId: number = 0;
  workspaceId: number = 0;

  permissions: String[] = [''];
  public task: Task = {
    id: 0, taskName: '', description: '', startDate: new Date('0000-00-00'),
    finishDate: new Date('0000-00-00'), notes: '', status: '', storyPoint: 0
  };

  constructor(private axiosService: AxiosService, private activateRoute: ActivatedRoute,
    private jwtService: JwtService, private router: Router, public modalService: ModalService) {

    this.subscription = activateRoute.params.subscribe(params => this.taskId = params["taskId"]);

    this.activateRoute.params.subscribe(params => {
      this.workspaceId = params['id'];
    });
  }

  ngOnInit(): void {
    this.axiosService.request(
      "GET",
      `/task/find/${this.taskId}`,
      {}
    ).then(
      (response) => {
        this.task = response.data;
      }).catch(
        (error) => {
          if (error.response.status === 401) {
            this.axiosService.setAuthToken(null);
            this.router.navigate(['']);
          } else {
            this.task = error.response.code;
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

  onAppoint() {
    this.router.navigate([`workspace/${this.workspaceId}/task/${this.taskId}/appoint`]);
  }

  onDelete() {
    this.axiosService.request(
      "DELETE",
      `/task/delete/${this.taskId}`,
      {}
    ).catch(
        (error) => {
          if (error.response.status === 401) {
            this.axiosService.setAuthToken(null);
            this.router.navigate(['']);
          } else {
            this.task = error.response.code;
          }
        }
      );

    this.router.navigate([`workspace/${this.workspaceId}`]);
  }

}
