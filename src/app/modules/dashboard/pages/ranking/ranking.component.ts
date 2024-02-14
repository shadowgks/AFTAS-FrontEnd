import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderRankingComponent } from '../../components/ranking/header-ranking/header-ranking.component';
import { CompetitionService } from '../../../../core/services/competition.service';
import { ApiResponse } from '../../../../shared/models/api-response';
import { Page } from '../../../../shared/models/competition/page-competition';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Ranking } from '../../../../shared/models/ranking';
import { RankingService } from '../../../../core/services/ranking.service';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule,HeaderRankingComponent, FormsModule],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})

export class RankingComponent implements OnInit {
  competitions!: ApiResponse<Page>;
  rankingCompetitionList!: ApiResponse<Ranking> | null;
  selectedCompetition!: string;

  constructor(private competitionService: CompetitionService,
    private rankingService: RankingService){}

  ngOnInit(): void {
    this.getAllCompetition();    
  }

  getAllCompetition() {
    this.competitionService.getCompetitions().subscribe(
      (response: ApiResponse<Page>) => {
        console.log(response);
        this.competitions = response;
        this.selectedCompetition = response.result.page.content[0].code;
      },
      (httpError: HttpErrorResponse) => {
        console.log(httpError);
      }
    )
  }

  getAllRankingByCompetition() {
    this.rankingService.getAllRankingByCompetition(this.selectedCompetition).subscribe(
      (response: ApiResponse<Ranking>) => {
        console.log("d"+response.result);
          this.rankingCompetitionList = response;          
      },
      (httpError: HttpErrorResponse) => {
        console.log(httpError);
      }
    )
  }
}
