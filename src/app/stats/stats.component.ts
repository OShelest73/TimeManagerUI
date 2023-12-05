import { Component } from '@angular/core';
import { AxiosService } from "../axios.service";
import { User } from '../../models/user';
import { JwtService } from '../jwt.service';
import { ModalService } from '../modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Point } from "../chart/shared";
import { Subscription } from "rxjs";
import { Observable, of } from "rxjs";

export interface TaskReport{
  id: number,
  startDate: Date,
  finishDate: Date,
  teamMembersAmount: number,
  isAccepted: boolean,
  isExpired: boolean,
  storyPoint: number
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  workspaceId: number = 0;
  userId: number = 0;
  sum: number = 0;
  expirations: number = 0;
  notAccepted: number = 0;

  reports: TaskReport[] = [];
  permissions: String[] = [];

  constructor(private route: ActivatedRoute, private axiosService: AxiosService, 
    private jwtService: JwtService, private router: Router) {
  }

  ngOnInit(): void {
    const workspaceIdParam = this.route.snapshot.paramMap.get('id');
    this.workspaceId = workspaceIdParam !== null ? Number(workspaceIdParam) : 0;

    const userIdParam = this.route.snapshot.paramMap.get('userId');
    this.userId = userIdParam !== null ? Number(userIdParam) : 0;

    this.axiosService.request(
      "GET",
      `report/all/${this.userId}`,
      {}
    ).then(
      (response) => {
        this.reports = response.data;
        this.sumStoryPoint(this.reports);

        this.reports.forEach(item => {
          if (item.isExpired === true) {
            this.expirations++;
          }
        });

        this.reports.forEach(item => {
          if (item.isAccepted === false) {
            this.notAccepted++;
          }
        });
        
      }).catch(
        (error) => {
          if (error.response.status === 401) {
            this.axiosService.setAuthToken(null);
            this.router.navigate(['']);
          } else {
            this.reports = error.response.code;
          }
        }
      );
    this.roleDefiner();
  }

  sumStoryPoint(reports: TaskReport[])
  {
    this.sum = reports.reduce((accumulator, current) => accumulator + current.storyPoint, 0);
  }


  roleDefiner(): void {
    const token = this.axiosService.getAuthToken()

    if (token !== null) {
      this.permissions = this.jwtService.getClaim(token, 'usersPermissions');
    }
  }
}
