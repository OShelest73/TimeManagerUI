import { Component, Input } from '@angular/core';
import { Task } from 'src/models/task';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent {
  @Input() tasks: Task[] = [];
  column1: Task[] = [];
  column2: Task[] = [];
  column3: Task[] = [];

  ngOnChanges()
  {
    this.distributeItems();
  }

  private distributeItems()
  {
    this.column1 = [];
    this.column2 = [];
    this.column3 = [];

    for (const task of this.tasks) {
      if (task.status === 'Без исполнителя' || task.status === 'Предстоит') {
        this.column1.push(task as Task);
      } else if (task.status === 'Выполняется' || task.status === 'Просрочено') {
        this.column2.push(task as Task);
      } else if(task.status === 'Отклонено' || task.status === 'Завершено') {
        this.column3.push(task as Task);
      }
    }
  }

}
