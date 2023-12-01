import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-users-sidebar',
  templateUrl: './users-sidebar.component.html',
  styleUrls: ['./users-sidebar.component.css']
})
export class UsersSidebarComponent {
  @Output() handleUserCreation: EventEmitter<void> = new EventEmitter<void>();
  @Output() handleJobTitle: EventEmitter<void> = new EventEmitter<void>();
  isSidebarOpen = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  userCreation(): void{
    this.handleUserCreation.emit();
  }

  jobTitleManagement(): void{
    this.handleJobTitle.emit();
  }
}
