import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page } from '../../../pages/competition/interface/page';

@Component({
  selector: 'app-competition-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './competition-pagination.component.html',
  styleUrl: './competition-pagination.component.scss'
})
export class CompetitionPaginationComponent {
  @Input() page ?= <Page>{};
  @Output() paginationClick = new EventEmitter<{nameEmit?: string, numOfPageEmit?: number}>();

  emitPaginationClick(name?: string, numOfPage?: number): void {
    this.paginationClick.emit({nameEmit: name, numOfPageEmit: numOfPage});
  }
}
