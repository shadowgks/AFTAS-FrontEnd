import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CurrencyPipe } from '@angular/common';
import { Competition } from '../../../pages/competition/interface/competition';



@Component({
  selector: '[app-competition-table-item]',
  standalone: true,
  imports: [
    CommonModule, 
    AngularSvgIconModule,
    CurrencyPipe,
  ],
  templateUrl: './competition-table-item.component.html',
  styleUrl: './competition-table-item.component.scss'
})
export class CompetitionTableItemComponent {
  @Input() action = <Competition>{};
  @Input() index !: number;

  constructor() {}

  ngOnInit(): void {}
}
