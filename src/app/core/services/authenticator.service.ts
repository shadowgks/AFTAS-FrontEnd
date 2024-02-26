import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from 'src/app/shared/models/register';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthenticatorService {
  private apiServerUrl = "http://localhost:8080/api/v1/auth";

  constructor(private http: HttpClient) { }

  login(userObj: User): Observable<User>{
    return this.http.post<User>(`${this.apiServerUrl}/authenticate`, userObj);
  }

  register(userObj: Register): Observable<Register>{
    return this.http.post<Register>(`${this.apiServerUrl}/register`, userObj);
  }
}
