import { Component } from '@angular/core';
import { AxiosService } from '../axios.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs";
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';
import { ModalService } from '../modal.service';
import { Task } from 'src/models/task';


@Component({
  selector: 'app-appointed-tasks',
  templateUrl: './appointed-tasks.component.html',
  styleUrls: ['./appointed-tasks.component.css']
})
export class AppointedTasksComponent {
  private subscription: Subscription;
  taskId: number = 0;
  workspaceId: number = 0;

  permissions: String[] = [''];
  public appointedTasks: Task[] = [];
  public tasksToCheck: Task[] = [];

  visibleFlags1: boolean[] = [];
  visibleFlags2: boolean[] = [];

  public email: String = '';

  constructor(private axiosService: AxiosService, private activateRoute: ActivatedRoute,
    private jwtService: JwtService, private router: Router, public modalService: ModalService) {

    this.subscription = activateRoute.params.subscribe(params => this.taskId = params["taskId"]);

    this.activateRoute.params.subscribe(params => {
      this.workspaceId = params['id'];
    });
  }

  ngOnInit(): void {
    this.getIssuer();
    this.axiosService.request(
      "GET",
      `/task/appointedTasks/${this.email}`,
      {}
    ).then(
      (response) => {
        this.appointedTasks = response.data;
        this.visibleFlags1 = Array(this.appointedTasks.length).fill(true);
      }).catch(
        (error) => {
          if (error.response.status === 401) {
            this.axiosService.setAuthToken(null);
            this.router.navigate(['']);
          } else {
            this.appointedTasks = error.response.code;
          }
        }
      );

    this.axiosService.request(
      "GET",
      `/task/tasksToCheck/${this.email}`,
      {}
    ).then(
      (response) => {
        this.tasksToCheck = response.data;
        this.visibleFlags2 = Array(this.tasksToCheck.length).fill(true);
      }).catch(
        (error) => {
          if (error.response.status === 401) {
            this.axiosService.setAuthToken(null);
            this.router.navigate(['']);
          } else {
            this.tasksToCheck = error.response.code;
          }
        }
      );
    this.roleDefiner();
  }

  roleDefiner(): void {
    const token = this.axiosService.getAuthToken();

    if (token !== null) {
      this.permissions = this.jwtService.getClaim(token, 'usersPermissions');
    }
  }

  getIssuer() {
    const token = this.axiosService.getAuthToken();
    if (token !== null) {
      this.email = this.jwtService.getIssuer(token);
    }
  }

  onComplete(task: Task, i: number) {
    console.log(task.id);
    this.axiosService.request(
      "POST",
      "/task/notifyCompletion",
      {
        "id": task.id
      }
    ).catch(
      (error) => {
        if (error.response.status === 401) {
          this.axiosService.setAuthToken(null);
          this.router.navigate(['']);
        } else {
          this.tasksToCheck = error.response.code;
        }
      }
    );
    this.visibleFlags1[i] = false;
  }

  onAccept(task: Task, i: number) {
    this.axiosService.request(
      "POST",
      "/task/accept",
      {
        "id": task.id
      }
    ).catch(
      (error) => {
        if (error.response.status === 401) {
          this.axiosService.setAuthToken(null);
          this.router.navigate(['']);
        } else {
          this.tasksToCheck = error.response.code;
        }
      }
    );
    this.visibleFlags2[i] = false;
  }
  onDecline(task: Task, i: number) {
    this.axiosService.request(
      "POST",
      "/task/decline",
      {
        "id": task.id
      }
    ).catch(
      (error) => {
        if (error.response.status === 401) {
          this.axiosService.setAuthToken(null);
          this.router.navigate(['']);
        } else {
          this.tasksToCheck = error.response.code;
        }
      }
    );
    this.visibleFlags2[i] = false;
  }
}
