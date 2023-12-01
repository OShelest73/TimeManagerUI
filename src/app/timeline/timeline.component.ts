import { Component } from '@angular/core';
import { AxiosService } from "../axios.service";
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';

export interface Task{
  name: String;
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})

export class TimelineComponent {
  tasks: Task[] = [
    {
      name: 'Task 1',
      startDate: new Date(2023, 0, 1),
      endDate: new Date(2023, 0, 15)
    },
    {
      name: 'Task 2',
      startDate: new Date(2023, 0, 20),
      endDate: new Date(2023, 1, 10)
    },
    // Добавьте другие задачи, если необходимо
  ];

  showInfo = false;

  getMarkerStyles(task: Task) {
    const timelineStart = new Date(2023, 0, 1);
    const timelineEnd = new Date(2023, 0, 31);
    const totalMilliseconds = timelineEnd.getTime() - timelineStart.getTime();
    const startMilliseconds = task.startDate.getTime() - timelineStart.getTime();
    const endMilliseconds = task.endDate.getTime() - timelineStart.getTime();
    const startPercent = (startMilliseconds / totalMilliseconds) * 100;
    const endPercent = (endMilliseconds / totalMilliseconds) * 100;
    return {
      'left': startPercent + '%',
      'width.marker': (endPercent - startPercent) + '%'
    };
  }

  calculatePercentage(date: Date) {
    const timelineStart = new Date(2023, 0, 1);
    const timelineEnd = new Date(2023, 0, 31);
    const totalMilliseconds = timelineEnd.getTime() - timelineStart.getTime();
    const elapsedMilliseconds = date.getTime() - timelineStart.getTime();
    return (elapsedMilliseconds / totalMilliseconds) * 100;
  }
}
