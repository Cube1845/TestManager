import { Injectable } from '@angular/core';
import { AuthDto } from '../../models/DTOs/authDto';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  constructor(private readonly http: HttpClient) { }

  private readonly apiUrl: string = 'https://localhost:7037';

  loginUserWithEmailAndPassword(email: string, password: string): Observable<any> {
    var authDto: AuthDto = {
      email: email,
      password: password
    };

    return this.http.post<any>(this.apiUrl + "/login", authDto);
  }

  registerUserWithEmailAndPassword(email: string, password: string): Observable<any> {
    var authDto: AuthDto = {
      email: email,
      password: password
    };

    return this.http.post<any>(this.apiUrl + "/register", authDto);
  } 

  isUserAuthorized(): Observable<boolean> {
    return this.http.get<boolean>(this.apiUrl + "/Auth/IsUserAuthorized");
  }
}
