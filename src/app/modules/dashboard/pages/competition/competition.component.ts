import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetitionHeaderComponent } from '../../components/competition/competition-header/competition-header.component';
import { CompetitionTableComponent } from '../../components/competition/competition-table/competition-table.component';
import { CompetitionPaginationComponent } from '../../components/competition/competition-pagination/competition-pagination.component';
import { CompetitionService } from './service/competition.service';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { ApiResponse } from './interface/api-response';
import { Page } from './interface/page';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-competition',
  standalone: true,
  imports: [
    CommonModule,
    CompetitionHeaderComponent,
    CompetitionTableComponent,
    CompetitionPaginationComponent,
    HttpClientModule
  ],
  templateUrl: './competition.component.html',
})
export class CompetitionComponent implements OnInit{

  // competition?: ApiResponse<Page>[];

  competitionState$!: Observable<{ appState: string, appData?: ApiResponse<Page>, error?: HttpErrorResponse}>;
    // constructor() {
  //   this.competition = [
  //     {
  //       id: 34356771,
  //       title: 'Girls of the Cartoon Universe',
  //       creator: 'Jhon Doe',
  //       instant_price: 4.2,
  //       price: 187.47,
  //       ending_in: '06h 52m 47s',
  //       last_bid: 0.12,
  //       image: './assets/images/img-01.jpg',
  //       avatar: './assets/avatars/avt-01.jpg',
  //     },
  //     {
  //       id: 34356772,
  //       title: 'Pupaks',
  //       price: 548.79,
  //       last_bid: 0.35,
  //       image: './assets/images/img-02.jpg',
  //     },
  //     {
  //       id: 34356773,
  //       title: 'Seeing Green collection',
  //       price: 234.88,
  //       last_bid: 0.15,
  //       image: './assets/images/img-03.jpg',
  //     },
  //   ];
  // }
  constructor(private competitionService: CompetitionService){}

  ngOnInit(): void {
    this.getCompetitions();
  }

  public getCompetitions(){
    this.competitionState$ = this.competitionService.getCompetitions().pipe(
      map((response: ApiResponse<Page>) => {
        console.log(response);
        return ({appState: "app_loaded", appData: response});
      }
    ),
    startWith({appState: "app_loading"}),
    catchError((error: HttpErrorResponse) => of({ appState: 'app_error', error}))
    )
  }
}
