import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interface/api-response';
import { Page } from '../interface/page';
import { Competition } from '../interface/competition';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  private apiServerUrl = "http://localhost:8080/api/v1/competition";

  constructor(private http: HttpClient) { }

  public getCompetitions(location: string='', numPage: number=0, size: number=1): Observable<ApiResponse<Page>>{
    return this.http.get<ApiResponse<Page>>(`${this.apiServerUrl}?location=${location}&numPage=${numPage}&size=${size}`);
  }

  public saveCompetition(competition: Competition): Observable<ApiResponse<Competition>>{
    return this.http.post<ApiResponse<Competition>>(`${this.apiServerUrl}/create`, competition);
  }
}
