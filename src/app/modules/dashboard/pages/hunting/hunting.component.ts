import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { ApiResponse } from '../../model/api-response';
import { Hunting } from './models/hunting';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CompetitionService } from '../competition/service/competition.service';
import { Page } from '../competition/models/page';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Ranking } from '../ranking/model/ranking';
import { HuntingService } from './service/hunting.service';
import { Fish } from './models/fish';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-hunting',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, FormsModule],
  templateUrl: './hunting.component.html',
  styleUrl: './hunting.component.scss'
})
export class HuntingComponent implements OnInit {
  competitions!: ApiResponse<Page>;
  ranking!: ApiResponse<Ranking>;
  fishes!: ApiResponse<Fish>;

  selectedCompetition!: string;
  weightInput!: 0.10;
  fishName!: string;

  competitionMemberState$!: Observable<{ appState: string, appData?: ApiResponse<Ranking> }>

  constructor(private competitionService: CompetitionService,
    private huntingService: HuntingService) { }

  ngOnInit() {
    this.getAllCompetition();
    this.getAllFish();
  }


  getAllCompetition() {
    this.competitionService.getCompetitions().subscribe(
      (response: ApiResponse<Page>) => {
        console.log(response);
        this.competitions = response;
        this.selectedCompetition = response.result.page.content[0].code;
      },
      (httpError: HttpErrorResponse) => {
        // console.log(httpError);
      }
    )
  }


  listMembersCompetition() {
    this.competitionMemberState$ = this.competitionService.getCompetitionsByCode(this.selectedCompetition).pipe(
      map((response: ApiResponse<Ranking>) => {
        // console.log(response);
        return ({ appState: "app_loaded", appData: response });
      }),
      startWith({ appState: "app_loading" }),
      catchError((httpError: HttpErrorResponse) => of({ appState: "app_error", httpError }))
    )
  }


  getAllFish() {
    this.huntingService.getAllFish().subscribe(
      (response: ApiResponse<Fish>) => {
        // console.log(response);
        this.fishes = response;
        this.fishName = response?.result[0].name;
      },
      (httpError: HttpErrorResponse) => {
        // console.log(httpError);
      }
    )
  }

  hunt(identityMember: string) {
    // stock info in object
    const reqHunting: Hunting = {
      memberIdentity: identityMember,
      competitionCode: this.selectedCompetition,
      fishName: this.fishName,
      weight: this.weightInput
    }

    this.huntingService.sumHuntingFish(reqHunting).subscribe(
      (response: ApiResponse<Hunting>) => {
        // get members
        this.listMembersCompetition();

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
        //if validation
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
            title: "You must be enter wight"
          })
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
