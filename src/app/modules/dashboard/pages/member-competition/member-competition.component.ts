import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { MemberService } from '../../../../core/services/member.service';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { ApiResponse } from '../../../../shared/models/api-response';
import { Ranking } from '../../../../shared/models/ranking';
import { RankingService } from '../../../../core/services/ranking.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Member } from '../../../../shared/models/member';
import { FormsModule } from '@angular/forms';
import { MemberCompetition } from '../../../../shared/models/member-competition';
import { CompetitionService } from '../../../../core/services/competition.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-member-competition',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, FormsModule],
  templateUrl: './member-competition.component.html',
  styleUrl: './member-competition.component.scss'
})


export class MemberCompetitionComponent implements OnInit {
  codeCompetitionUrl!: string;
  selectedMember!: string;

  rankingState$!: Observable<{ appState: string, appData?: ApiResponse<Ranking> }>;
  members!: ApiResponse<Member[]>;


  constructor(
    private route: ActivatedRoute,
    private rankingService: RankingService,
    private membreService: MemberService,
    private competitionService: CompetitionService) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.codeCompetitionUrl = p['code'];
    })

    this.getAllMembersRegisteredOnRanking();
    this.getAllMembers();

  }

  getAllMembersRegisteredOnRanking() {
    this.rankingState$ = this.rankingService.getAllRankingByCompetition(this.codeCompetitionUrl).pipe(
      map((response: ApiResponse<Ranking>) => {
        console.log(response);
        return ({ appState: "app_loaded", appData: response });
      }),
      startWith({ appState: "app_loading" }),
      catchError((error: HttpErrorResponse) => of({ appState: "app_error", error }))
    )
  }

  getAllMembers() {
    this.membreService.getMembers().subscribe(
      (response: ApiResponse<Member[]>) => {
        this.members = response;
        this.selectedMember = this.members?.result[0].identityNumber;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  registredMember(codeCompetition: string, identityNumber: string) {
    // stock info in object
    const memberCompetition: MemberCompetition = {
      memberIdentity: identityNumber,
      competitionCode: codeCompetition
    }

    this.competitionService.registredMemberOnCompetition(memberCompetition).subscribe(
      (response: ApiResponse<Ranking>) => {
        console.log(response);
        this.getAllMembersRegisteredOnRanking();

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
    )

    // this.rankingService.registredMemberOnCompetition()
    // console.log(this.selectedMember);
  }




}
