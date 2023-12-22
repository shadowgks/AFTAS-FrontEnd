import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../model/api-response';
import { Ranking } from '../model/ranking';
import { MemberCompetition } from '../../member-competition/models/member-competition';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  private apiServerUrl = "http://localhost:8080/api/v1/ranking";
  
  constructor(private http: HttpClient) { }

  public getAllRankingByCompetition(codeCompetition: string): Observable<ApiResponse<Ranking>>{
    return this.http.get<ApiResponse<Ranking>>(`${this.apiServerUrl}/${codeCompetition}`);
  }
}
