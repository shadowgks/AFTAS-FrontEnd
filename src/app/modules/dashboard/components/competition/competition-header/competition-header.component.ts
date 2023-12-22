import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from "rxjs";
import { ApiResponse } from '../../../model/api-response';
import { Page } from '../../../pages/competition/models/page';
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
