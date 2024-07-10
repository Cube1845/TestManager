import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestManagerApiService {
  constructor(private readonly http: HttpClient) {}

  getUsersTests(): string[] {
    return ['Test tak', 'test nei'];
  }
}
