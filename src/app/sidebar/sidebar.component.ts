import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() handleToggle: EventEmitter<void> = new EventEmitter<void>();
  @Output() handleOpenModal: EventEmitter<void> = new EventEmitter<void>();
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
}
