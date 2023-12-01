import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimelineComponent } from '../timeline/timeline.component';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  workspaceId: number = 0;
  userId: number = 0;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.workspaceId = params['id'];
      this.userId = params['userId'];
    });
  }
}
