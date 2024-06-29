import { Injectable } from '@angular/core';
import { AuthDto } from '../../models/DTOs/authDto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private readonly http: HttpClient) {}

  private readonly apiUrl: string = 'https://localhost:7037';

  loginUser(dto: AuthDto): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/login', dto);
  }

  registerUser(dto: AuthDto): Observable<void> {
    return this.http.post<void>(this.apiUrl + '/register', dto);
  }
}
