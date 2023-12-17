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
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-competition',
  standalone: true,
  imports: [
    CommonModule,
    CompetitionHeaderComponent,
    CompetitionTableComponent,
    CompetitionPaginationComponent,
    HttpClientModule,
    AngularSvgIconModule,
    FormsModule
  ],
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.css'
})
export class CompetitionComponent implements OnInit{
  competitionState$!: Observable<{ appState: string, appData?: ApiResponse<Page>, error?: HttpErrorResponse}>;
  responseSubject = new BehaviorSubject<ApiResponse<Page>>(null!);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();

  constructor(private competitionService: CompetitionService){}

  ngOnInit(): void {
    this.getCompetitions();
  }

  public getCompetitions(){
    this.competitionState$ = this.competitionService.getCompetitions().pipe(
      map((response: ApiResponse<Page>) => {
        console.log(response);
        this.currentPageSubject.next(response.result.page.number);
        return ({appState: "app_loaded", appData: response});
      }
    ),
    startWith({appState: "app_loading"}),
    catchError((error: HttpErrorResponse) => of({ appState: 'app_error', error}))
    )
  }

  public clickNumberPagination(name?: string, numOfPage: number = 0){
    this.competitionState$ = this.competitionService.getCompetitions(name, numOfPage).pipe(
      map((response: ApiResponse<Page>) => {
        this.responseSubject.next(response);
        console.log(response);
        this.currentPageSubject.next(numOfPage!);
        return ({appState: "app_loaded", appData: response});
      }
    ),
    startWith({appState: "app_loaded", appData: this.responseSubject.value}),
    catchError((error: HttpErrorResponse) => of({ appState: 'app_error', error}))
    )
  }

  public clickNextOrPrevious(name?: string, direction?: string){
    this.clickNumberPagination(name, direction === 'next' ? this.currentPageSubject.value+1 : this.currentPageSubject.value-1);
  }
}
