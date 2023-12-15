import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetitionHeaderComponent } from '../../components/competition/competition-header/competition-header.component';
import { CompetitionTableComponent } from '../../components/competition/competition-table/competition-table.component';
import { CompetitionPaginationComponent } from '../../components/competition/competition-pagination/competition-pagination.component';

@Component({
  selector: 'app-competition',
  standalone: true,
  imports: [
    CommonModule,
    CompetitionHeaderComponent,
    CompetitionTableComponent,
    CompetitionPaginationComponent
  ],
  templateUrl: './competition.component.html',
})
export class CompetitionComponent implements OnInit{

  competition: Array<any>;

  constructor() {
    this.competition = [
      {
        id: 34356771,
        title: 'Girls of the Cartoon Universe',
        creator: 'Jhon Doe',
        instant_price: 4.2,
        price: 187.47,
        ending_in: '06h 52m 47s',
        last_bid: 0.12,
        image: './assets/images/img-01.jpg',
        avatar: './assets/avatars/avt-01.jpg',
      },
      {
        id: 34356772,
        title: 'Pupaks',
        price: 548.79,
        last_bid: 0.35,
        image: './assets/images/img-02.jpg',
      },
      {
        id: 34356773,
        title: 'Seeing Green collection',
        price: 234.88,
        last_bid: 0.15,
        image: './assets/images/img-03.jpg',
      },
    ];
  }

  ngOnInit(): void {}
}
