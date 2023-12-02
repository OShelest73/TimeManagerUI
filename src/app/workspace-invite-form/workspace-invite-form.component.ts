import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AxiosService } from '../axios.service';
import { ModalService } from '../modal.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-workspace-invite-form',
  templateUrl: './workspace-invite-form.component.html',
  styleUrls: ['./workspace-invite-form.component.css']
})
export class WorkspaceInviteFormComponent {
  constructor(private axiosService: AxiosService,
    private modalService: ModalService,
    private router: Router, private jwtService: JwtService) { }

  @Input() workspaceId: number = 0;
  permissions: String[] = [''];
  users: User[] = []

  visibleFlags = Array(this.users.length).fill(true);

  ngOnInit(): void {
    this.axiosService.request(
      "GET",
      `user/invite/${this.workspaceId}`,
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

  onInvite(user: User, i: number)
  {
    this.axiosService.request(
      "POST",
      "user/invite",
      {
        userId: user.id, 
        workspaceId: Number(this.workspaceId),
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
      this.visibleFlags[i] = false;
  }

  roleDefiner(): void {
    const token = this.axiosService.getAuthToken()

    if (token !== null) {
      this.permissions = this.jwtService.getClaim(token, 'usersPermissions');
    }
  }
}
