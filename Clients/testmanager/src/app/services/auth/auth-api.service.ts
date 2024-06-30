import { Injectable } from '@angular/core';
import { AuthDto } from '../../models/DTOs/authDto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private readonly http: HttpClient) {}

  private readonly apiUrl: string = environment.apiUrl;

  loginUser(dto: AuthDto): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/login', dto);
  }

  registerUser(dto: AuthDto): Observable<void> {
    return this.http.post<void>(this.apiUrl + '/register', dto);
  }
}
