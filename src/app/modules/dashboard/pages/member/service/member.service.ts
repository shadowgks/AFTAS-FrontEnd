import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../model/api-response';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private apiServerUrl = "http://localhost:8080/api/v1/member";

  constructor(private http: HttpClient) { }

  getMembers(): Observable<ApiResponse<Member>>{
    return this.http.get<ApiResponse<Member>>(`${this.apiServerUrl}`);
  }

  saveMember(member: Member): Observable<ApiResponse<Member>>{
    return this.http.post<ApiResponse<Member>>(`${this.apiServerUrl}/create`, member);
  }

  searchMembers(searchTerm: string): Observable<ApiResponse<Member>>{
    return this.http.get<ApiResponse<Member>>(`${this.apiServerUrl}/search/${searchTerm}`);
  }
}
