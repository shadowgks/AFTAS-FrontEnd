import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from "rxjs";
import { ApiResponse } from '../../../../../shared/models/api-response';
import { Page } from '../../../../../shared/models/competition/page-competition';
@Component({
  selector: 'app-competition-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './competition-header.component.html',
})
export class CompetitionHeaderComponent {
  
}
