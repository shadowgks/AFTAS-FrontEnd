import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response';
import { Page } from '../../shared/models/competition/page-competition';
import { Competition } from '../../shared/models/competition/competition';
import { Ranking } from '../../shared/models/ranking';
import { Member } from '../../shared/models/member';
import { MemberCompetition } from '../../shared/models/member-competition';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  private apiServerUrl = "http://localhost:8080/api/v1/competition";

  constructor(private http: HttpClient) { }

  public getCompetitionsPageble(location: string='', numPage: number=0, size: number=8): Observable<ApiResponse<Page>>{
    return this.http.get<ApiResponse<Page>>(`${this.apiServerUrl}?location=${location}&numPage=${numPage}&size=${size}`);
  }

  public getCompetitions(): Observable<ApiResponse<Page>>{
    return this.http.get<ApiResponse<Page>>(`${this.apiServerUrl}`);
  }

  public getCompetitionsByCode(code: string): Observable<ApiResponse<Ranking>>{
    return this.http.get<ApiResponse<Ranking>>(`${this.apiServerUrl}/find-by-code/${code}`);
  }

  public saveCompetition(competition: Competition): Observable<ApiResponse<Competition>>{
    return this.http.post<ApiResponse<Competition>>(`${this.apiServerUrl}/create`, competition);
  }

  public registredMemberOnCompetition(MemberCompetition: MemberCompetition): Observable<ApiResponse<Ranking>>{
    return this.http.post<ApiResponse<Ranking>>(`${this.apiServerUrl}/register_member`, MemberCompetition);
  }
}
