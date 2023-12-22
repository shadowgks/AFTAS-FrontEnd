import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetitionHeaderComponent } from '../../components/competition/competition-header/competition-header.component';
import { CompetitionService } from './service/competition.service';
import { BehaviorSubject, Observable, catchError, map, of, startWith } from 'rxjs';
import { ApiResponse } from '../../model/api-response';
import { Page } from './models/page';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Competition } from './models/competition';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-competition',
  standalone: true,
  imports: [
    CommonModule,
    CompetitionHeaderComponent,
    HttpClientModule,
    AngularSvgIconModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.css'
})

export class CompetitionComponent implements OnInit {
  competitionState$!: Observable<{ appState: string, appData?: ApiResponse<Page> }>;
  // responseSubject = new BehaviorSubject<ApiResponse<Page>>(null!);
  
  //current page
  private currentPageSubject = new BehaviorSubject<number>(null!);
  currentPage$ = this.currentPageSubject.asObservable();

  constructor(private competitionService: CompetitionService) { }

  ngOnInit(): void {
    this.getCompetitions();
  }

  
  filter(itemDate: string): string {
    const currentDate = new Date();
    const competitionDate = new Date(itemDate);
    
    return currentDate > competitionDate ? 'closed' : 'panding';
  }

  public getCompetitions() {
    this.competitionState$ = this.competitionService.getCompetitionsPageble().pipe(
      map((response: ApiResponse<Page>) => {
        this.currentPageSubject.next(response.result.page.number);
        return ({ appState: "app_loaded", appData: response });
      }
      ),
      startWith({ appState: "app_loading" }),
      catchError((error: HttpErrorResponse) => of({ appState: 'app_error', error }))
    )
  }

  public clickNumberPagination(name?: string, numOfPage: number = 0) {
    this.competitionState$ = this.competitionService.getCompetitionsPageble(name, numOfPage).pipe(
      map((response: ApiResponse<Page>) => {
        console.log(response);
        // this.responseSubject.next(response);
        this.currentPageSubject.next(numOfPage);
        return ({ appState: "app_loaded", appData: response });
      }),
      startWith({ appState: "app_loaded" }),
      catchError((error: HttpErrorResponse) => of({ appState: 'app_error', error }))
    )
  }

  public clickNextOrPrevious(name?: string, direction?: string) {
    this.clickNumberPagination(name, direction === 'next' ?
     this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
  }

  //add modal
  public onAddCompetition(addForm: NgForm) {
    this.competitionService.saveCompetition(addForm.value).subscribe(
      (response: ApiResponse<Competition>) => {
        console.log(response);
        this.getCompetitions();

        // get btn close modal
        const btnClose = document.getElementById('closeModalAdd');
        btnClose?.click();

        // sweet alert
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: response.message
        })
      },
      (httpError: HttpErrorResponse) => {
        console.log(httpError.error);
        if (httpError.error.errorsValidation) {
          // sweet alert
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'warning',
            title: 'You must be validate data!'
          })

          // Iterate through the error keys and update corresponding form controls
          for (const keyError of Object.keys(httpError.error.errorsValidation)) {
            if (addForm.controls[keyError]) {
              addForm.controls[keyError].setErrors({ 'validationError': httpError.error.errorsValidation[keyError] });
            }
          }
        }

        if (httpError.error.error) {
          // sweet alert
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'error',
            title: httpError.error.error
          })
        }
      }
    )
  }

}
