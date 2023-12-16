import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetitionHeaderComponent } from '../../components/competition/competition-header/competition-header.component';
import { CompetitionTableComponent } from '../../components/competition/competition-table/competition-table.component';
import { CompetitionPaginationComponent } from '../../components/competition/competition-pagination/competition-pagination.component';
import { CompetitionService } from './service/competition.service';
import { BehaviorSubject, Observable, catchError, map, of, startWith } from 'rxjs';
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
  competitionState$!: Observable<{ appState: string, appData?: ApiResponse<Page>, error?: HttpErrorResponse}>;
  responseSeized = new BehaviorSubject<ApiResponse<Page>>(null!);

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

  public getCompetitionOfPage(name?:string, numOfPage?: number){
    this.competitionState$ = this.competitionService.getCompetitions(name, numOfPage).pipe(
      map((response: ApiResponse<Page>) => {
        this.responseSeized.next(response);
        console.log(response);
        return ({appState: "app_loaded", appData: response});
      }
    ),
    startWith({appState: "app_loaded", appData: this.responseSeized.value}),
    catchError((error: HttpErrorResponse) => of({ appState: 'app_error', error}))
    )
  }
}
