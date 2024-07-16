import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs/internal/Observable';
import { UpdateTestNameDTO } from '../../../models/DTOs/test-manager/updateTestNameDto';

@Injectable({
  providedIn: 'root',
})
export class TestManagerApiService {
  constructor(private readonly http: HttpClient) {}

  private readonly apiUrl = environment.apiUrl + '/api/tests/manager';

  getUsersTests(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }

  createNewTestAndGetUsersTests(testName: string): Observable<string[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<string[]>(this.apiUrl, JSON.stringify(testName), {
      headers,
    });
  }

  removeTestAndGetUsersTests(testName: string): Observable<string[]> {
    return this.http.delete<string[]>(this.apiUrl + `?testName=${testName}`);
  }

  updateTestNameAndGetUsersTests(
    oldName: string,
    newName: string
  ): Observable<string[]> {
    var data: UpdateTestNameDTO = {
      oldName: oldName,
      newName: newName,
    };
    return this.http.put<string[]>(this.apiUrl, data);
  }
}
