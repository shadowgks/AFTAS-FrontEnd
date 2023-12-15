import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetitionModalComponent } from '../competition-modal/competition-modal.component';

@Component({
  selector: 'app-competition-header',
  standalone: true,
  imports: [
    CommonModule,
    CompetitionModalComponent
  ],
  templateUrl: './competition-header.component.html',
})
export class CompetitionHeaderComponent {

}
