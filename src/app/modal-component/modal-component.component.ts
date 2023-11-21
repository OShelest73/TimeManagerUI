import { Component, Input } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.css']
})
export class ModalComponentComponent {
  @Input() title: string = '';

  constructor(public modalService: ModalService) {}
}
