import { Component, Input } from '@angular/core';
import { Task } from 'src/models/task';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() tasks: Task[] = [];
}
