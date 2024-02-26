import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response';
import { Member } from '../../shared/models/member/member';
import { switchMember } from 'src/app/shared/models/member/switch-member';
import { Role } from 'src/app/shared/models/role';

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

  switchMember(codeMember: string, switchMember: switchMember): Observable<ApiResponse<Member>>{
    return this.http.patch<ApiResponse<Member>>(`${this.apiServerUrl}/update-user/${codeMember}`, switchMember);
  }

  getRoles(){
    return this.http.get<ApiResponse<Role[]>>(`${this.apiServerUrl}/all-roles`);
  }
}
