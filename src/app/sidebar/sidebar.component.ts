import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() handleToggle: EventEmitter<void> = new EventEmitter<void>();
  @Output() handleOpenModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() handleUserManagement: EventEmitter<void> = new EventEmitter<void>();

  @Input() permissions: String[] = [];

  isSidebarOpen = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  openModal(): void{
    this.handleOpenModal.emit();
  }

  toggle(): void{
    this.handleToggle.emit();
  }

  userManagement(): void{
    this.handleUserManagement.emit();
  }
}
