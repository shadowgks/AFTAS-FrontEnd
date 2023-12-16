import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Competition } from '../../../pages/competition/interface/competition';
import { CompetitionTableItemComponent } from '../competition-table-item/competition-table-item.component'; 
import { CompetitionPaginationComponent } from '../competition-pagination/competition-pagination.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, map, startWith, catchError, of } from 'rxjs';
import { ApiResponse } from '../../../pages/competition/interface/api-response';
import { Page } from '../../../pages/competition/interface/page';
import { CompetitionService } from '../../../pages/competition/service/competition.service';
@Component({
  selector: '[app-competition-table]',
  standalone: true,
  imports: [
    CommonModule, 
    CompetitionTableItemComponent,
    CompetitionPaginationComponent
  ],
  templateUrl: './competition-table.component.html',
})
export class CompetitionTableComponent {
  
  @Input() competitionState = <any>{};
  // competitionState$!: Observable<{ appState: string, appData?: ApiResponse<Page>, error?: HttpErrorResponse}>;
  // constructor(private competitionService: CompetitionService){}

  // ngOnInit(): void {
  //   this.getCompetitions();
  // }

  // public getCompetitions(){
  //   this.competitionState$ = this.competitionService.getCompetitions().pipe(
  //     map((response: ApiResponse<Page>) => {
  //       console.log(response);
  //       return ({appState: "app_loaded", appData: response});
  //     }
  //   ),
  //   startWith({appState: "app_loading"}),
  //   catchError((error: HttpErrorResponse) => of({ appState: 'app_error', error}))
  //   )
  // }

}
