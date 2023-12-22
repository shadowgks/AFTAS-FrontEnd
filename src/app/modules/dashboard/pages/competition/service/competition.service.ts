import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../model/api-response';
import { Page } from '../models/page';
import { Competition } from '../models/competition';
import { Ranking } from '../../ranking/model/ranking';
import { Member } from '../../member/models/member';
import { MemberCompetition } from '../../member-competition/models/member-competition';

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
