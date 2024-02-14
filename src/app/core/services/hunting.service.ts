import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response';
import { Fish } from '../../shared/models/fish';
import { Hunting } from '../../shared/models/hunting';


@Injectable({
  providedIn: 'root'
})
export class HuntingService {
  private apiServerUrlFish = "http://localhost:8080/api/v1/fish";
  private apiServerUrl = "http://localhost:8080/api/v1/hunting";

  constructor(private http: HttpClient) { }

  getAllFish(): Observable<ApiResponse<Fish>>{
    return this.http.get<ApiResponse<Fish>>(`${this.apiServerUrlFish}`);
  }

  sumHuntingFish(hunting: Hunting): Observable<ApiResponse<Hunting>>{
    return this.http.post<ApiResponse<Hunting>>(`${this.apiServerUrl}/hunt`, hunting);
  }
}
