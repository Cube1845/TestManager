import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Score } from '../../models/types/score';
import { FinishTestDTO } from '../../models/DTOs/finishTestDto';

@Injectable({
  providedIn: 'root',
})
export class FinishApiService {
  constructor(private readonly http: HttpClient) {}

  private readonly apiUrl = environment.apiUrl;

  finishTest(dto: FinishTestDTO): Observable<Score> {
    return this.http.post<Score>(this.apiUrl + '/api/user/finish', dto);
  }
}
