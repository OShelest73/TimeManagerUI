import { Component, Input } from '@angular/core';
import { AxiosService } from '../axios.service';
import { JwtService } from '../jwt.service';
import { Task } from 'src/models/task';
import { Router, ActivatedRoute } from '@angular/router';
import {Subscription} from "rxjs";
import { ModalService } from '../modal.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent {
  public workspaceId: number = 0;
  private subscription: Subscription;
  permissions: String[] = [''];
  tasks: Task[] = [];

  constructor(private axiosService: AxiosService, private jwtService: JwtService, private router: Router,
    private activateRoute: ActivatedRoute, public modalService: ModalService){
      this.subscription = activateRoute.params.subscribe(params=>this.workspaceId=params["id"]);
    }

  ngOnInit(): void{
    this.axiosService.request(
      "GET",
      `/workspace/tasks/${ this.workspaceId }`,
      {}
    ).then(
      (response) => {
        this.tasks = response.data;
      }).catch(
      (error) => {
		    if (error.response.status === 401 ) {
        	this.axiosService.setAuthToken(null);
          this.router.navigate(['']);
        } else {
        	this.tasks = error.response.code;
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
